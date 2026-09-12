import type { AppTheme, ThemeId } from './contract';

export const themes: Record<ThemeId, AppTheme> = {
  'aqua-editorial': {
    id: 'aqua-editorial',
    label: 'Aqua Editorial',
    description: 'Clean teal and sky blue, with the current portfolio look.',
    colorScheme: 'light',
    color: {
      page: '#F3F4F6', surface: '#FFFFFF', surfaceRaised: 'rgba(255, 255, 255, 0.78)', surfaceHover: '#F9FAFB',
      textPrimary: '#111827', textSecondary: '#4B5563', textMuted: '#9CA3AF', border: '#E5E7EB', borderStrong: '#D1D5DB',
      accent: '#0D9488', accentHover: '#0A7870', accentSubtle: '#CCFBF1', accentGradient: 'linear-gradient(135deg, #14B8A6, #0EA5E9)', sky: '#0EA5E9',
      focusRing: '#0D9488', success: '#10B981', warning: '#F59E0B', danger: '#EF4444', onAccent: '#FFFFFF',
      utilityBar: 'rgba(10, 8, 28, 0.82)', utilityText: 'rgba(255, 255, 255, 0.45)', utilityTextHover: 'rgba(255, 255, 255, 0.88)', utilityActive: 'rgba(255, 255, 255, 0.10)', utilityBadge: '#A78BFA', utilityBadgeBackground: 'rgba(167, 139, 250, 0.15)', utilityBadgeBorder: 'rgba(167, 139, 250, 0.30)',
      heroGlow: 'rgba(14, 165, 233, 0.15)', spotlightGlow: 'rgba(14, 165, 233, 0.04)',
    },
    typography: { headingFamily: 'var(--font-inter), "Helvetica", "Arial", sans-serif', bodyFamily: 'var(--font-inter), "Helvetica", "Arial", sans-serif', bodySize: '1.05rem', bodyLineHeight: 1.6, headingWeight: 600, headingTracking: '-0.02em' },
    spacing: { sectionBlock: '100px', containerInline: '24px', cardPadding: '24px', controlBlock: '14px', controlInline: '28px' },
    shape: { smallRadius: '6px', cardRadius: '12px', largeRadius: '20px', pillRadius: '999px' },
    elevation: { card: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)', floating: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)', accent: '0 4px 12px rgba(13, 148, 136, 0.3)' },
    motion: { fast: '150ms', normal: '300ms', slow: '800ms', easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' },
  },
  'midnight-tech': {
    id: 'midnight-tech', label: 'Midnight Tech', description: 'Deep navy, cyan highlights, and a precise technical character.', colorScheme: 'dark',
    color: {
      page: '#0B1220', surface: '#111C2E', surfaceRaised: 'rgba(17, 28, 46, 0.82)', surfaceHover: '#18263A', textPrimary: '#F8FAFC', textSecondary: '#CBD5E1', textMuted: '#94A3B8', border: '#26364D', borderStrong: '#415572',
      accent: '#22D3EE', accentHover: '#67E8F9', accentSubtle: '#083344', accentGradient: 'linear-gradient(135deg, #22D3EE, #8B5CF6)', sky: '#8B5CF6', focusRing: '#67E8F9', success: '#34D399', warning: '#FBBF24', danger: '#FB7185', onAccent: '#06212A',
      utilityBar: 'rgba(5, 11, 22, 0.88)', utilityText: '#94A3B8', utilityTextHover: '#F8FAFC', utilityActive: 'rgba(34, 211, 238, 0.14)', utilityBadge: '#C4B5FD', utilityBadgeBackground: 'rgba(139, 92, 246, 0.18)', utilityBadgeBorder: 'rgba(196, 181, 253, 0.38)', heroGlow: 'rgba(34, 211, 238, 0.18)', spotlightGlow: 'rgba(34, 211, 238, 0.08)',
    },
    typography: { headingFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace', bodyFamily: 'var(--font-inter), "Helvetica", "Arial", sans-serif', bodySize: '1rem', bodyLineHeight: 1.65, headingWeight: 600, headingTracking: '-0.04em' },
    spacing: { sectionBlock: '88px', containerInline: '24px', cardPadding: '22px', controlBlock: '13px', controlInline: '24px' }, shape: { smallRadius: '4px', cardRadius: '10px', largeRadius: '16px', pillRadius: '999px' },
    elevation: { card: '0 10px 24px rgba(2, 8, 23, 0.28)', floating: '0 22px 48px rgba(2, 8, 23, 0.48)', accent: '0 6px 18px rgba(34, 211, 238, 0.22)' }, motion: { fast: '130ms', normal: '240ms', slow: '650ms', easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
  },
  'warm-studio': {
    id: 'warm-studio', label: 'Warm Studio', description: 'Warm paper surfaces, editorial headings, and an inviting accent.', colorScheme: 'light',
    color: {
      page: '#FFF8F0', surface: '#FFFDFC', surfaceRaised: 'rgba(255, 253, 252, 0.84)', surfaceHover: '#FFF4E6', textPrimary: '#312A25', textSecondary: '#665B53', textMuted: '#9C8E84', border: '#E9DCCF', borderStrong: '#D8C4B2',
      accent: '#B45309', accentHover: '#92400E', accentSubtle: '#FEF3C7', accentGradient: 'linear-gradient(135deg, #D97706, #EA580C)', sky: '#C2410C', focusRing: '#B45309', success: '#15803D', warning: '#B45309', danger: '#B91C1C', onAccent: '#FFFFFF',
      utilityBar: 'rgba(49, 42, 37, 0.90)', utilityText: 'rgba(255, 248, 240, 0.62)', utilityTextHover: '#FFF8F0', utilityActive: 'rgba(255, 248, 240, 0.14)', utilityBadge: '#FDE68A', utilityBadgeBackground: 'rgba(251, 191, 36, 0.18)', utilityBadgeBorder: 'rgba(253, 230, 138, 0.34)', heroGlow: 'rgba(234, 88, 12, 0.13)', spotlightGlow: 'rgba(180, 83, 9, 0.06)',
    },
    typography: { headingFamily: 'Georgia, "Times New Roman", serif', bodyFamily: 'var(--font-inter), "Helvetica", "Arial", sans-serif', bodySize: '1.05rem', bodyLineHeight: 1.7, headingWeight: 600, headingTracking: '-0.025em' },
    spacing: { sectionBlock: '108px', containerInline: '24px', cardPadding: '28px', controlBlock: '15px', controlInline: '30px' }, shape: { smallRadius: '8px', cardRadius: '16px', largeRadius: '28px', pillRadius: '999px' },
    elevation: { card: '0 6px 18px rgba(91, 59, 37, 0.08)', floating: '0 24px 40px rgba(91, 59, 37, 0.14)', accent: '0 6px 18px rgba(180, 83, 9, 0.24)' }, motion: { fast: '180ms', normal: '320ms', slow: '850ms', easing: 'cubic-bezier(0.22, 1, 0.36, 1)' },
  },
};

export const defaultThemeId: ThemeId = 'aqua-editorial';

export function isThemeId(value: string | undefined): value is ThemeId {
  return Boolean(value && Object.prototype.hasOwnProperty.call(themes, value));
}

export function getTheme(id: ThemeId | undefined) {
  return themes[id ?? defaultThemeId];
}
