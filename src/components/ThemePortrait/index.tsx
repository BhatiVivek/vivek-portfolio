'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useThemePreference } from '@/app/providers';
import { themes } from '@/theme/themes';
import styles from './ThemePortrait.module.css';

// Fixed particles keep server/client markup identical and make each burst repeatable.
const SPARKLE_COUNT = 40;
const SPIN_DURATION_MS = 1600;
const SPARKLE_DURATION_MS = 280;
const particles = Array.from({ length: SPARKLE_COUNT }, (_, index) => index);

export default function ThemePortrait({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const rotorRef = useRef<HTMLDivElement>(null);
  const { registerThemeAnimation } = useThemePreference();

  useEffect(() => registerThemeAnimation(async (themeId, signal) => {
    const root = rootRef.current;
    const rotor = rotorRef.current;
    if (!root || !rotor || !rotor.animate || signal.aborted) return;
    const rect = root.getBoundingClientRect();
    // Don't make someone wait for an effect outside their viewport.
    if (rect.top < 38 || rect.bottom > window.innerHeight || rect.left < 0 || rect.right > window.innerWidth) return;

    const animations: Animation[] = [];
    const cancel = () => animations.forEach((animation) => animation.cancel());
    signal.addEventListener('abort', cancel, { once: true });
    root.dataset.settled = 'true';
    root.dataset.phase = 'spinning';
    try {
      // Shrink during acceleration, then grow back and settle upright at full size.
      // Transform scaling keeps the surrounding layout and sparkle origin stable.
      const spin = rotor.animate([
        { transform: 'rotate(0deg) scale(1)', offset: 0, easing: 'ease-in' },
        { transform: 'rotate(180deg) scale(0.78)', offset: 0.4, easing: 'ease-in' },
        { transform: 'rotate(900deg) scale(0.55)', offset: 0.7, easing: 'linear' },
        { transform: 'rotate(1980deg) scale(0.9)', offset: 0.9, easing: 'ease-out' },
        { transform: 'rotate(2160deg) scale(1)', offset: 1 },
      ], { duration: SPIN_DURATION_MS, fill: 'forwards' });
      animations.push(spin);
      await spin.finished;
      if (signal.aborted) return;

      root.dataset.phase = 'sparkling';
      const colors = themes[themeId].color;
      const sparks = Array.from(root.querySelectorAll<HTMLElement>('[data-spark]'));
      const radius = rect.width / 2;
      const bursts = sparks.map((spark, index) => {
        const angle = index * Math.PI * 2 / sparks.length;
        const distance = radius + 28 + (index % 5) * 14;
        const scale = 0.65 + (index % 4) * 0.2;
        const position = (r: number) => `translate(${Math.cos(angle) * r}px, ${Math.sin(angle) * r}px)`;
        spark.style.color = index % 2 ? colors.accent : colors.sky;
        const burst = spark.animate([
          { transform: `${position(radius * 0.75)} scale(0.2) rotate(0deg)`, opacity: 0 },
          { transform: `${position(radius)} scale(${scale}) rotate(35deg)`, opacity: 1, offset: 0.2 },
          { transform: `${position(distance)} scale(0.1) rotate(100deg)`, opacity: 0 },
        ], { duration: SPARKLE_DURATION_MS, delay: (index % 4) * 10, easing: 'ease-out' });
        animations.push(burst);
        return burst.finished;
      });
      await Promise.all(bursts);
    } finally {
      signal.removeEventListener('abort', cancel);
      cancel();
      delete root.dataset.phase;
    }
  }), [registerThemeAnimation]);

  return (
    <div ref={rootRef} className={styles.portrait}>
      <div ref={rotorRef} className={styles.rotor}>{children}</div>
      <div className={styles.sparkles} aria-hidden="true">
        {particles.map((index) => (
          <svg key={index} data-spark className={styles.spark} viewBox="0 0 16 16">
            <path d="M8 0 10 6 16 8 10 10 8 16 6 10 0 8 6 6Z" fill="currentColor" />
          </svg>
        ))}
      </div>
    </div>
  );
}
