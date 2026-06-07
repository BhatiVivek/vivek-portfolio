'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import styles from './NewsPage.module.css';

interface NewsArticle {
  _id: string;
  title: string;
  summary: string;
  tag: string;
  source: string;
  published_at: string;
  slot: 'morning' | 'evening';
  is_read: boolean;
}

const TAG_COLORS: Record<string, string> = {
  'LLMs':            '#7C3AED',
  'AI Agents':       '#0891B2',
  'Generative AI':   '#DB2777',
  'ML Research':     '#059669',
  'AI Tools':        '#D97706',
  'Computer Vision': '#DC2626',
  'NLP':             '#2563EB',
  'Robotics':        '#92400E',
  'AI Ethics':       '#4F46E5',
  'Other':           '#6B7280',
};

function ArticleCard({ article, onRead }: { article: NewsArticle; onRead: (id: string) => void }) {
  const tagColor = TAG_COLORS[article.tag] ?? '#6B7280';
  const timeStr = new Date(article.published_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className={`${styles.articleCard} ${article.is_read ? styles.articleCardRead : styles.articleCardUnread}`}
      onClick={() => { if (!article.is_read) onRead(article._id); }}
    >
      <div className={styles.articleTop}>
        <div className={styles.tagRow}>
          <span className={styles.tagPill} style={{ background: tagColor }}>{article.tag}</span>
          <span className={styles.sourcePill}>{article.source}</span>
        </div>
        {!article.is_read && <span className={styles.newBadge}>NEW</span>}
      </div>

      <p className={`${styles.articleTitle} ${article.is_read ? styles.articleTitleRead : ''}`}>
        {article.title}
      </p>
      <p className={styles.articleSummary}>{article.summary}</p>
      <span className={styles.articleTime}>{timeStr}</span>
    </div>
  );
}

function FeedColumn({
  slot, articles, onRead, unreadCount,
}: {
  slot: 'morning' | 'evening';
  articles: NewsArticle[];
  onRead: (id: string) => void;
  unreadCount: number;
}) {
  const isMorning = slot === 'morning';

  return (
    <div>
      <div className={styles.columnHeader}>
        <div className={`${styles.columnIcon} ${isMorning ? styles.iconMorning : styles.iconEvening}`}>
          {isMorning ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
              <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          )}
        </div>
        <span className={styles.columnTitle}>{isMorning ? 'Morning Brief' : 'Evening Brief'}</span>
        {unreadCount > 0 && <span className={styles.unreadBadge}>{unreadCount} new</span>}
        <span className={styles.countBadge}>{articles.length} articles</span>
      </div>

      {articles.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </div>
          <p className={styles.emptyTitle}>No {slot} articles yet</p>
          <p className={styles.emptyHint}>
            Crawls run at 6 AM and 6 PM — or trigger one manually from the News button.
          </p>
        </div>
      ) : (
        <div className={styles.articleList}>
          {articles.map((a) => (
            <ArticleCard key={a._id} article={a} onRead={onRead} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const res = await fetch(`/api/news?date=${today}&limit=40`);
      const data = await res.json() as { articles: NewsArticle[] };
      setArticles(data.articles || []);
      setLastRefresh(new Date());
    } catch (err) {
      console.error('Failed to fetch news:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void fetchArticles(); }, [fetchArticles]);

  const handleRead = async (id: string) => {
    setArticles((prev) => prev.map((a) => (a._id === id ? { ...a, is_read: true } : a)));
    await fetch('/api/news', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, is_read: true }),
    });
  };

  const morning = articles.filter((a) => a.slot === 'morning');
  const evening = articles.filter((a) => a.slot === 'evening');
  const morningUnread = morning.filter((a) => !a.is_read).length;
  const eveningUnread = evening.filter((a) => !a.is_read).length;

  return (
    <main style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      <div className="container section-spacer">

        <Link href="/" className={styles.backLink}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to Portfolio
        </Link>

        <div className={styles.header}>
          <div>
            <p className="section-label">Daily Digest</p>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', letterSpacing: '-0.02em', marginBottom: '4px' }}>
              AI News Brief
            </h1>
            <p className={styles.headerMeta}>
              Crawled, summarised, and tagged by Claude — twice daily
              {lastRefresh && ` · Refreshed at ${lastRefresh.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            </p>
          </div>
          <button
            className={styles.refreshBtn}
            onClick={() => void fetchArticles()}
            disabled={loading}
          >
            <svg
              width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              className={loading ? styles.spinning : ''}
            >
              <polyline points="23 4 23 10 17 10"/>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
            {loading ? 'Loading…' : 'Refresh'}
          </button>
        </div>

        {loading ? (
          <div className={styles.loadingWrap}>
            <div className={styles.loadingDots}>
              <div className={styles.loadingDot} />
              <div className={styles.loadingDot} />
              <div className={styles.loadingDot} />
            </div>
            Fetching today&apos;s articles…
          </div>
        ) : (
          <div className={styles.grid}>
            <FeedColumn slot="morning" articles={morning} onRead={handleRead} unreadCount={morningUnread} />
            <FeedColumn slot="evening" articles={evening} onRead={handleRead} unreadCount={eveningUnread} />
          </div>
        )}

      </div>
    </main>
  );
}
