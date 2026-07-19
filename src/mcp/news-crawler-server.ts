// NOTE: This file is not being used anywhere, it is kept here for future use

/**
 * news-crawler-server.ts
 *
 * A SECOND, completely independent MCP server (portfolio-server.ts is untouched).
 *
 * What is an MCP server?
 *   An MCP server is a process that exposes "tools" over a standard protocol.
 *   Any MCP client (Claude Desktop, your cron script, a chat UI) connects
 *   and can call these tools by name with typed arguments.
 *
 * Why wrap crawler functions as MCP tools?
 *   So Claude (in Claude Desktop) can say "crawl these URLs and summarize them"
 *   and the tools run automatically — no custom API needed.
 *   Your cron script uses the same underlying functions directly (skipping protocol).
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { crawlSource, extractArticle, summarizeAndTag } from '../lib/crawler';

export function createNewsCrawlerServer(): McpServer {
  const server = new McpServer({
    name: 'news-crawler-server',
    version: '1.0.0',
  });

  // ── Tool 1: crawl_sources ───────────────────────────────────────────────────
  // Accepts an array of RSS feed URLs.
  // Returns a flat list of articles (title, url, description, source).
  // Claude uses this first to discover what articles exist.
  server.tool(
    'crawl_sources',
    'Fetches one or more RSS/Atom feed URLs and returns a list of recent articles (title, URL, brief description).',
    {
      urls: z.array(z.string().url()).describe('Array of RSS feed URLs to crawl, e.g. ["https://techcrunch.com/category/artificial-intelligence/feed/"]'),
    },
    async ({ urls }) => {
      // Promise.allSettled means one failing URL won't break the others
      const results = await Promise.allSettled(
        urls.map((url) => {
          const sourceName = new URL(url).hostname.replace('www.', '');
          return crawlSource(url, sourceName);
        })
      );

      const articles = results
        .filter((r): r is PromiseFulfilledResult<Awaited<ReturnType<typeof crawlSource>>> => r.status === 'fulfilled')
        .flatMap((r) => r.value);

      const errors = results
        .filter((r): r is PromiseRejectedResult => r.status === 'rejected')
        .map((r) => String(r.reason));

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ articles, errors, total: articles.length }, null, 2),
          },
        ],
      };
    }
  );

  // ── Tool 2: extract_articles ────────────────────────────────────────────────
  // Takes raw HTML and returns clean article text.
  // Claude calls this after crawl_sources when it needs the full article body.
  server.tool(
    'extract_articles',
    'Parses raw HTML and extracts the main article title and text, stripping navigation, ads, and boilerplate.',
    {
      html: z.string().describe('Raw HTML content of the article page'),
    },
    async ({ html }) => {
      const content = extractArticle(html);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(content, null, 2) }],
      };
    }
  );

  // ── Tool 3: summarize_and_tag ───────────────────────────────────────────────
  // Calls Claude Haiku to produce a 2-sentence summary and assign an AI topic tag.
  // Claude (in an agentic loop) would call this after extract_articles.
  server.tool(
    'summarize_and_tag',
    'Calls Claude to produce a 2-sentence summary and assign one AI sub-topic tag (LLMs, AI Agents, ML Research, etc.).',
    {
      title: z.string().describe('Article headline'),
      text: z.string().describe('Article body text (first 2000 chars recommended)'),
    },
    async ({ title, text }) => {
      const result = await summarizeAndTag(title, text);
      return {
        content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }],
      };
    }
  );

  return server;
}
