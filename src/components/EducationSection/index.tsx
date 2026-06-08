'use client';

import styles from './EducationSection.module.css';

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
      <h2 className={`fade-up ${styles.sectionSubtitle}`}>Education</h2>
      <div className={styles.educationGrid}>
        {educationData.map((edu, index) => (
          <div
            key={index}
            className={`spotlight-card ${styles.educationCard} fade-up`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className={styles.stackIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
              </svg>
            </div>
            <h3 className={styles.educationTitle}>{edu.degree}</h3>
            <p className={styles.educationField}>{edu.field}</p>
            <p className={styles.educationInstitution}>{edu.institution}</p>
            <p className={styles.educationPeriod}>{edu.period}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
