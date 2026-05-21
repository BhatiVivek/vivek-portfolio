'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

interface Blog {
  _id?: string;
  id?: number;
  title: string;
  excerpt: string;
  url?: string;
  date: string;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios.get<Blog[]>('/api/blogs')
      .then((res) => setBlogs(res.data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));

    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.spotlight-card') as NodeListOf<HTMLElement>;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };
    document.addEventListener('mousemove', handleMouseMove);
    return () => { observer.disconnect(); document.removeEventListener('mousemove', handleMouseMove); };
  }, [blogs]);

  return (
    <>
      <div style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
        <div className="container section-spacer">

          {/* Header */}
          <div className="fade-up" style={{ marginBottom: '48px' }}>
            <Link
              href="/"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: 500,
                marginBottom: '32px',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-glow)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Back to Home
            </Link>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <p style={{ color: 'var(--accent-glow)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Writing
                </p>
                <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                  My Blogs
                </h1>
              </div>
              <Link
                href="/admin"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: 'var(--accent-gradient)',
                  color: '#fff',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  boxShadow: 'var(--shadow-float)',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                New Blog
              </Link>
            </div>
          </div>

          {/* Blog cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {blogs.map((blog, i) => (
              <div
                key={blog._id ?? blog.id ?? i}
                className="spotlight-card fade-up"
                style={{ padding: '32px', animationDelay: `${i * 60}ms` }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--accent-glow)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      marginBottom: '8px',
                    }}>
                      {new Date(blog.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px', letterSpacing: '-0.01em' }}>
                      {blog.title}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {blog.excerpt}
                    </p>
                  </div>

                  {blog.url && (
                    <a
                      href={blog.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '10px 20px',
                        border: '1.5px solid var(--accent-glow)',
                        color: 'var(--accent-glow)',
                        borderRadius: 'var(--radius-pill)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        whiteSpace: 'nowrap',
                        transition: 'all 0.3s ease',
                        flexShrink: 0,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--accent-glow)';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--accent-glow)';
                      }}
                    >
                      Read on Medium
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {blogs.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '1.1rem' }}>No blogs yet. Start writing!</p>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
