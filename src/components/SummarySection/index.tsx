'use client';

import styles from '../../app/home.module.css';

export default function SummarySection() {
  return (
    <section id="about" className="container section-spacer" style={{ paddingTop: '60px' }}>
      <div className={`${styles.aboutGrid} fade-up`}>
        <div>
          <p className="section-label">About Me</p>
          <p className={styles.bioLead}>
            12 years across fintech, healthcare, and capital markets has taught me one thing —
            good software is 20% code and 80% understanding the domain. I specialise in{' '}
            <strong>React-led frontends</strong> backed by scalable <strong>Node.js services</strong>,
            built for the complexity that production systems actually demand.
          </p>
          <p>
            I&apos;ve delivered for clients including investment banks, clinical trial platforms, and healthcare systems —
            environments where correctness isn&apos;t optional. My stack centres on React, TypeScript, and Node.js on GCP,
            with a growing focus on AI-augmented development and cloud-native architecture. GCP Certified.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className={`spotlight-card ${styles.statCard}`}>
            <span className={styles.statNumber}>12+</span>
            <span className={styles.statLabel}>Years Experience</span>
          </div>
          <div className={`spotlight-card ${styles.statCard}`}>
            <span className={styles.statNumber}>3</span>
            <span className={styles.statLabel}>Cloud Certifications</span>
          </div>
          <div className={`spotlight-card ${styles.statCard}`}>
            <span className={styles.statNumber}>4</span>
            <span className={styles.statLabel}>Companies</span>
          </div>
        </div>
      </div>
    </section>
  );
}
