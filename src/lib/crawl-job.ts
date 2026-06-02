/**
 * crawl-job.ts — orchestration layer
 *
 * This is the "conductor". It sequences Tool1 → Tool2 → Tool3 → DB.
 * Both the API route (manual trigger) and the cron script import this.
 * The MCP tools themselves are just wrappers around these same functions.
 *
 * Slot logic:
 *   hour < 12  →  "morning"   (06:00 cron run)
 *   hour >= 12 →  "evening"   (18:00 cron run)
 */

import { connectDB } from './mongodb';
import { crawlSource, fetchHtml, extractArticle, summarizeAndTag } from './crawler';
import NewsSource from '../models/NewsSource';
import NewsArticle from '../models/NewsArticle';

// Default sources seeded on first run if none exist
const DEFAULT_SOURCES = [
  { name: 'TechCrunch AI', url: 'https://techcrunch.com/category/artificial-intelligence/feed/' },
  { name: 'VentureBeat AI', url: 'https://venturebeat.com/category/ai/feed/' },
  { name: 'MIT Tech Review', url: 'https://www.technologyreview.com/feed/' },
];

export function getSlot(): 'morning' | 'evening' {
  return new Date().getHours() < 12 ? 'morning' : 'evening';
}

export async function runCrawl(slot: 'morning' | 'evening'): Promise<{ saved: number; skipped: number; errors: string[] }> {
  await connectDB();

  // Seed default sources if none exist
  const count = await NewsSource.countDocuments();
  if (count === 0) {
    await NewsSource.insertMany(DEFAULT_SOURCES);
    console.log('[Crawler] Seeded default news sources.');
  }

  const sources = await NewsSource.find({ is_active: true });
  let saved = 0;
  let skipped = 0;
  const errors: string[] = [];

  console.log(`[Crawler] ${slot.toUpperCase()} run — ${sources.length} active sources`);

  for (const source of sources) {
    try {
      const rawArticles = await crawlSource(source.url, source.name);

      for (const raw of rawArticles) {
        try {
          // Skip duplicates — url is a unique index in MongoDB
          const exists = await NewsArticle.findOne({ url: raw.url });
          if (exists) { skipped++; continue; }

          // Fetch full article HTML then extract clean text
          // If the fetch fails (paywall/JS-rendered), fall back to RSS description
          let title = raw.title;
          let text = raw.description;

          try {
            const html = await fetchHtml(raw.url);
            const extracted = extractArticle(html);
            if (extracted.text.length > 200) {
              title = extracted.title || raw.title;
              text = extracted.text;
            }
          } catch {
            // Silently fall back to RSS description
          }

          const { summary, tag } = await summarizeAndTag(title, text);

          await NewsArticle.create({
            url: raw.url,
            title,
            summary,
            tag,
            source: source.name,
            published_at: new Date(),
            slot,
            is_read: false,
          });

          console.log(`[Crawler] ✓ ${title.slice(0, 60)}  [${tag}]`);
          saved++;
        } catch (err) {
          const msg = `Article error (${raw.url}): ${String(err)}`;
          errors.push(msg);
          console.error('[Crawler]', msg);
        }
      }
    } catch (err) {
      const msg = `Source error (${source.url}): ${String(err)}`;
      errors.push(msg);
      console.error('[Crawler]', msg);
    }
  }

  console.log(`[Crawler] Done — saved: ${saved}, skipped: ${skipped}, errors: ${errors.length}`);
  return { saved, skipped, errors };
}
