'use client';

import styles from '../../app/home.module.css';

interface HeroSectionProps {
  handleDownloadResume: () => void;
}

export default function HeroSection({ handleDownloadResume }: HeroSectionProps) {
  return (
    <section id="hero" className={`${styles.hero} container`}>
      <div className={styles.heroLightLeak}></div>
      <div className={`${styles.heroLayout} fade-up`}>

        {/* Left: Text Content */}
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot}></span>
            Available for Discussion
          </div>
          <h1 className={styles.heroTitle}>
            Vivek Bhati<span className="cursor-blink"></span>
          </h1>
          <p className={styles.heroSubtitle}>
            Senior Full-Stack Developer with 12+ years of experience specializing in React, TypeScript, Node.js, and cloud-native architectures. GCP Certified,
            with hands-on AEM UI experience and a strong interest in microservices and AI.
          </p>

          <div className={styles.heroContactRow}>
            <span className={styles.contactItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              551-35*-****
            </span>
            <span className={styles.contactItem}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              vivekbhati****@gmail.com
            </span>
            <span className={styles.contactItemTertiary}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Jersey City, NJ
            </span>
          </div>

          {/* <div className={styles.heroCtaGroup}>
            <a href="#experience" className="btn btn-secondary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              View Experience
            </a>
            <button onClick={handleDownloadResume} className="btn btn-accent">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 18 15 15"/></svg>
              Download Resume
            </button>
          </div> */}
        </div>

        {/* Centre: Vertical social stack */}
        <div className={styles.heroSocialStack}>
          <a href="https://github.com/bhativivek" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.socialIconGithub}`} title="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
          </a>
          <a href="https://www.linkedin.com/in/vivek-bhati-94324063/" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.socialIconLinkedin}`} title="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://medium.com/@vivekbhati9192" target="_blank" rel="noopener noreferrer" className={`${styles.socialIcon} ${styles.socialIconMedium}`} title="Medium">
            <svg width="16" height="16" viewBox="0 0 640 640" fill="currentColor"><path d="M180.5 74.262C80.813 74.262 0 155.633 0 256s80.819 181.738 180.5 181.738S361 356.373 361 256 280.181 74.262 180.5 74.262zm288.25 10.652c-49.845 0-90.245 76.619-90.245 171.095s40.406 171.095 90.245 171.095 90.251-76.619 90.251-171.095-40.412-171.095-90.251-171.095zm139.506 18.262c-17.526 0-31.735 68.448-31.735 152.835s14.21 152.835 31.735 152.835S640 340.631 640 256.249 625.785 103.176 608.256 103.176z"/></svg>
          </a>
        </div>

        {/* Right: Profile Picture */}
        <div className={styles.heroProfileWrapper}>
          <div className={styles.heroProfileRing}>
            <div className={styles.heroProfileImageContainer}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/profile.png"
                alt="Vivek Bhati"
                className={styles.heroProfileImage}
              />
            </div>
          </div>
          <div className={styles.heroProfileDots} aria-hidden="true" />
          <div className={styles.heroProfileBadge}>
            <span>12+</span>
            <small>Years Exp.</small>
          </div>
        </div>

      </div>
    </section>
  );
}
