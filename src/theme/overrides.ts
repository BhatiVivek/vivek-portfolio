import type { ThemeOptions } from '@mui/material/styles';
import type { AppTheme } from './contract';

export function createComponentOverrides(theme: AppTheme): ThemeOptions['components'] {
  const { color, typography } = theme;

  return {
  MuiCssBaseline: {
    styleOverrides: {
      '*, *::before, *::after': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      body: {
        backgroundColor: color.page,
        color: color.textPrimary,
        fontFamily: typography.bodyFamily,
        lineHeight: typography.bodyLineHeight,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        overflowX: 'hidden',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: typography.headingFamily,
        fontWeight: typography.headingWeight,
        letterSpacing: typography.headingTracking,
        color: color.textPrimary,
      },
      p: {
        color: color.textSecondary,
        fontSize: typography.bodySize,
      },
      a: {
        textDecoration: 'none',
        color: 'inherit',
        transition: 'color 0.3s ease',
      },
    },
  },
};
}
