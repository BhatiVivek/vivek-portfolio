'use client';

import { Box, Container, Typography, Card, CardContent, Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // TODO: Implement actual authentication
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <Container maxWidth="sm" sx={{ py: 6 }}>
        <Link href="/">
          <Button startIcon={<ArrowBack />} sx={{ color: 'white', mb: 4 }}>
            Back
          </Button>
        </Link>

        {!isLoggedIn ? (
          <Card sx={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
                Admin Login
              </Typography>

              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleLogin}
                  sx={{ mt: 2 }}
                >
                  Login
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ) : (
          <Card sx={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
            <CardContent>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 3 }}>
                Admin Dashboard
              </Typography>

              <Stack spacing={2}>
                <Link href="/admin/blog">
                  <Button variant="contained" fullWidth>
                    Manage Blogs
                  </Button>
                </Link>
                <Link href="/admin/videos">
                  <Button variant="contained" fullWidth>
                    Manage Videos
                  </Button>
                </Link>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    setIsLoggedIn(false);
                    setEmail('');
                    setPassword('');
                  }}
                >
                  Logout
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
}
