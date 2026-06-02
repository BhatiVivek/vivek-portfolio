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

        {/* Right — admin entry */}
        <Link
          href="/admin"
          className={`${styles.link} ${styles.adminLink} ${pathname.startsWith('/admin') ? styles.active : ''}`}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          Admin
        </Link>
      </div>
    </div>
  );
}
