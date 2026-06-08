'use client';

import styles from './CertificationsSection.module.css';

interface CertificationsSectionProps {
  certificationsData: string[];
}

export default function CertificationsSection({ certificationsData }: CertificationsSectionProps) {
  return (
    <section id="certifications" className="container section-spacer">
      <p className="section-label fade-up">Credentials</p>
      <h2 className="fade-up" style={{ marginBottom: '40px' }}>Certifications</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {certificationsData.map((cert, index) => (
          <div
            key={index}
            className={`${styles.certBadge} fade-up`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-glow)" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span>{cert}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
