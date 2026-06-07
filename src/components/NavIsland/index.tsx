'use client';

import { useEffect, useState } from 'react';
import styles from '../../app/home.module.css';

const navLinks = [
  { href: '#hero',       label: 'Home'    },
  { href: '#about',      label: 'About'   },
  { href: '#stack',      label: 'Stack'   },
  { href: '#experience', label: 'Work'    },
  { href: '#contact',    label: 'Contact' },
];

const sectionIds = navLinks.map(l => l.href.slice(1));

export default function NavIsland() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const visibility: Record<string, number> = {};

    const pick = () => {
      const top = Object.entries(visibility).sort((a, b) => b[1] - a[1])[0];
      if (top && top[1] > 0) setActive(top[0]);
    };

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          visibility[id] = entry.intersectionRatio;
          pick();
        },
        { threshold: Array.from({ length: 21 }, (_, i) => i * 0.05) }
      );

      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return (
    <nav className={styles.navIsland}>
      {navLinks.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className={`${styles.navItem} ${active === href.slice(1) ? styles.navItemActive : ''}`}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
