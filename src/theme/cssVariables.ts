import type { CSSProperties } from 'react';
import type { AppTheme } from './contract';

export type ThemeVariableStyle = CSSProperties & Record<`--${string}`, string>;

export function getThemeVariables(theme: AppTheme): ThemeVariableStyle {
  const { color, typography, spacing, shape, elevation, motion } = theme;
  return {
    '--bg-void': color.page,
    '--bg-surface': color.surface,
    '--bg-surface-raised': color.surfaceRaised,
    '--bg-surface-hover': color.surfaceHover,
    '--border-subtle': color.border,
    '--border-highlight': color.borderStrong,
    '--accent-glow': color.accent,
    '--accent-hover': color.accentHover,
    '--accent-dim': color.accentSubtle,
    '--accent-gradient': color.accentGradient,
    '--sky': color.sky,
    '--text-primary': color.textPrimary, '--text-secondary': color.textSecondary, '--text-tertiary': color.textMuted, '--color-error': color.danger, '--color-success': color.success, '--color-warning': color.warning, '--color-on-accent': color.onAccent, '--color-focus-ring': color.focusRing,
    '--utility-bar': color.utilityBar, '--utility-text': color.utilityText, '--utility-text-hover': color.utilityTextHover, '--utility-active': color.utilityActive, '--utility-badge': color.utilityBadge, '--utility-badge-background': color.utilityBadgeBackground, '--utility-badge-border': color.utilityBadgeBorder,
    '--hero-glow': color.heroGlow, '--spotlight-glow': color.spotlightGlow,
    '--font-heading': typography.headingFamily, '--font-body': typography.bodyFamily, '--font-size-body': typography.bodySize, '--line-height-body': String(typography.bodyLineHeight), '--font-weight-heading': String(typography.headingWeight), '--letter-spacing-heading': typography.headingTracking,
    '--space-section': spacing.sectionBlock, '--space-container-inline': spacing.containerInline, '--space-card-padding': spacing.cardPadding, '--space-control-block': spacing.controlBlock, '--space-control-inline': spacing.controlInline,
    '--radius-sm': shape.smallRadius, '--radius-md': shape.cardRadius, '--radius-lg': shape.largeRadius, '--radius-pill': shape.pillRadius,
    '--shadow-card': elevation.card, '--shadow-float': elevation.floating, '--shadow-accent': elevation.accent,
    '--motion-fast': motion.fast, '--motion-normal': motion.normal, '--motion-slow': motion.slow, '--ease-out': motion.easing,
  };
}

export function applyThemeVariables(theme: AppTheme) {
  const root = document.documentElement;
  root.dataset.theme = theme.id;
  root.style.colorScheme = theme.colorScheme;
  Object.entries(getThemeVariables(theme)).forEach(([name, value]) => root.style.setProperty(name, value));
}
