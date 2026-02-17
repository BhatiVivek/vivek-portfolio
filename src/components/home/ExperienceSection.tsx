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
  duration?: string;
  positions: Position[];
}

interface ExperienceSectionProps {
  experienceData: Experience[];
}

export default function ExperienceSection({ experienceData }: ExperienceSectionProps) {
  return (
    <section id="experience" className="container section-spacer">
      <h2 className="fade-up" style={{ marginBottom: '40px' }}>Experience</h2>
      <div className="timeline fade-up">
        {experienceData.map((exp, expIdx) =>
          exp.positions.map((pos, posIdx) => (
            <div className="timeline-item" key={`${expIdx}-${posIdx}`}>
              <h3 style={{ fontSize: '1.25rem' }}>{pos.title}</h3>
              <div style={{ color: 'var(--accent-glow)', fontSize: '0.9rem', marginBottom: '8px', fontWeight: 600 }}>
                {exp.company} | {pos.period}
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-tertiary)', marginBottom: '8px' }}>
                {pos.location}
              </p>
              {pos.description && (
                <p style={{ fontSize: '0.95rem', marginBottom: '12px' }}>{pos.description}</p>
              )}
              {pos.skills && pos.skills.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {pos.skills.map((skill, idx) => (
                    <span key={idx} className="tech-pill">{skill}</span>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}
