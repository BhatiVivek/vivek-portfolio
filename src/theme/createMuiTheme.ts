import { createTheme } from '@mui/material/styles';
import type { AppTheme } from './contract';
import { createComponentOverrides } from './overrides';

export function createMuiTheme(appTheme: AppTheme) {
  const { color, typography, shape } = appTheme;

  return createTheme({
    palette: {
      mode: appTheme.colorScheme,
      primary: { main: color.accent, light: color.accentSubtle, dark: color.accentHover, contrastText: color.onAccent },
      secondary: { main: color.sky, contrastText: color.onAccent },
      background: { default: color.page, paper: color.surface },
      text: { primary: color.textPrimary, secondary: color.textSecondary, disabled: color.textMuted },
      divider: color.border,
      error: { main: color.danger }, success: { main: color.success }, warning: { main: color.warning },
    },
    typography: {
      fontFamily: typography.bodyFamily,
      h1: { fontFamily: typography.headingFamily, fontWeight: typography.headingWeight, letterSpacing: typography.headingTracking },
      h2: { fontFamily: typography.headingFamily, fontWeight: typography.headingWeight, letterSpacing: typography.headingTracking },
      h3: { fontFamily: typography.headingFamily, fontWeight: typography.headingWeight, letterSpacing: typography.headingTracking },
      h4: { fontFamily: typography.headingFamily, fontWeight: typography.headingWeight, letterSpacing: typography.headingTracking },
      h5: { fontFamily: typography.headingFamily, fontWeight: typography.headingWeight, letterSpacing: typography.headingTracking },
      h6: { fontFamily: typography.headingFamily, fontWeight: typography.headingWeight, letterSpacing: typography.headingTracking },
      body1: { fontSize: typography.bodySize, lineHeight: typography.bodyLineHeight },
      body2: { lineHeight: typography.bodyLineHeight },
      caption: { color: color.textMuted },
    },
    shape: { borderRadius: Number.parseInt(shape.cardRadius, 10) },
    components: createComponentOverrides(appTheme),
  });
}
