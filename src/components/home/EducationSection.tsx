'use client';

import styles from '../../app/home.module.css';

interface Education {
  institution: string;
  degree: string;
  field: string;
  period: string;
}

interface EducationSectionProps {
  educationData: Education[];
}

export default function EducationSection({ educationData }: EducationSectionProps) {
  return (
    <section id="education" className="container section-spacer">
      <p className="section-label fade-up">Background</p>
      <h2 className="fade-up" style={{ marginBottom: '40px' }}>Education</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {educationData.map((edu, index) => (
          <div
            key={index}
            className={`spotlight-card ${styles.educationCard} fade-up`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className={styles.stackIcon} style={{ marginBottom: '16px' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
              </svg>
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '4px' }}>{edu.degree}</h3>
            <p style={{ color: 'var(--accent-glow)', fontWeight: 600, fontSize: '0.88rem', marginBottom: '4px' }}>{edu.field}</p>
            <p style={{ fontSize: '0.93rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>{edu.institution}</p>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-tertiary)' }}>{edu.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
