import { createTheme } from '@mui/material/styles';
import { colors, radius } from './tokens';
import { typography } from './typography';
import { components } from './overrides';

const theme = createTheme({
  palette: {
    primary: {
      main:         colors.accentGlow,
      light:        colors.accentDim,
      dark:         '#0A7870',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main:         colors.sky,
      contrastText: '#FFFFFF',
    },
    background: {
      default: colors.bgVoid,
      paper:   colors.bgSurface,
    },
    text: {
      primary:   colors.textPrimary,
      secondary: colors.textSecondary,
      disabled:  colors.textTertiary,
    },
    divider: colors.borderSubtle,
  },
  typography,
  shape: {
    borderRadius: radius.md,
  },
  components,
});

export default theme;
