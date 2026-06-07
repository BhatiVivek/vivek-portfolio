'use client';

import Link from 'next/link';
import styles from '../../app/home.module.css';

export default function ContentSection() {
  return (
    <section id="content" className="container section-spacer">
      <p className="section-label fade-up">Writing &amp; Media</p>
      <h2 className={`fade-up ${styles.sectionSubtitle}`}>My Content</h2>
      <div className={styles.contentGrid}>

        <Link href="/blog" style={{ textDecoration: 'none' }}>
          <div className={`spotlight-card ${styles.contentCard} fade-up`}>
            <div className={styles.contentIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-glow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
            </div>
            <h3 className={styles.contentTitle}>Blog</h3>
            <p className={styles.contentDesc}>
              Technical notes, deep-dives, and learnings from building real-world software.
            </p>
            <span className={styles.contentLink}>
              Read articles
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </div>
        </Link>

        <Link href="/videos" style={{ textDecoration: 'none' }}>
          <div className={`spotlight-card ${styles.contentCard} fade-up`} style={{ transitionDelay: '60ms' }}>
            <div className={styles.contentIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--accent-glow)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
              </svg>
            </div>
            <h3 className={styles.contentTitle}>Videos</h3>
            <p className={styles.contentDesc}>
              Video walkthroughs, tutorials, and talks on modern web development topics.
            </p>
            <span className={styles.contentLink}>
              Watch videos
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </span>
          </div>
        </Link>

      </div>
    </section>
  );
}
