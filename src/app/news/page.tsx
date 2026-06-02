'use client';

import {
  Box, Container, Typography, Grid, Card, CardContent,
  Chip, Stack, CircularProgress, Button, Badge, Tooltip,
} from '@mui/material';
import { WbSunny, Nightlight, Refresh, AutoStories } from '@mui/icons-material';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

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
  'LLMs': '#7c3aed',
  'AI Agents': '#0891b2',
  'Generative AI': '#db2777',
  'ML Research': '#059669',
  'AI Tools': '#d97706',
  'Computer Vision': '#dc2626',
  'NLP': '#2563eb',
  'Robotics': '#7c2d12',
  'AI Ethics': '#4f46e5',
  'Other': '#6b7280',
};

function ArticleCard({ article, onRead }: { article: NewsArticle; onRead: (id: string) => void }) {
  const tagColor = TAG_COLORS[article.tag] || '#6b7280';
  const timeStr = new Date(article.published_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Card
      onClick={() => { if (!article.is_read) onRead(article._id); }}
      sx={{
        cursor: 'pointer',
        border: article.is_read ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(139,92,246,0.5)',
        backgroundColor: article.is_read ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)',
        borderRadius: 2,
        transition: 'all 0.2s',
        '&:hover': { backgroundColor: 'rgba(255,255,255,0.12)', transform: 'translateY(-2px)' },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
          <Stack direction="row" spacing={1} flexWrap="wrap" gap={0.5}>
            <Chip
              label={article.tag}
              size="small"
              sx={{ backgroundColor: tagColor, color: 'white', fontSize: '0.65rem', height: 20 }}
            />
            <Chip
              label={article.source}
              size="small"
              variant="outlined"
              sx={{ color: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.2)', fontSize: '0.65rem', height: 20 }}
            />
          </Stack>
          {!article.is_read && (
            <Chip
              label="NEW"
              size="small"
              sx={{ backgroundColor: '#7c3aed', color: 'white', fontSize: '0.6rem', height: 18, fontWeight: 'bold' }}
            />
          )}
        </Stack>

        <Typography
          variant="body2"
          sx={{
            fontWeight: article.is_read ? 400 : 600,
            color: article.is_read ? 'rgba(255,255,255,0.6)' : 'white',
            mb: 1,
            lineHeight: 1.4,
          }}
        >
          {article.title}
        </Typography>

        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, display: 'block', mb: 1 }}>
          {article.summary}
        </Typography>

        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.65rem' }}>
          {timeStr}
        </Typography>
      </CardContent>
    </Card>
  );
}

function FeedColumn({
  slot, icon, label, color, articles, onRead, unreadCount,
}: {
  slot: 'morning' | 'evening';
  icon: React.ReactNode;
  label: string;
  color: string;
  articles: NewsArticle[];
  onRead: (id: string) => void;
  unreadCount: number;
}) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        {icon}
        <Typography variant="h6" sx={{ fontWeight: 700, color: 'white' }}>
          {label}
        </Typography>
        {unreadCount > 0 && (
          <Badge badgeContent={unreadCount} color="secondary">
            <Box sx={{ width: 8, height: 8 }} />
          </Badge>
        )}
        <Chip
          label={`${articles.length} articles`}
          size="small"
          sx={{ backgroundColor: color, color: 'white', fontSize: '0.65rem', height: 20 }}
        />
      </Stack>

      {articles.length === 0 ? (
        <Card sx={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 2 }}>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <AutoStories sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 40, mb: 1 }} />
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)' }}>
              No {slot} articles yet.
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
              The crawler runs at 6 AM and 6 PM, or trigger it from the admin panel.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Stack spacing={1.5}>
          {articles.map((a) => (
            <ArticleCard key={a._id} article={a} onRead={onRead} />
          ))}
        </Stack>
      )}
    </Box>
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
    <Box sx={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
          <Box>
            <Stack direction="row" alignItems="center" spacing={2} mb={0.5}>
              <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14 }}>
                ← Portfolio
              </Link>
            </Stack>
            <Typography variant="h4" sx={{ fontWeight: 800, color: 'white' }}>
              AI News Brief
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', mt: 0.5 }}>
              Crawled, summarized, and tagged by Claude — twice daily
            </Typography>
          </Box>
          <Tooltip title={lastRefresh ? `Last refresh: ${lastRefresh.toLocaleTimeString()}` : ''}>
            <Button
              onClick={() => void fetchArticles()}
              startIcon={<Refresh />}
              variant="outlined"
              size="small"
              sx={{ color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.2)' }}
            >
              Refresh
            </Button>
          </Tooltip>
        </Stack>

        {loading ? (
          <Box display="flex" justifyContent="center" pt={8}>
            <CircularProgress sx={{ color: '#7c3aed' }} />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FeedColumn
                slot="morning"
                icon={<WbSunny sx={{ color: '#f59e0b' }} />}
                label="Morning Brief"
                color="#d97706"
                articles={morning}
                onRead={handleRead}
                unreadCount={morningUnread}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FeedColumn
                slot="evening"
                icon={<Nightlight sx={{ color: '#818cf8' }} />}
                label="Evening Brief"
                color="#4f46e5"
                articles={evening}
                onRead={handleRead}
                unreadCount={eveningUnread}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
}
