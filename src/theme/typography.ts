import type { ThemeOptions } from '@mui/material/styles';
import { fontFamily } from './tokens';

export const typography: ThemeOptions['typography'] = {
  fontFamily,
  h1: { fontWeight: 600, letterSpacing: '-0.02em' },
  h2: { fontWeight: 600, letterSpacing: '-0.02em' },
  h3: { fontWeight: 600, letterSpacing: '-0.02em' },
  h4: { fontWeight: 600, letterSpacing: '-0.02em' },
  h5: { fontWeight: 600, letterSpacing: '-0.02em' },
  h6: { fontWeight: 600, letterSpacing: '-0.02em' },
  body1: { fontSize: '1.05rem', lineHeight: 1.6 },
  body2: { lineHeight: 1.6 },
  caption: { color: '#9CA3AF' },
};
