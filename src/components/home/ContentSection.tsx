'use client';

import Link from 'next/link';

export default function ContentSection() {
  return (
    <section id="content" className="container section-spacer">
      <p className="section-label fade-up">Writing &amp; Media</p>
      <h2 className="fade-up" style={{ marginBottom: '40px' }}>My Content</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>

        <Link href="/blog" style={{ textDecoration: 'none' }}>
          <div className="spotlight-card fade-up" style={{ padding: '36px', cursor: 'pointer' }}>
            <div style={{
              width: '48px', height: '48px',
              background: 'var(--accent-dim)',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '20px',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-glow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Blog</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.93rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Technical notes, deep-dives, and learnings from building real-world software.
            </p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent-glow)', fontWeight: 600, fontSize: '0.875rem' }}>
              Read articles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </div>
        </Link>

        <Link href="/videos" style={{ textDecoration: 'none' }}>
          <div className="spotlight-card fade-up" style={{ padding: '36px', cursor: 'pointer', transitionDelay: '60ms' }}>
            <div style={{
              width: '48px', height: '48px',
              background: 'var(--accent-dim)',
              borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '20px',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-glow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px' }}>Videos</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.93rem', lineHeight: 1.6, marginBottom: '24px' }}>
              Video walkthroughs, tutorials, and talks on modern web development topics.
            </p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--accent-glow)', fontWeight: 600, fontSize: '0.875rem' }}>
              Watch videos
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </div>
        </Link>

      </div>
    </section>
  );
}
