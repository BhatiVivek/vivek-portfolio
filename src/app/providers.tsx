'use client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { applyThemeVariables, createMuiTheme, getTheme, isThemeId, type ThemeId } from '../theme';

type ThemeContextValue = {
  themeId: ThemeId;
  setThemeId: (themeId: ThemeId) => void;
};

const ThemePreferenceContext = createContext<ThemeContextValue | null>(null);

export function useThemePreference() {
  const context = useContext(ThemePreferenceContext);
  if (!context) throw new Error('useThemePreference must be used within Providers');
  return context;
}

export function Providers({ children, initialThemeId }: { children: ReactNode; initialThemeId: ThemeId }) {
  const [themeId, setThemeIdState] = useState(initialThemeId);
  const activeTheme = useMemo(() => getTheme(themeId), [themeId]);
  const muiTheme = useMemo(() => createMuiTheme(activeTheme), [activeTheme]);

  function setThemeId(nextThemeId: ThemeId) {
    if (!isThemeId(nextThemeId)) return;
    setThemeIdState(nextThemeId);
    applyThemeVariables(getTheme(nextThemeId));
    document.cookie = `portfolio-theme=${nextThemeId}; path=/; max-age=31536000; samesite=lax`;
  }

  return (
    <ThemePreferenceContext.Provider value={{ themeId, setThemeId }}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemePreferenceContext.Provider>
  );
}
