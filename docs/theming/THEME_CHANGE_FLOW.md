# Theme change flow

This document shows where a theme starts and how a visitor’s selection changes the portfolio.

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
