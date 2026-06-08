/**
 * Core crawler utilities — three functions that map 1:1 to the MCP tools.
 *
 * Why split from the MCP server?
 *   The MCP server wraps these for external clients (Claude Desktop, etc.).
 *   The cron job + API routes import them directly — no protocol overhead.
 *   Same logic, two access paths.
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import OpenAI from 'openai';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RawArticle {
  title: string;
  url: string;
  description: string;
  source: string;
}

export interface ArticleContent {
  title: string;
  text: string;
}

export interface SummarizedArticle {
  summary: string;
  tag: string;
}

const BOT_UA = 'Mozilla/5.0 (compatible; VivekNewsBot/1.0)';

// ─── Tool 1: crawl_sources ────────────────────────────────────────────────────
/**
 * Fetches an RSS 2.0 or Atom feed and returns up to 5 articles per source.
 *
 * RSS 2.0 uses <item> tags; Atom uses <entry> tags.
 * cheerio's xmlMode parses both without a dedicated XML library.
 */
export async function crawlSource(feedUrl: string, sourceName: string): Promise<RawArticle[]> {
  const response = await axios.get<string>(feedUrl, {
    headers: { 'User-Agent': BOT_UA, 'Accept-Encoding': 'gzip,deflate' },
    timeout: 15000,
  });

  // xmlMode:true tells cheerio to treat the document as XML, not HTML
  const $ = cheerio.load(response.data, { xmlMode: true });
  const articles: RawArticle[] = [];

  const addArticle = (title: string, url: string, description: string) => {
    const cleanTitle = title.trim();
    const cleanUrl = url.trim();
    if (cleanTitle && cleanUrl && articles.length < 5) {
      articles.push({
        title: cleanTitle,
        url: cleanUrl,
        description: description.replace(/<[^>]*>/g, '').trim().slice(0, 400),
        source: sourceName,
      });
    }
  };

  // RSS 2.0
  $('item').each((_, el) => {
    addArticle(
      $(el).find('title').first().text(),
      $(el).find('link').first().text() || $(el).find('guid').text(),
      $(el).find('description').first().text()
    );
  });

  // Atom (when no RSS items found)
  if (articles.length === 0) {
    $('entry').each((_, el) => {
      addArticle(
        $(el).find('title').first().text(),
        $(el).find('link').attr('href') || $(el).find('link').first().text(),
        $(el).find('summary, content').first().text()
      );
    });
  }

  return articles;
}

// ─── Tool 2: extract_articles ─────────────────────────────────────────────────
/**
 * Given raw HTML (already fetched), strips navigation/ads/footer
 * and returns the main article text.
 *
 * Strategy: try progressively broader selectors until we find 200+ chars of text.
 */
export function extractArticle(html: string): ArticleContent {
  const $ = cheerio.load(html);

  // Remove structural noise
  $('nav, footer, header, aside, script, style, .ad, .advertisement, .sidebar, .related, [class*="cookie"], [id*="cookie"], [class*="newsletter"], [class*="popup"]').remove();

  const selectors = ['article', '[class*="article-body"]', '[class*="post-content"]', '[class*="entry-content"]', 'main', '.content'];
  let text = '';

  for (const sel of selectors) {
    const candidate = $(sel).first().text().replace(/\s+/g, ' ').trim();
    if (candidate.length > 200) {
      text = candidate.slice(0, 3000);
      break;
    }
  }

  if (!text) {
    text = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 3000);
  }

  const title = $('h1').first().text().trim() || $('title').text().trim();
  return { title, text };
}

// ─── Helper: fetch HTML from a URL ───────────────────────────────────────────
export async function fetchHtml(url: string): Promise<string> {
  const response = await axios.get<string>(url, {
    headers: { 'User-Agent': BOT_UA },
    timeout: 15000,
  });
  return response.data;
}

// ─── Tool 3: summarize_and_tag ────────────────────────────────────────────────
/**
 * Calls GPT-4o-mini to:
 *   1. Write a 2-sentence summary of the article
 *   2. Assign one AI sub-topic tag
 *
 * gpt-4o-mini costs ~$0.15/1M input tokens — cheap enough to run on every article.
 * response_format: json_object forces valid JSON output, no regex needed as fallback.
 */
export async function summarizeAndTag(title: string, text: string): Promise<SummarizedArticle> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  // gpt-4o-mini: fast + cheap (~$0.15/1M input tokens), perfect for summarization
  const response = await client.chat.completions.create({
    model: 'gpt-4o-mini',
    max_tokens: 256,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'user',
        content: `Analyze this AI/tech news article. Respond with ONLY valid JSON.

Title: ${title}

Content: ${text.slice(0, 2000)}

Return exactly:
{
  "summary": "One sentence with the main point. One sentence with a key implication or detail.",
  "tag": "exactly one of: LLMs, Computer Vision, NLP, AI Agents, Robotics, AI Ethics, ML Research, AI Tools, Generative AI, Other"
}`,
      },
    ],
  });

  const raw = response.choices[0]?.message?.content ?? '';
  const match = raw.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON found in OpenAI response');

  return JSON.parse(match[0]) as SummarizedArticle;
}
