'use client';

import { Box, Container, Typography, Card, CardContent, Button, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ArrowBack } from '@mui/icons-material';
import Link from 'next/link';

const videos = [
  { id: 1, title: 'Docker Tutorial for Beginners', thumbnail: 'https://via.placeholder.com/300x200', url: 'https://youtube.com/embed/placeholder' },
  { id: 2, title: 'Next.js Full Course', thumbnail: 'https://via.placeholder.com/300x200', url: 'https://youtube.com/embed/placeholder' },
];

export default function VideosPage() {
  return (
    <Box sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Link href="/">
          <Button startIcon={<ArrowBack />} sx={{ color: 'white', mb: 4 }}>
            Back
          </Button>
        </Link>

        <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 4 }}>
          My Videos
        </Typography>

        <Grid spacing={3} container>
          {videos.map((video) => (
            <Grid size={{ xs: 12, sm: 6 }} key={video.id}>
              <Card sx={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
                <Box
                  component="img"
                  src={video.thumbnail}
                  alt={video.title}
                  sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                    {video.title}
                  </Typography>
                  <Button variant="outlined" color="primary" fullWidth>
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
