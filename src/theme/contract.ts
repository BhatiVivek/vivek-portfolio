export const themeIds = [
  'aqua-editorial',
  'midnight-tech',
  'warm-studio',
] as const;

export type ThemeId = (typeof themeIds)[number];

export interface AppTheme {
  id: ThemeId;
  label: string;
  description: string;
  colorScheme: 'light' | 'dark';
  color: {
    page: string;
    surface: string;
    surfaceRaised: string;
    surfaceHover: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    borderStrong: string;
    accent: string;
    accentHover: string;
    accentSubtle: string;
    accentGradient: string;
    sky: string;
    focusRing: string;
    success: string;
    warning: string;
    danger: string;
    onAccent: string;
    utilityBar: string;
    utilityText: string;
    utilityTextHover: string;
    utilityActive: string;
    utilityBadge: string;
    utilityBadgeBackground: string;
    utilityBadgeBorder: string;
    heroGlow: string;
    spotlightGlow: string;
  };
  typography: {
    headingFamily: string;
    bodyFamily: string;
    bodySize: string;
    bodyLineHeight: number;
    headingWeight: number;
    headingTracking: string;
  };
  spacing: {
    sectionBlock: string;
    containerInline: string;
    cardPadding: string;
    controlBlock: string;
    controlInline: string;
  };
  shape: {
    smallRadius: string;
    cardRadius: string;
    largeRadius: string;
    pillRadius: string;
  };
  elevation: {
    card: string;
    floating: string;
    accent: string;
  };
  motion: {
    fast: string;
    normal: string;
    slow: string;
    easing: string;
  };
}
