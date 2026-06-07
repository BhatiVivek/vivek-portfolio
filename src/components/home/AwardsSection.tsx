'use client';

import styles from '../../app/home.module.css';

interface AwardsSectionProps {
  awardsData: string[];
}

export default function AwardsSection({ awardsData }: AwardsSectionProps) {
  return (
    <section
      id="awards"
      className={styles.awardsSection}
    >
      {/* overlay */}
      <div className={styles.awardsOverlay} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <p className={`section-label fade-up ${styles.awardsLabel}`}>Recognition</p>
        <h2 className={`fade-up ${styles.awardsHeading}`} style={{ marginBottom: '40px' }}>
          Honors &amp; Awards
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
          {awardsData.map((award, index) => (
            <div
              key={index}
              className={`spotlight-card ${styles.awardCard} fade-up`}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className={styles.awardIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '4px' }}>{award}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>Recognition of Excellence</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
