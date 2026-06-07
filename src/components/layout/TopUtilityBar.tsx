'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './TopUtilityBar.module.css';

const NAV_LINKS = [
  { href: '/',       label: 'Portfolio' },
  { href: '/news',   label: 'News',    badge: 'AI' },
  { href: '/blog',   label: 'Blog' },
  { href: '/videos', label: 'Videos' },
];

export default function TopUtilityBar() {
  const pathname = usePathname();

  return (
    <div className={styles.bar}>
      <div className={styles.inner}>
        {/* Left — page links */}
        <nav className={styles.links}>
          {NAV_LINKS.map(({ href, label, badge }) => {
            const active = pathname === href || (href !== '/' && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                className={`${styles.link} ${active ? styles.active : ''}`}
              >
                {label}
                {badge && <span className={styles.badge}>{badge}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Admin link — disabled until real auth is implemented */}
        {/* <Link href="/admin" className={...}>Admin</Link> */}
      </div>
    </div>
  );
}
