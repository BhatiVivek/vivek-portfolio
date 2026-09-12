'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useThemePreference } from '@/app/providers';
import { themes, type ThemeId } from '@/theme';
import styles from './ThemeSwitcher.module.css';

export default function ThemeSwitcher() {
  const { themeId, setThemeId } = useThemePreference();
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const activeTheme = themes[themeId];

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (!pickerRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }

    document.addEventListener('mousedown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  function selectTheme(nextThemeId: ThemeId) {
    setThemeId(nextThemeId);
    setIsOpen(false);
  }

  return (
    <div ref={pickerRef} className={styles.switcher}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className={styles.activeSwatch} style={{ background: activeTheme.color.accentGradient }} aria-hidden="true" />
        <span className={styles.activeLabel}>{activeTheme.label}</span>
        <svg className={styles.chevron} viewBox="0 0 16 16" aria-hidden="true">
          <path d="m4 6 4 4 4-4" />
        </svg>
      </button>

      {isOpen && (
        <div id={menuId} className={styles.menu} role="menu" aria-label="Choose a site theme">
          <p className={styles.menuTitle}>Choose a theme</p>
          <p className={styles.menuHint}>Your choice is saved for future visits.</p>
          <div className={styles.options}>
            {Object.values(themes).map((theme) => {
              const isActive = theme.id === themeId;
              return (
                <button
                  key={theme.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isActive}
                  className={`${styles.option} ${isActive ? styles.optionActive : ''}`}
                  onClick={() => selectTheme(theme.id)}
                >
                  <span className={styles.themePreview} style={{ background: theme.color.page }} aria-hidden="true">
                    <span className={styles.previewPanel} style={{ background: theme.color.surface }} />
                    <span className={styles.previewAccent} style={{ background: theme.color.accentGradient }} />
                  </span>
                  <span className={styles.optionCopy}>
                    <span className={styles.optionLabel}>{theme.label}</span>
                    <span className={styles.optionDescription}>{theme.description}</span>
                  </span>
                  {isActive && (
                    <svg className={styles.checkmark} viewBox="0 0 16 16" aria-label="Selected">
                      <path d="m3.25 8.25 2.9 2.9 6.6-6.35" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
