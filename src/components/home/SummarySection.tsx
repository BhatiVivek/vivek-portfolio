'use client';

import styles from '../../app/home.module.css';

export default function SummarySection() {
  return (
    <section id="about" className="container section-spacer">
      <div className={`${styles.aboutGrid} fade-up`}>
        <div>
          <h4 className="section-label">ABOUT ME</h4>
          <p className={styles.bioLead}>
            I bridge the gap between complex backend logic and fluid frontend experiences. With a focus on{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>System Design</span> and{' '}
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>Cloud Architecture</span>, I build applications that scale.
          </p>
          <p>
            Experienced Senior Software Engineer with a strong background in full-stack development. 
            Expertise spans modern frontend frameworks (React, TypeScript), backend technologies (Node.js, ASP.NET), 
            and cloud platforms (GCP, AWS). Specialized domains include Investment Banking, Finance, and Healthcare. 
            Passionate about leveraging AI and cloud technologies to build innovative solutions.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className={`spotlight-card ${styles.statCard}`}>
            <span className={styles.statNumber}>10+</span>
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
