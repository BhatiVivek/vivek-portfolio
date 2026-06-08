/**
 * scripts/cron-crawler.ts — local test runner
 *
 * On Vercel, scheduling is handled by vercel.json (calls GET /api/news/crawl).
 * This script is only used locally to trigger a crawl immediately for testing.
 *
 * Usage: npm run cron:now
 */

import { runCrawl, getSlot } from '../src/lib/crawl-job';

const slot = getSlot();
console.log(`[Cron] Running ${slot} crawl immediately...\n`);

runCrawl(slot)
  .then((result) => {
    console.log('[Cron] Crawl complete:', result);
    process.exit(0);
  })
  .catch((err) => {
    console.error('[Cron] Crawl failed:', err);
    process.exit(1);
  });
