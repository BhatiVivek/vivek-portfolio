'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { applyThemeVariables, createMuiTheme, getTheme, isThemeId, type ThemeId } from '../theme';

type ThemeAnimation = (themeId: ThemeId, signal: AbortSignal) => Promise<void>;

type ThemeContextValue = {
  themeId: ThemeId;
  setThemeId: (themeId: ThemeId) => void;
  pendingThemeId: ThemeId | null;
  requestThemeChange: (themeId: ThemeId) => Promise<void>;
  registerThemeAnimation: (animation: ThemeAnimation) => () => void;
};

const ThemePreferenceContext = createContext<ThemeContextValue | null>(null);

export function useThemePreference() {
  const context = useContext(ThemePreferenceContext);
  if (!context) throw new Error('useThemePreference must be used within Providers');
  return context;
}

export function Providers({ children, initialThemeId }: { children: ReactNode; initialThemeId: ThemeId }) {
  const [themeId, setThemeIdState] = useState(initialThemeId);
  const [pendingThemeId, setPendingThemeId] = useState<ThemeId | null>(null);
  const animationRef = useRef<ThemeAnimation | null>(null);
  const transitionRef = useRef<AbortController | null>(null);
  const mountedRef = useRef(true);
  const activeTheme = useMemo(() => getTheme(themeId), [themeId]);
  const muiTheme = useMemo(() => createMuiTheme(activeTheme), [activeTheme]);

  function setThemeId(nextThemeId: ThemeId) {
    if (!isThemeId(nextThemeId)) return;
    setThemeIdState(nextThemeId);
    applyThemeVariables(getTheme(nextThemeId));
    document.cookie = `portfolio-theme=${nextThemeId}; path=/; max-age=31536000; samesite=lax`;
  }

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      transitionRef.current?.abort();
    };
  }, []);

  // The home portrait registers an optional visual effect. Other routes apply immediately.
  const registerThemeAnimation = useCallback((animation: ThemeAnimation) => {
    animationRef.current = animation;
    return () => {
      if (animationRef.current === animation) {
        animationRef.current = null;
        transitionRef.current?.abort();
      }
    };
  }, []);

  async function requestThemeChange(nextThemeId: ThemeId) {
    if (!isThemeId(nextThemeId) || nextThemeId === themeId || transitionRef.current) return;
    const controller = new AbortController();
    transitionRef.current = controller;
    setPendingThemeId(nextThemeId);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const cancelMotion = () => controller.abort();
    const onVisibilityChange = () => { if (document.hidden) cancelMotion(); };
    reducedMotion.addEventListener('change', cancelMotion);
    document.addEventListener('visibilitychange', onVisibilityChange);
    // A cancelled/unmounted effect must never leave the theme picker locked.
    const fallback = window.setTimeout(cancelMotion, 4000);
    try {
      if (!reducedMotion.matches && !document.hidden) {
        await animationRef.current?.(nextThemeId, controller.signal);
      }
    } catch {
      // Animation failure or navigation still commits the visitor's selected theme.
    } finally {
      window.clearTimeout(fallback);
      reducedMotion.removeEventListener('change', cancelMotion);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      transitionRef.current = null;
      if (mountedRef.current) {
        setThemeId(nextThemeId);
        setPendingThemeId(null);
      }
    }
  }

  return (
    <ThemePreferenceContext.Provider value={{ themeId, setThemeId, pendingThemeId, requestThemeChange, registerThemeAnimation }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemePreferenceContext.Provider>
  );
}
