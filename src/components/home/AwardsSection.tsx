'use client';

import styles from '../../app/home.module.css';

interface AwardsSectionProps {
  awardsData: string[];
}

export default function AwardsSection({ awardsData }: AwardsSectionProps) {
  return (
    <section id="awards" className="container" style={{ paddingBottom: '60px' }}>
      <h2 className="fade-up" style={{ marginBottom: '40px' }}>Honors & Awards</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
        {awardsData.map((award, index) => (
          <div
            key={index}
            className={`spotlight-card ${styles.awardCard} fade-up`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <span className={styles.awardIcon}>🏆</span>
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{award}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Recognition of Excellence</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
