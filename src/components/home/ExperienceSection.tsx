'use client';

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
      <h2 className="fade-up" style={{ marginBottom: '12px' }}>Experience</h2>
      <p className="fade-up" style={{ marginBottom: '40px' }}>
        A decade of building products across finance, healthcare, and enterprise software.
      </p>

      <div className="timeline fade-up">
        {experienceData.map((exp, expIdx) => (
          <div className="timeline-item" key={expIdx} style={{ transitionDelay: `${expIdx * 0.08}s` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <p style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent-glow)',
                margin: 0,
              }}>
                {exp.company}
              </p>
              {exp.client && (
                <>
                  <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'var(--border-highlight)', flexShrink: 0 }} />
                  <p style={{
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    letterSpacing: '0.06em',
                    color: 'var(--text-tertiary)',
                    margin: 0,
                  }}>
                    Client: {exp.client}
                  </p>
                </>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {exp.positions.map((pos, posIdx) => (
                <div
                  key={posIdx}
                  style={{
                    paddingLeft: posIdx > 0 ? '16px' : '0',
                    borderLeft: posIdx > 0 ? '2px solid var(--border-subtle)' : 'none',
                  }}
                >
                  <h3 style={{ fontSize: '1.15rem', marginBottom: '4px' }}>{pos.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    {pos.period}&nbsp;·&nbsp;{pos.location}
                  </p>
                  {pos.description && (
                    <p style={{ fontSize: '0.95rem', marginBottom: '10px' }}>{pos.description}</p>
                  )}
                  {pos.skills && pos.skills.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
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
