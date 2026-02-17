'use client';

import { Box, Container, Typography, Card, CardContent, Button, Stack } from '@mui/material';
import { Add, ArrowBack } from '@mui/icons-material';
import Link from 'next/link';

const blogs = [
  { id: 1, title: 'Getting Started with Docker', excerpt: 'Learn the basics of Docker containerization...', date: '2024-01-15' },
  { id: 2, title: 'Next.js Best Practices', excerpt: 'Tips and tricks for building performant Next.js apps...', date: '2024-01-10' },
];

export default function BlogPage() {
  return (
    <Box sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh' }}>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Link href="/">
            <Button startIcon={<ArrowBack />} sx={{ color: 'white' }}>
              Back
            </Button>
          </Link>
          <Link href="/admin">
            <Button startIcon={<Add />} variant="contained">
              New Blog
            </Button>
          </Link>
        </Stack>

        <Typography variant="h3" sx={{ color: 'white', fontWeight: 'bold', mb: 4 }}>
          My Blogs
        </Typography>

        <Stack spacing={3}>
          {blogs.map((blog) => (
            <Card key={blog.id} sx={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                  {blog.date}
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {blog.excerpt}
                </Typography>
                <Button variant="outlined" color="primary">
                  Read More
                </Button>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
