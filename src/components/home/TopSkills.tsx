'use client';

import styles from './TopSkills.module.css';

interface TopSkillsProps {
  topSkills: string[];
}

export default function TopSkills({ topSkills }: TopSkillsProps) {
  return (
    <div className={styles.strip}>
      <div className={`${styles.inner} container`}>
        <span className={styles.label}>Core Stack</span>
        <span className={styles.divider} />
        <ul className={styles.list}>
          {topSkills.map((skill, i) => (
            <li key={i} className={styles.item}>
              {skill}
              {i < topSkills.length - 1 && <span className={styles.dot}>·</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
