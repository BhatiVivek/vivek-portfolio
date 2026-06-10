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
      className={styles.articleCard}
      onClick={() => { if (!article.is_read) onRead(article._id); }}
      style={{ opacity: article.is_read ? 0.65 : 1 }}
    >
      <div className={`${styles.articleAccent} ${article.is_read ? styles.articleAccentRead : ''}`} />
      <div className={styles.articleBody}>
        <div className={styles.articleMeta}>
          <span className={styles.tagPill} style={{ background: tagColor }}>{article.tag}</span>
          <span className={styles.sourcePill}>{article.source}</span>
          {!article.is_read && <span className={styles.newBadge}>UNREAD</span>}
        </div>
        <p className={`${styles.articleTitle} ${article.is_read ? styles.articleTitleRead : ''}`}>
          {article.title}
        </p>
        <p className={styles.articleSummary}>{article.summary}</p>
        <div className={styles.articleFooter}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          {timeStr}
          {article.is_read && (
            <>
              <span>·</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Read
            </>
          )}
        </div>
      </div>
    </div>
  );
}

type Tab = 'top' | 'more';

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('top');
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchArticles = useCallback(async () => {
    setLoading(true);
    try {
      const today = new Date().toISOString().split('T')[0];
      const res = await fetch(`/api/news?date=${today}&limit=30`);
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

  const top10 = articles.slice(0, 10);
  const moreArticles = articles.slice(10);
  const top10Unread = top10.filter((a) => !a.is_read).length;
  const moreUnread = moreArticles.filter((a) => !a.is_read).length;
  const totalUnread = articles.filter((a) => !a.is_read).length;

  const feed = activeTab === 'top' ? top10 : moreArticles;
  const feedUnread = activeTab === 'top' ? top10Unread : moreUnread;
  const feedRead = feed.length - feedUnread;
  const readPct = feed.length > 0 ? Math.round((feedRead / feed.length) * 100) : 0;

  const todayLabel = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric',
  });

  return (
    <main style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      <div className="container section-spacer">

        {/* Back */}
        <Link href="/" className={styles.backLink}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back to Portfolio
        </Link>

        {/* Header */}
        <div className={styles.pageHeader}>
          <div className={styles.headerRow}>
            <div className={styles.headerLeft}>
              <div className={styles.aiChip}>
                <span className={styles.aiDot} />
                Powered by Claude AI
              </div>
              <h1 className={styles.pageTitle}>AI News Brief</h1>
              <p className={styles.pageSubtitle}>
                Crawled, summarised &amp; tagged twice daily
                {lastRefresh && ` · Updated ${lastRefresh.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
              </p>
            </div>
            <div className={styles.headerRight}>
              <span className={styles.dateBadge}>{todayLabel}</span>
              <button
                className={styles.refreshBtn}
                onClick={() => void fetchArticles()}
                disabled={loading}
              >
                <svg
                  width="13" height="13" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2"
                  className={loading ? styles.spinning : ''}
                >
                  <polyline points="23 4 23 10 17 10"/>
                  <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                </svg>
                {loading ? 'Loading…' : 'Refresh'}
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        {!loading && articles.length > 0 && (
          <div className={styles.statsRow}>
            <div className={styles.statChip}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-glow)" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <span className={styles.statChipValue}>{articles.length}</span>
              <span className={styles.statChipLabel}>articles today</span>
            </div>
            <div className={styles.statChip}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent-glow)" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
              <span className={`${styles.statChipValue} ${totalUnread > 0 ? styles.unreadHighlight : ''}`}>{totalUnread}</span>
              <span className={styles.statChipLabel}>unread</span>
            </div>
          </div>
        )}

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
          <>
            {/* Tabs */}
            <div className={styles.tabBar}>
              <button
                className={`${styles.tab} ${activeTab === 'top' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('top')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                Top 10
                <span className={`${styles.tabBadge} ${activeTab !== 'top' ? styles.tabBadgeMuted : ''}`}>
                  {top10Unread > 0 ? top10Unread : top10.length}
                </span>
              </button>
              <button
                className={`${styles.tab} ${activeTab === 'more' ? styles.tabActive : ''}`}
                onClick={() => setActiveTab('more')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                  <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
                </svg>
                More Articles
                <span className={`${styles.tabBadge} ${activeTab !== 'more' ? styles.tabBadgeMuted : ''}`}>
                  {moreUnread > 0 ? moreUnread : moreArticles.length}
                </span>
              </button>
            </div>

            {/* Reading progress */}
            {feed.length > 0 && (
              <div className={styles.progressWrap}>
                <div className={styles.progressLabel}>
                  <span>{feedRead} of {feed.length} read</span>
                  <span>{readPct}%</span>
                </div>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} style={{ width: `${readPct}%` }} />
                </div>
              </div>
            )}

            {/* Feed */}
            {feed.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                  </svg>
                </div>
                <p className={styles.emptyTitle}>No articles yet</p>
                <p className={styles.emptyHint}>
                  {activeTab === 'top'
                    ? 'The crawl runs at 6:00 AM UTC. Check back after that.'
                    : 'No additional articles beyond the top 10 today.'}
                </p>
              </div>
            ) : (
              <div className={styles.articleList}>
                {feed.map((a) => (
                  <ArticleCard key={a._id} article={a} onRead={handleRead} />
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </main>
  );
}
