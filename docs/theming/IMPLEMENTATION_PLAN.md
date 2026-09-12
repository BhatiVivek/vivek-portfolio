# Multi-theme system implementation plan

## Purpose

Build a maintainable theme system for this Next.js 16, React 19, and MUI 7 portfolio. It will support three initial themes and can safely grow to five. A theme changes a coordinated visual system, not merely an accent colour:

- colours and interaction states;
- typography;
- spacing density;
- shape (radius);
- elevation (shadows);
- motion;
- decorative treatments such as gradients.

The system must keep MUI components and CSS Modules in sync, preserve accessibility, persist a visitor's choice, and render the saved preference without a visible flash of the default theme.

## Current repository assessment

The repository already has an excellent starting point:

- `src/theme/tokens.ts` defines values for MUI.
- `src/theme/index.ts` turns those values into a MUI theme.
- `src/app/globals.css` exposes CSS custom properties for CSS Modules.
- `src/app/providers.tsx` installs the MUI provider.

The main limitation is duplication. `tokens.ts` and `globals.css` contain separate copies of the same values, and some components contain visual literals (colours, `rgba()` values, spacing, radii, and shadows) directly in CSS Modules or inline React styles. Five themes would be difficult to maintain in that form.

## The principle: components use intent, not raw values

Use three levels of tokens.

```text
Primitive tokens       Raw scale values, e.g. teal-500 or space-16
        ↓
Semantic tokens        Purpose, e.g. color-accent or space-card-padding
        ↓
Component tokens       Optional component details, e.g. button-primary-background
```

Components should use semantic values such as `var(--color-surface)` and `var(--space-6)`, never `#FFFFFF` or `24px` for a themeable property.

```css
/* Avoid */
.card {
  padding: 24px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.75);
}

/* Prefer */
.card {
  padding: var(--space-card-padding);
  border-radius: var(--radius-card);
  background: var(--color-surface-raised);
}
```

## What changes with a theme

| Category | Examples | Rule |
| --- | --- | --- |
| Colour | surfaces, text, borders, accents, focus and status colours | Theme-dependent |
| Typography | heading/body font, weights, scale, tracking, line-height | Theme-dependent |
| Density | gaps, card padding, section rhythm | Theme-dependent within safe limits |
| Shape | card, input and button rounding | Theme-dependent |
| Elevation | card, floating and modal shadows | Theme-dependent |
| Motion | duration, easing and hover intensity | Theme-dependent; respect reduced motion |
| Layout | breakpoints, page hierarchy, navigation behaviour | Usually stable |
| Brand colours | LinkedIn, GitHub, third-party logos | Usually fixed |

Do not make every layout dimension theme-specific. Large design systems treat compact/comfortable spacing as **density**, while preserving component usability and touch-target sizes.

## Recommended theme set

Ship the first three, then add the last two after the design system is stable.

1. **Aqua Editorial** — the current light teal/sky direction.
2. **Midnight Tech** — dark navy/slate surfaces, cyan/violet accent, developer-focused feel.
3. **Warm Studio** — warm ivory, charcoal text, amber/coral accent, softer shape.
4. **Mono Professional** — neutral grayscale, restrained blue accent, compact density.
5. **Aurora Glass** — deep gradient, translucent panels, indigo accent, expressive rounding.

Each theme needs its own complete semantic token set. A dark theme is not created by inverting the existing colours.

## Target folder structure

```text
src/theme/
  contract.ts             # TypeScript definitions for a complete theme
  themes.ts               # Registry and valid ThemeId values
  aqua-editorial.ts       # Theme configuration
  midnight-tech.ts        # Theme configuration
  warm-studio.ts          # Theme configuration
  cssVariables.ts         # Theme configuration → CSS custom properties
  createMuiTheme.ts       # Theme configuration → MUI createTheme()
  ThemeProvider.tsx       # Synchronizes CSS variables and MUI
  themePreference.ts      # Cookie validation and preference helpers
  index.ts                # Public exports only

src/components/ThemeSwitcher/
  index.tsx
  ThemeSwitcher.module.css

docs/theming/
  IMPLEMENTATION_PLAN.md
  TOKEN_REFERENCE.md      # Add when the final token names are approved
```

The exact file count may vary, but the responsibility boundaries should remain separate.

## Theme contract

Every theme must satisfy the same TypeScript contract. This makes missing states impossible to overlook.

```ts
export type ThemeId =
  | 'aqua-editorial'
  | 'midnight-tech'
  | 'warm-studio'
  | 'mono-professional'
  | 'aurora-glass';

export interface AppTheme {
  id: ThemeId;
  label: string;
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
    focusRing: string;
    success: string;
    warning: string;
    danger: string;
  };
  typography: {
    headingFamily: string;
    bodyFamily: string;
    bodySize: string;
    headingWeight: number;
    bodyLineHeight: number;
    headingTracking: string;
  };
  spacing: {
    density: number;
    sectionBlock: string;
    containerInline: string;
    cardPadding: string;
    controlBlock: string;
    controlInline: string;
  };
  shape: { cardRadius: string; controlRadius: string; pillRadius: string };
  elevation: { card: string; floating: string; modal: string };
  motion: { fast: string; normal: string; slow: string; easing: string };
}
```

Values may be refined as the components are migrated. Do not add a token only for one isolated value unless it represents a reusable design decision.

## Implementation flow

```text
Theme configuration (one TypeScript source of truth)
       ├── CSS variable map → global CSS and CSS Modules
       ├── MUI theme factory → Material UI components
       └── Theme metadata → picker and persistence

Server reads valid theme cookie
       ↓
<html data-theme="midnight-tech"> renders with matching variables
       ↓
Client ThemeProvider hydrates the matching MUI theme
       ↓
ThemeSwitcher updates UI immediately and writes the preference cookie
```

## Delivery phases

### Phase 1 — Design audit and baseline

1. Search `src` for colours, `rgba()`, typography declarations, spacing, radii, shadows, gradients, and inline `style` attributes.
2. Categorise each finding as a theme token, responsive layout rule, static brand value, or intentional exception.
3. Define semantic token names before migrating styles.
4. Capture screenshots of the current home, blog, news, videos, and admin routes to use as regression baselines.

**Done when:** the current Aqua visual language is documented without changing the product appearance.

### Phase 2 — Build the token foundation

1. Create `contract.ts` and the theme registry.
2. Model the existing appearance as `aqua-editorial.ts`.
3. Add `midnight-tech.ts` and `warm-studio.ts` with complete values.
4. Build `cssVariables.ts` so CSS custom properties are generated from the active theme definition.
5. Build `createMuiTheme.ts` so MUI palette, typography, shape, shadows, and component overrides use the same active definition.
6. Remove the separate manual token mirror from `globals.css` after CSS variables are generated.

**Done when:** the existing Aqua visual result is unchanged, and MUI/CSS values come from one source.

### Phase 3 — Migrate reusable UI

Migrate in this order, reviewing every change under every available theme:

1. Global page shell: `body`, background, text, container, section spacing.
2. Reusable global classes: buttons, cards, forms, pills, timeline, animations.
3. `TopUtilityBar` and `NavIsland`.
4. Hero and home-page sections.
5. Blog, news, videos, and admin routes.
6. One-off inline style objects.

Keep responsive breakpoints and page structure unchanged in this phase. Theme migration and layout redesign should be independent changes.

**Done when:** raw visual values have been removed except for approved static brand values.

### Phase 4 — Selection and persistence

1. Add an accessible `ThemeSwitcher` to `TopUtilityBar`.
2. Apply the selected theme immediately by updating `data-theme` and the variable map.
3. Persist only a validated `ThemeId` in a cookie.
4. In `src/app/layout.tsx`, read that cookie on the server and render the matching initial theme.
5. Pass the initial theme to the client provider so MUI and CSS start in agreement.
6. Add a reset-to-default option.

Use a cookie rather than local storage alone. The cookie allows the server to render the visitor's preference immediately and avoids a flash of the default theme on refresh.

**Done when:** theme choice survives refresh/navigation with no hydration mismatch or colour flash.

### Phase 5 — Accessibility and regression checks

For every theme, verify:

- WCAG AA contrast for normal text, large text, UI borders, and focus rings;
- default, hover, active, focus-visible, disabled, error, success, and loading states;
- keyboard operation of the picker;
- `prefers-reduced-motion` behaviour;
- mobile and desktop routes;
- server render, refresh, client navigation, and a no-JavaScript baseline;
- visual regression screenshots of the main pages.

Never communicate status using colour alone; status tokens should be paired with text and/or an icon.

### Phase 6 — Scale to five themes

1. Add `mono-professional` and `aurora-glass` by implementing the existing contract—without component changes.
2. Add a token-reference document with purpose, examples, and values per theme.
3. Add linting or a review rule that prevents new raw colours and spacing literals outside theme definitions.
4. Add visual snapshot testing to CI when the project needs stronger regression protection.

**Done when:** adding a theme is configuration work rather than a broad component rewrite.

## Rules for implementation

### Do

- Use semantic names such as `--color-text-primary` and `--space-card-padding`.
- Define hover, active, and focus colours intentionally for each theme.
- Preserve a minimum accessible control size across density settings.
- Load all selected font families with `next/font` and expose them through CSS variables.
- Keep external brand colours fixed unless a contrast issue requires a treatment wrapper.
- Keep the theme ID small, validated, and persisted—not entire style objects.

### Avoid

- Duplicating values separately in TypeScript and CSS.
- Using `!important` to force a theme appearance.
- Styling a component directly with raw hex values or fixed spacing when a semantic token applies.
- Treating dark mode as a simple colour inversion.
- Changing information hierarchy or responsive behaviour merely because a different theme is active.
- Creating unique token names for every individual component value too early.

## How mature design systems approach this

Material describes design tokens as values that are shared across design, code, tools, and platforms. Adobe Spectrum distinguishes a full theme (which may include typography, rounding, shadows, and colour) from a colour-only theme; its component dimensions generally remain stable. Shopify uses context-aware, token-driven component styling to preserve consistency across product surfaces.

Apply the same practical lesson here: the theme definition owns visual values, and components consume visual roles. This prevents five themes from becoming five separate stylesheets.

## Suggested first implementation milestone

Implement only these items first:

1. Establish `AppTheme` and `ThemeId` types.
2. Convert the existing design into `aqua-editorial` with no visual change.
3. Add a working `midnight-tech` configuration.
4. Make CSS variables and MUI use that same configuration.
5. Migrate the global classes, navigation, buttons, cards, and hero.

Once these succeed, add the picker and persistence. The remaining themes then become safe configuration additions rather than large refactors.

## Implementation status

The first milestone is implemented in this repository:

- `aqua-editorial`, `midnight-tech`, and `warm-studio` are available in `src/theme/themes.ts`.
- CSS custom properties and MUI are generated from the same active theme definition.
- The selected theme is available in the fixed top utility bar and persists in the `portfolio-theme` cookie.
- The root layout reads that cookie on the server, preventing a flash of the default theme on refresh.
- Shared global controls plus navigation, hero, awards, and news styling now consume theme tokens.

The next planned increment is to migrate the remaining route-level inline styles and then add the fourth and fifth configurations without changing component code.
