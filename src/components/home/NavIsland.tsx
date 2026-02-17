'use client';

import Link from 'next/link';
import styles from '../../app/home.module.css';

export default function NavIsland() {
  return (
    <nav className={styles.navIsland}>
      <a href="#hero" className={`${styles.navItem} ${styles.navItemActive}`}>Home</a>
      <a href="#about" className={styles.navItem}>About</a>
      <a href="#stack" className={styles.navItem}>Stack</a>
      <a href="#experience" className={styles.navItem}>Work</a>
      <Link href="/blog" className={styles.navItem}>Blog</Link>
      <Link href="/videos" className={styles.navItem}>Videos</Link>
      <a href="#contact" className={styles.navItem}>Contact</a>
    </nav>
  );
}
