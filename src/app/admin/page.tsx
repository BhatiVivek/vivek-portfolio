// ADMIN FEATURE — temporarily disabled (pending real authentication)
// To re-enable: restore full component and implement NextAuth or JWT-based auth
// Original code preserved below this stub

export default function AdminPage() {
  return null;
}

/*
'use client';

import { Box, Container, Typography, Card, CardContent, Button, Stack, TextField, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff, Newspaper, Logout } from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';

const ADMIN_TILES = [
  {
    href: '/admin/news',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
        <path d="M18 14h-8M15 18h-5M10 6h8v4h-8z" />
      </svg>
    ),
    label: 'News Crawler',
    description: 'Manage RSS sources, run crawls, view feed',
    accent: '#7c3aed',
    accentDim: 'rgba(124,58,237,0.12)',
  },
  {
    href: '/blog',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
    label: 'Blog',
    description: 'View published blog articles',
    accent: '#0D9488',
    accentDim: 'rgba(13,148,136,0.12)',
  },
  {
    href: '/videos',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
      </svg>
    ),
    label: 'Videos',
    description: 'View video library',
    accent: '#dc2626',
    accentDim: 'rgba(220,38,38,0.12)',
  },
];

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    if (!email || !password) { setError('Please fill in both fields.'); return; }
    // TODO: replace with real auth check
    setIsLoggedIn(true);
  };

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 60%, #24243e 100%)', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="sm">

        {!isLoggedIn ? (
          <Box>
            <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, mb: 0.5, letterSpacing: '0.08em', fontSize: '0.8rem', textTransform: 'uppercase' }}>
              Admin
            </Typography>
            <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, mb: 4, letterSpacing: '-0.02em' }}>
              Sign in
            </Typography>

            <Card sx={{
              backgroundColor: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 3,
            }}>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={2.5}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    sx={inputSx}
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPass((p) => !p)} edge="end" sx={{ color: 'rgba(255,255,255,0.4)' }}>
                            {showPass ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={inputSx}
                  />

                  {error && (
                    <Typography variant="caption" sx={{ color: '#f87171' }}>{error}</Typography>
                  )}

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleLogin}
                    sx={{
                      mt: 1, py: 1.4, fontWeight: 700, fontSize: '0.95rem', letterSpacing: '0.01em',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 8px 24px rgba(102,126,234,0.4)',
                      '&:hover': { opacity: 0.9, boxShadow: '0 8px 32px rgba(102,126,234,0.5)' },
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        ) : (
          <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={4}>
              <Box>
                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Admin
                </Typography>
                <Typography variant="h3" sx={{ color: 'white', fontWeight: 800, letterSpacing: '-0.02em' }}>
                  Dashboard
                </Typography>
              </Box>
              <Button
                startIcon={<Logout fontSize="small" />}
                onClick={() => { setIsLoggedIn(false); setEmail(''); setPassword(''); }}
                size="small"
                sx={{ color: 'rgba(255,255,255,0.45)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 2, mt: 1 }}
              >
                Sign out
              </Button>
            </Stack>

            <Stack spacing={2}>
              {ADMIN_TILES.map(({ href, icon, label, description, accent, accentDim }) => (
                <Link key={href} href={href} style={{ textDecoration: 'none' }}>
                  <Card sx={{
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 3,
                    cursor: 'pointer',
                    transition: 'border-color 0.2s, background 0.2s',
                    '&:hover': { borderColor: `${accent}55`, backgroundColor: 'rgba(255,255,255,0.07)' },
                  }}>
                    <CardContent sx={{ p: 2.5 }}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Box sx={{
                          width: 46, height: 46, borderRadius: 2, flexShrink: 0,
                          background: accentDim, color: accent,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                          {icon}
                        </Box>
                        <Box flex={1}>
                          <Typography variant="body1" sx={{ color: 'white', fontWeight: 600, lineHeight: 1.3 }}>
                            {label}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.45)' }}>
                            {description}
                          </Typography>
                        </Box>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
                          <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                        </svg>
                      </Stack>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}

const inputSx = {
  '& .MuiOutlinedInput-root': {
    color: 'white',
    '& fieldset': { borderColor: 'rgba(255,255,255,0.15)' },
    '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.35)' },
    '&.Mui-focused fieldset': { borderColor: '#764ba2' },
  },
  '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.45)' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#a78bfa' },
};
*/
