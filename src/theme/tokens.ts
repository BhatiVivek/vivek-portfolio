// Design tokens — single source of truth for all visual values.
// CSS variables in globals.css mirror these for CSS Modules / non-MUI components.
// Update here → both MUI components and CSS Modules stay in sync.

export const colors = {
  // Accent
  accentGlow:     '#0D9488',
  accentDim:      '#CCFBF1',
  accentGradient: 'linear-gradient(135deg, #14B8A6, #0EA5E9)',
  sky:            '#0EA5E9',

  // Backgrounds
  bgVoid:         '#F3F4F6',
  bgSurface:      '#FFFFFF',
  bgSurfaceHover: '#F9FAFB',

  // Borders
  borderSubtle:    '#E5E7EB',
  borderHighlight: '#D1D5DB',

  // Text
  textPrimary:   '#111827',
  textSecondary: '#4B5563',
  textTertiary:  '#9CA3AF',

  // Semantic
  error:   '#EF4444',
  success: '#10B981',
  warning: '#F59E0B',
} as const;

export const radius = {
  sm:   6,
  md:   12,
  lg:   20,
  pill: 999,
} as const;

export const shadows = {
  card:  '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)',
  float: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
} as const;

export const fontFamily = '"Inter", "Helvetica", "Arial", sans-serif';

export const easing = {
  out: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
} as const;
