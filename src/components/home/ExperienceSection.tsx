'use client';

import styles from '../../app/home.module.css';

interface Position {
  title: string;
  period: string;
  location: string;
  description?: string;
  skills?: string[];
}

interface Experience {
  company: string;
  client?: string;
  duration?: string;
  positions: Position[];
}

interface ExperienceSectionProps {
  experienceData: Experience[];
}

export default function ExperienceSection({ experienceData }: ExperienceSectionProps) {
  return (
    <section id="experience" className="container section-spacer">
      <p className="section-label fade-up">Work History</p>
      <h2 className={`fade-up ${styles.sectionHeading}`}>Experience</h2>
      <p className={`fade-up ${styles.sectionSubtitle}`}>
        A decade of building products across finance, healthcare, and enterprise software.
      </p>

      <div className="timeline fade-up">
        {experienceData.map((exp, expIdx) => (
          <div className="timeline-item" key={expIdx} style={{ transitionDelay: `${expIdx * 0.08}s` }}>
            <div className={styles.companyHeader}>
              <p className={styles.companyName}>{exp.company}</p>
              {exp.client && (
                <>
                  <span className={styles.clientDot} />
                  <p className={styles.clientName}>Client: {exp.client}</p>
                </>
              )}
            </div>

            <div className={styles.positionsGroup}>
              {exp.positions.map((pos, posIdx) => (
                <div
                  key={posIdx}
                  className={posIdx > 0 ? styles.positionItemIndented : undefined}
                >
                  <h3 className={styles.positionTitle}>{pos.title}</h3>
                  <p className={styles.positionPeriod}>
                    {pos.period}&nbsp;·&nbsp;{pos.location}
                  </p>
                  {pos.description && (
                    <p className={styles.positionDesc}>{pos.description}</p>
                  )}
                  {pos.skills && pos.skills.length > 0 && (
                    <div className={styles.positionSkills}>
                      {pos.skills.map((skill, idx) => (
                        <span key={idx} className="tech-pill">{skill}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
