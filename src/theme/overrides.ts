import type { ThemeOptions } from '@mui/material/styles';
import { colors } from './tokens';

export const components: ThemeOptions['components'] = {
  MuiCssBaseline: {
    styleOverrides: {
      '*, *::before, *::after': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      body: {
        lineHeight: 1.6,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        overflowX: 'hidden',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontWeight: 600,
        letterSpacing: '-0.02em',
        color: colors.textPrimary,
      },
      p: {
        color: colors.textSecondary,
        fontSize: '1.05rem',
      },
      a: {
        textDecoration: 'none',
        color: 'inherit',
        transition: 'color 0.3s ease',
      },
    },
  },
};
