// ADMIN FEATURE — temporarily disabled (pending real authentication)
// To re-enable: restore full component and implement NextAuth or JWT-based auth

export default function AdminNewsPage() {
  return null;
}

/*
'use client';

import {
  Box, Container, Typography, Card, CardContent, Button, Stack,
  TextField, Chip, Switch, FormControlLabel, Alert, LinearProgress,
  Divider, IconButton, Tooltip,
} from '@mui/material';
import { Add, Delete, PlayArrow, WbSunny, Nightlight } from '@mui/icons-material';
import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';

interface NewsSource {
  _id: string;
  name: string;
  url: string;
  is_active: boolean;
}

function AdminNewsPage() {
  const [sources, setSources] = useState<NewsSource[]>([]);
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [addError, setAddError] = useState('');
  const [crawlStatus, setCrawlStatus] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [crawling, setCrawling] = useState(false);

  const fetchSources = useCallback(async () => {
    const res = await fetch('/api/news/sources');
    const data = await res.json() as { sources: NewsSource[] };
    setSources(data.sources || []);
  }, []);

  useEffect(() => { void fetchSources(); }, [fetchSources]);

  const handleAddSource = async () => {
    setAddError('');
    if (!newName.trim() || !newUrl.trim()) {
      setAddError('Both name and URL are required.');
      return;
    }
    try {
      new URL(newUrl); // validate URL format
    } catch {
      setAddError('Please enter a valid URL (including https://).');
      return;
    }

    const res = await fetch('/api/news/sources', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim(), url: newUrl.trim() }),
    });
    const data = await res.json() as { error?: string };
    if (!res.ok) {
      setAddError(data.error || 'Failed to add source.');
      return;
    }
    setNewName('');
    setNewUrl('');
    await fetchSources();
  };

  const handleToggle = async (id: string, is_active: boolean) => {
    await fetch(`/api/news/sources/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active }),
    });
    await fetchSources();
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/news/sources/${id}`, { method: 'DELETE' });
    await fetchSources();
  };

  const handleCrawl = async (slot: 'morning' | 'evening') => {
    setCrawling(true);
    setCrawlStatus({ message: `Starting ${slot} crawl...`, type: 'info' });
    try {
      const res = await fetch('/api/news/crawl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slot }),
      });
      const data = await res.json() as { message: string };
      setCrawlStatus({
        message: `${data.message}. Check the news feed in ~1 minute for results.`,
        type: 'success',
      });
    } catch {
      setCrawlStatus({ message: 'Failed to start crawl. Check console for errors.', type: 'error' });
    } finally {
      setCrawling(false);
    }
  };

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 60%, #24243e 100%)', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="md">
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', mb: 0.5 }}>
          Admin
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: 800, color: 'white', mb: 4, letterSpacing: '-0.02em' }}>
          News Crawler
        </Typography>

        // Manual Trigger
        <Card sx={{ backgroundColor: 'rgba(255,255,255,0.95)', mb: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Manual Trigger
            </Typography>
            {crawling && <LinearProgress sx={{ mb: 2 }} />}
            {crawlStatus && (
              <Alert severity={crawlStatus.type} sx={{ mb: 2 }} onClose={() => setCrawlStatus(null)}>
                {crawlStatus.message}
              </Alert>
            )}
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                startIcon={<WbSunny />}
                onClick={() => void handleCrawl('morning')}
                disabled={crawling}
                sx={{ backgroundColor: '#d97706' }}
              >
                Run Morning Crawl
              </Button>
              <Button
                variant="contained"
                startIcon={<Nightlight />}
                onClick={() => void handleCrawl('evening')}
                disabled={crawling}
                sx={{ backgroundColor: '#4f46e5' }}
              >
                Run Evening Crawl
              </Button>
              <Button
                variant="outlined"
                startIcon={<PlayArrow />}
                onClick={() => void handleCrawl(new Date().getHours() < 12 ? 'morning' : 'evening')}
                disabled={crawling}
              >
                Run Now (auto slot)
              </Button>
            </Stack>
            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mt: 1 }}>
              The crawl runs in the background. Results appear in the news feed after ~30-60 seconds.
              Automatic schedule: 06:00 and 18:00 daily (run <code>npm run cron:start</code>).
            </Typography>
          </CardContent>
        </Card>

        // Add Source
        <Card sx={{ backgroundColor: 'rgba(255,255,255,0.95)', mb: 3, borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Add News Source
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="Display name"
                placeholder="e.g. TechCrunch AI"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                size="small"
                fullWidth
              />
              <TextField
                label="RSS Feed URL"
                placeholder="e.g. https://techcrunch.com/category/artificial-intelligence/feed/"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                size="small"
                fullWidth
              />
              {addError && <Alert severity="error">{addError}</Alert>}
              <Button variant="contained" startIcon={<Add />} onClick={() => void handleAddSource()}>
                Add Source
              </Button>
            </Stack>
          </CardContent>
        </Card>

        // Source List
        <Card sx={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" mb={2}>
              Configured Sources ({sources.length})
            </Typography>
            {sources.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                No sources yet. Add one above or trigger a crawl to seed the defaults.
              </Typography>
            ) : (
              <Stack divider={<Divider />} spacing={0}>
                {sources.map((source) => (
                  <Stack key={source._id} direction="row" alignItems="center" justifyContent="space-between" py={1.5}>
                    <Box>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <Typography variant="body2" fontWeight={600}>{source.name}</Typography>
                        <Chip
                          label={source.is_active ? 'active' : 'paused'}
                          size="small"
                          color={source.is_active ? 'success' : 'default'}
                          sx={{ height: 18, fontSize: '0.65rem' }}
                        />
                      </Stack>
                      <Typography variant="caption" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
                        {source.url}
                      </Typography>
                    </Box>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <FormControlLabel
                        control={
                          <Switch
                            size="small"
                            checked={source.is_active}
                            onChange={(e) => void handleToggle(source._id, e.target.checked)}
                          />
                        }
                        label=""
                      />
                      <Tooltip title="Delete source">
                        <IconButton size="small" color="error" onClick={() => void handleDelete(source._id)}>
                          <Delete fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            )}
          </CardContent>
        </Card>

        <Box mt={2}>
          <Link href="/news">
            <Button variant="outlined" sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)' }}>
              View News Feed →
            </Button>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
*/
