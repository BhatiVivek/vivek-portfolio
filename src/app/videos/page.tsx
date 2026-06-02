'use client';

import { useEffect, useState } from 'react';

interface Video {
  id: number;
  title: string;
  description: string;
  embedId: string;      // YouTube video ID
  category: string;
  date: string;
}

// Replace embedId values with your actual YouTube video IDs
const videos: Video[] = [
  {
    id: 1,
    title: 'Docker Tutorial for Beginners',
    description: 'A complete walkthrough of Docker containers, images, and compose from scratch.',
    embedId: 'placeholder1',
    category: 'DevOps',
    date: '2024-03-15',
  },
  {
    id: 2,
    title: 'Next.js Full Course',
    description: 'Building a full-stack app with Next.js App Router, API routes, and MongoDB.',
    embedId: 'placeholder2',
    category: 'Full Stack',
    date: '2024-05-20',
  },
];

export default function VideosPage() {
  const [active, setActive] = useState<Video | null>(null);

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
  }, []);

  return (
    <div style={{ background: 'var(--bg-void)', minHeight: '100vh' }}>
      <div className="container section-spacer">

        {/* Header */}
        <div className="fade-up" style={{ marginBottom: '48px' }}>
          <p style={{
            color: 'var(--accent-glow)', fontWeight: 600, fontSize: '0.9rem',
            marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.08em',
          }}>
            Watch
          </p>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700,
            color: 'var(--text-primary)', letterSpacing: '-0.02em',
          }}>
            My Videos
          </h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '12px', fontSize: '1rem', maxWidth: '500px' }}>
            Tutorials, walkthroughs, and deep-dives on modern web development.
          </p>
        </div>

        {/* Modal overlay for playing video */}
        {active && (
          <div
            onClick={() => setActive(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 3000,
              background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px',
            }}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              style={{ width: '100%', maxWidth: '900px' }}
            >
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '16px', overflow: 'hidden', background: '#000' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${active.embedId}?autoplay=1`}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                />
              </div>
              <button
                onClick={() => setActive(null)}
                style={{
                  marginTop: '16px', display: 'block', marginLeft: 'auto',
                  background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)',
                  color: 'white', padding: '8px 20px', borderRadius: '999px',
                  cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500,
                }}
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Video grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {videos.map((video, i) => (
            <div
              key={video.id}
              className="spotlight-card fade-up"
              onClick={() => setActive(video)}
              style={{ padding: 0, overflow: 'hidden', cursor: 'pointer', animationDelay: `${i * 60}ms` }}
            >
              {/* Thumbnail placeholder with play button */}
              <div style={{
                position: 'relative',
                paddingBottom: '56.25%',
                background: 'linear-gradient(135deg, #0f0c29, #302b63)',
              }}>
                <img
                  src={`https://img.youtube.com/vi/${video.embedId}/hqdefault.jpg`}
                  alt={video.title}
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {/* Play overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(0,0,0,0.25)',
                  transition: 'background 0.2s',
                }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.45)')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.background = 'rgba(0,0,0,0.25)')}
                >
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '50%',
                    background: 'rgba(255,255,255,0.92)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent-glow)" style={{ marginLeft: '3px' }}>
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '20px 24px 24px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '10px' }}>
                  <span style={{
                    padding: '2px 10px', borderRadius: '999px',
                    background: 'var(--accent-dim)', color: 'var(--accent-glow)',
                    fontSize: '0.75rem', fontWeight: 600,
                  }}>
                    {video.category}
                  </span>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '0.78rem' }}>
                    {new Date(video.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.01em' }}>
                  {video.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.55 }}>
                  {video.description}
                </p>
                <div style={{
                  marginTop: '16px',
                  display: 'inline-flex', alignItems: 'center', gap: '6px',
                  color: 'var(--accent-glow)', fontWeight: 600, fontSize: '0.875rem',
                }}>
                  Watch now
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {videos.length === 0 && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ color: 'var(--text-tertiary)', fontSize: '1.1rem' }}>No videos yet. Stay tuned!</p>
          </div>
        )}
      </div>
    </div>
  );
}
