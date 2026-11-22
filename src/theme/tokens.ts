// Dark theme (SPEC-00 / B-02, orientador 22/11/2026). Menu chrome borrows
// CIATEC brand accents; stimulus inks stay separate (RNF04 / WCAG). See
// docs/design/visual-identity.md.
export const tokens = {
  color: {
    ink: {
      red: '#FF6B61',
      green: '#2FD160',
      blue: '#6E9BFF',
      yellow: '#FFD43B',
    },
    /** Block and app background — cool dark, not pure black. */
    bg: '#121820',
    /** Response buttons and menu panels. */
    surface: '#1E2A36',
    /** Slightly raised menu controls (CTA idle). */
    surfaceRaised: '#2A3A4A',
    border: '#5A6B7C',
    text: '#F0F4F8',
    textMuted: '#9AABBA',
    /** Menu CTA / links only — never used as stimulus ink. */
    brand: {
      primary: '#40B4E5',
      accent: '#C9A227',
    },
  },
  font: {
    family: "system-ui, 'Segoe UI', Roboto, sans-serif",
    stimulus: { size: '80px', weight: '700' },
    buttonLabel: { size: '22px', weight: '600' },
    menu: { size: '18px', weight: '400' },
    title: { size: '40px', weight: '800' },
    eyebrow: { size: '12px', weight: '600' },
  },
  layout: {
    // TODO(GDD-15.15): minimum target size until the audience is defined.
    buttonMinHeight: '56px',
    buttonGap: '16px',
    menuGap: '16px',
    radius: '12px',
    /** Response buttons: 2×2 grid; order comes from game/colors.ts (RNF02). */
    buttonArrangement: 'grid-2x2',
  },
  timing: {
    /** Hit and error feedback on the chosen button (DD-09). */
    feedbackMs: 300,
    /** Omission hint "Mais rápido" (DD-09). */
    omissionFeedbackMs: 500,
    /** Visual press feedback; response is still taken on pointerdown. */
    buttonPressMs: 80,
  },
  feedback: {
    hitOutlineWidth: '3px',
    errorOutlineStyle: 'dashed',
    omissionHint: 'Mais rápido',
  },
} as const

export const cssVariables: Readonly<Record<string, string>> = {
  '--color-ink-red': tokens.color.ink.red,
  '--color-ink-green': tokens.color.ink.green,
  '--color-ink-blue': tokens.color.ink.blue,
  '--color-ink-yellow': tokens.color.ink.yellow,
  '--color-bg': tokens.color.bg,
  '--color-surface': tokens.color.surface,
  '--color-surface-raised': tokens.color.surfaceRaised,
  '--color-border': tokens.color.border,
  '--color-text': tokens.color.text,
  '--color-text-muted': tokens.color.textMuted,
  '--color-brand-primary': tokens.color.brand.primary,
  '--color-brand-accent': tokens.color.brand.accent,
  '--font-family': tokens.font.family,
  '--font-stimulus-size': tokens.font.stimulus.size,
  '--font-stimulus-weight': tokens.font.stimulus.weight,
  '--font-button-label-size': tokens.font.buttonLabel.size,
  '--font-button-label-weight': tokens.font.buttonLabel.weight,
  '--font-menu-size': tokens.font.menu.size,
  '--font-menu-weight': tokens.font.menu.weight,
  '--font-title-size': tokens.font.title.size,
  '--font-title-weight': tokens.font.title.weight,
  '--font-eyebrow-size': tokens.font.eyebrow.size,
  '--font-eyebrow-weight': tokens.font.eyebrow.weight,
  '--layout-button-min-height': tokens.layout.buttonMinHeight,
  '--layout-button-gap': tokens.layout.buttonGap,
  '--layout-menu-gap': tokens.layout.menuGap,
  '--layout-radius': tokens.layout.radius,
  '--timing-feedback-ms': String(tokens.timing.feedbackMs),
  '--timing-omission-feedback-ms': String(tokens.timing.omissionFeedbackMs),
  '--timing-button-press-ms': String(tokens.timing.buttonPressMs),
  '--feedback-hit-outline-width': tokens.feedback.hitOutlineWidth,
}
