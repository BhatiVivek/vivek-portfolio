# Theme change flow

This document shows where a theme starts and how a visitor’s selection changes the portfolio.

## Animated selection (home portrait)

The picker now calls `requestThemeChange()` in `providers.tsx`. It holds the
selection in `pendingThemeId` and prevents overlapping requests. `ThemePortrait`
registers the home-page animation with the provider:

1. Keep the existing theme active and spin the portrait clockwise for 1.6 seconds,
   shrinking to 55% as it accelerates, then growing back to full size and stopping
   upright after six turns. Scaling does not change the surrounding page layout.
2. Burst 40 decorative sparkles with varied sizes and travel distances in the incoming theme's colors for about 310ms. Adjust `SPARKLE_COUNT`, `SPIN_DURATION_MS`, and `SPARKLE_DURATION_MS` in `ThemePortrait/index.tsx` to tune the effect.
3. Call the existing `setThemeId()` to update React/MUI, CSS variables, and the cookie.
4. Clear the pending selection and leave the portrait stable (floating stops).

The full sequence takes about 1.9 seconds, with no added delay before applying the theme.

Animation completion drives the sequence. Selecting the current theme does nothing.
If the portrait is absent or outside the viewport, or reduced motion is enabled,
the theme applies immediately. Navigation, hidden tabs, animation failure, and a
4-second safety timeout cancel the effect and finish the pending theme change.
The server-rendered initial theme does not animate.

The diagram below describes the underlying theme application and persistence flow;
the animated selection above now happens before its client application step.

```text
1. Theme source of truth
   src/theme/themes.ts
   └─ aqua-editorial | midnight-tech | warm-studio
      Each entry contains colours, typography, spacing, shape,
      elevation, and motion values.
                │
                ├──────────────────────────────────────────────┐
                │                                              │
2A. First request / page refresh                    2B. Visitor chooses a theme
    src/app/layout.tsx                                  ThemeSwitcher
    └─ Read the portfolio-theme cookie                  └─ src/components/ThemeSwitcher
       └─ Validate ThemeId                                  └─ Click theme option
          └─ getTheme(themeId)                                 └─ setThemeId(themeId)
                │                                              │
                │                                              ▼
                │                                      3. Client applies theme
                │                                         src/app/providers.tsx
                │                                         ├─ React state updates
                │                                         ├─ applyThemeVariables(theme)
                │                                         └─ Save portfolio-theme cookie
                │                                              │
                ▼                                              ▼
4. Server supplies the initial theme                 5. CSS Modules update instantly
   src/app/layout.tsx                                 src/theme/cssVariables.ts
   ├─ <html data-theme="...">                           └─ Write --bg-surface,
   ├─ Inline CSS variables                                   --accent-glow, --radius-md,
   └─ Providers initialThemeId                                --font-body, etc. on <html>
                │                                              │
                └───────────────────┬──────────────────────────┘
                                    ▼
6. Two styling systems consume the same active theme
   ├─ CSS Modules and globals.css
   │  └─ Use CSS variables such as var(--bg-surface)
   │
   └─ MUI components
      └─ src/theme/createMuiTheme.ts
         └─ createMuiTheme(theme) creates palette, typography,
            shape, semantic states, and MUI baseline overrides.
                                    │
                                    ▼
7. Visitor sees the updated portfolio
   ├─ Top utility bar and theme picker
   ├─ Global buttons, cards, form controls, and sections
   ├─ Hero, navigation, awards, and news styles
   └─ MUI-based interface elements
                                    │
                                    ▼
8. Next visit
   The saved portfolio-theme cookie begins the same flow at step 2A,
   so the matching theme is server-rendered without a flash of Aqua.
```

## File responsibilities

| File | Responsibility |
| --- | --- |
| `src/theme/contract.ts` | Defines exactly what every theme must provide. |
| `src/theme/themes.ts` | The single configuration source for the available themes. Start here to edit or add a theme. |
| `src/theme/cssVariables.ts` | Converts the active configuration into CSS custom properties and applies them to `<html>`. |
| `src/theme/createMuiTheme.ts` | Converts that same configuration into an MUI theme. |
| `src/theme/overrides.ts` | Applies shared MUI baseline styling from the active configuration. |
| `src/app/layout.tsx` | Reads the saved cookie and server-renders the initial theme. |
| `src/app/providers.tsx` | Holds client state, updates MUI, applies CSS variables, and saves the cookie. |
| `src/components/ThemeSwitcher/` | Lets visitors choose a theme from the top utility bar. |

## Where to make a change

```text
Change one theme’s colour, font, spacing, radius, shadow, or motion?
  → Edit that theme in src/theme/themes.ts

Add a new required visual category to every theme?
  → Add it to src/theme/contract.ts
  → Fill it in for every theme in src/theme/themes.ts
  → Map it in cssVariables.ts and/or createMuiTheme.ts

Make a component react to theme changes?
  → Replace its raw style value with an existing CSS variable,
    for example var(--accent-glow) or var(--space-card-padding).

Change how visitors select a theme?
  → Edit src/components/ThemeSwitcher/.

Change cookie naming or persistence behaviour?
  → Edit src/app/providers.tsx and src/app/layout.tsx together.
```
