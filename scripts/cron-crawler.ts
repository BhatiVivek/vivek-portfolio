/**
 * scripts/cron-crawler.ts — standalone Node.js cron process
 *
 * Run with: npm run cron:start
 * Run once immediately: npm run cron:now
 *
 * ── What is node-cron? ─────────────────────────────────────────────────────
 * node-cron is a pure JavaScript scheduler using standard cron syntax:
 *
 *   ┌──────── minute  (0-59)
 *   │ ┌────── hour    (0-23)
 *   │ │ ┌──── day     (1-31)
 *   │ │ │ ┌── month   (1-12)
 *   │ │ │ │ ┌ weekday (0-7, 0=Sunday)
 *   │ │ │ │ │
 *   0 6 * * *   ← "at 06:00 every day"
 *   0 18 * * *  ← "at 18:00 every day"
 *   * * * * *   ← "every minute" (useful for testing)
 *
 * This script runs as a SEPARATE process from Next.js.
 * It imports the same TypeScript modules via tsx (a TypeScript runner).
 * tsx handles .ts imports without compiling to JS first.
 *
 * ── How it relates to MCP ──────────────────────────────────────────────────
 * The MCP server (news-crawler-server.ts) exposes the same crawler functions
 * as tools for Claude Desktop. This cron script calls those functions directly
 * (imported from crawler.ts) — no network round-trip through MCP protocol.
 * Same logic, two different callers.
 */

// Env vars are loaded by Node.js --env-file=.env.local flag (see package.json scripts).
// No dotenv import needed.

import cron from 'node-cron';
import { runCrawl, getSlot } from '../src/lib/crawl-job';

// ── Schedule two daily runs ─────────────────────────────────────────────────

// 6:00 AM — morning brief
cron.schedule('0 6 * * *', async () => {
  console.log(`\n[Cron] ${new Date().toISOString()} — starting morning crawl`);
  try {
    const result = await runCrawl('morning');
    console.log('[Cron] Morning crawl complete:', result);
  } catch (err) {
    console.error('[Cron] Morning crawl failed:', err);
  }
});

// 6:00 PM — evening brief
cron.schedule('0 18 * * *', async () => {
  console.log(`\n[Cron] ${new Date().toISOString()} — starting evening crawl`);
  try {
    const result = await runCrawl('evening');
    console.log('[Cron] Evening crawl complete:', result);
  } catch (err) {
    console.error('[Cron] Evening crawl failed:', err);
  }
});

console.log('[Cron] News crawler scheduler running.');
console.log('[Cron] Waiting for 06:00 and 18:00 daily triggers...');
console.log('[Cron] Press Ctrl+C to stop.\n');

// ── RUN_NOW: immediate execution for testing ────────────────────────────────
// Usage: npm run cron:now
// This runs the crawl immediately without waiting for the schedule.
if (process.env.RUN_NOW === 'true') {
  const slot = getSlot();
  console.log(`[Cron] RUN_NOW=true — running ${slot} crawl immediately...\n`);
  runCrawl(slot)
    .then((result) => {
      console.log('[Cron] Immediate crawl complete:', result);
      process.exit(0);
    })
    .catch((err) => {
      console.error('[Cron] Immediate crawl failed:', err);
      process.exit(1);
    });
}
