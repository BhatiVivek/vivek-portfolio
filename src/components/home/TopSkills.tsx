'use client';

interface TopSkillsProps {
  topSkills: string[];
}

export default function TopSkills({ topSkills }: TopSkillsProps) {
  return (
    <section id="top-skills" className="container" style={{ paddingBottom: '40px' }}>
      <div className="fade-up" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {topSkills.map((skill, index) => (
          <div
            key={index}
            className="spotlight-card"
            style={{
              padding: '16px 32px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              borderLeft: '4px solid var(--accent-glow)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--accent-glow)" stroke="none">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '1rem' }}>{skill}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
