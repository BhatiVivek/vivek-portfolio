'use client';

import { useEffect } from 'react';
import Link from 'next/link';

const videos = [
  {
    id: 1,
    title: 'Building a Full-Stack Developer Portfolio from Scratch',
    description: 'End-to-end walkthrough of building this portfolio — Next.js App Router, MongoDB, Nodemailer contact form, security hardening, and deploying to Vercel.',
    thumbnail: '/images/video-one-image.png',
    url: 'https://youtube.com/embed/placeholder',
    tags: ['Next.js', 'MongoDB', 'Vercel', 'Full Stack'],
  },
  {
    id: 2,
    title: 'System Design Basics — Where to Start',
    description: 'A practical introduction to system design fundamentals — scalability, load balancing, caching, databases, and the key trade-offs every engineer should know.',
    thumbnail: 'https://via.placeholder.com/600x340',
    url: 'https://youtube.com/embed/placeholder',
    tags: ['System Design', 'Architecture', 'Backend'],
  },
];

export default function VideosPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      <div className="container" style={{ paddingTop: '64px', paddingBottom: '100px' }}>

        {/* Coming soon banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: 'var(--accent-dim)',
          border: '1px solid var(--accent-glow)',
          borderRadius: 'var(--radius-md)',
          padding: '12px 20px',
          marginBottom: '40px',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-glow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--accent-glow)', fontWeight: 500 }}>
            Videos are being recorded and will be available here soon. Stay tuned!
          </p>
        </div>

        {/* Back link */}
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            fontWeight: 500,
            marginBottom: '48px',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-glow)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back to Portfolio
        </Link>

        {/* Header */}
        <p className="section-label fade-up">Content</p>
        <h1 className="fade-up" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '12px', lineHeight: 1.1 }}>
          Videos &amp; Tutorials
        </h1>
        <p className="fade-up" style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '56px', maxWidth: '520px' }}>
          Technical screencasts and walkthroughs on topics I work with day-to-day.
        </p>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '28px',
        }}>
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="spotlight-card fade-up"
              style={{ transitionDelay: `${index * 0.1}s`, display: 'flex', flexDirection: 'column' }}
            >
              {/* Thumbnail */}
              <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '20px 20px 0 0', aspectRatio: '16/9' }}>
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                {/* Play button overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.25)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                >
                  <div style={{
                    width: '52px', height: '52px',
                    background: 'var(--bg-surface)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: 'var(--shadow-float)',
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent-glow)">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {video.tags.map(tag => (
                    <span key={tag} className="tech-pill">{tag}</span>
                  ))}
                </div>

                <h3 style={{ fontSize: '1.05rem', lineHeight: 1.35, color: 'var(--text-primary)' }}>
                  {video.title}
                </h3>

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, flex: 1 }}>
                  {video.description}
                </p>

                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
                  style={{ marginTop: '8px', fontSize: '0.9rem', padding: '12px 24px' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Watch Video
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {videos.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-tertiary)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ marginBottom: '16px', opacity: 0.4 }}>
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" /><line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" /><line x1="2" y1="7" x2="7" y2="7" />
              <line x1="2" y1="17" x2="7" y2="17" /><line x1="17" y1="17" x2="22" y2="17" />
              <line x1="17" y1="7" x2="22" y2="7" />
            </svg>
            <p>No videos yet. Check back soon.</p>
          </div>
        )}

      </div>
    </main>
  );
}
