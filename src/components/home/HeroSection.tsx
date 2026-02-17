'use client';

import styles from '../../app/home.module.css';

interface HeroSectionProps {
  handleDownloadResume: () => void;
}

export default function HeroSection({ handleDownloadResume }: HeroSectionProps) {
  return (
    <section id="hero" className={`${styles.hero} container`}>
      <div className={styles.heroLightLeak}></div>
      <div className={`${styles.heroContent} fade-up`}>
        <div className={styles.heroBadge}>
          <span className={styles.heroBadgeDot}></span>
          Available for New Roles
        </div>
        <h1 className={styles.heroTitle}>
          Vivek Bhati<span className="cursor-blink"></span>
        </h1>
        <p className={styles.heroSubtitle}>
          Senior Full-Stack Developer with 10+ years of experience specializing in React, TypeScript, Node.js, 
          and cloud technologies. GCP Certified, passionate about microservices, containerization, and AI.
        </p>

        <div className={styles.heroContactRow}>
          <a href="tel:+15513588540">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            551-358-8540
          </a>
          <a href="mailto:vivekbhati9192@gmail.com">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            vivekbhati9192@gmail.com
          </a>
          <span style={{ color: 'var(--text-tertiary)' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            Jersey City, NJ
          </span>
        </div>

        <div className={styles.heroCtaGroup}>
          <a href="#experience" className="btn btn-primary">View Experience</a>
          <button onClick={handleDownloadResume} className="btn btn-secondary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download Resume
          </button>
          <a href="https://github.com/bhativivek" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/vivek-bhati-94324063/" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
