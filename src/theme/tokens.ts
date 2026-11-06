// TODO(SPEC-00): every value below is the starting proposal of
// docs/design/visual-identity.md until the team decides it.
export const tokens = {
  color: {
    ink: {
      red: '#FF6B61',
      green: '#2FD160',
      blue: '#6E9BFF',
      yellow: '#FFD43B',
    },
    bg: '#1E1E1E',
    surface: '#3A3A3A',
    border: '#8A8A8A',
    text: '#F2F2F2',
  },
  font: {
    family: "system-ui, 'Segoe UI', Roboto, sans-serif",
    stimulus: { size: '80px', weight: '700' },
    buttonLabel: { size: '22px', weight: '600' },
    menu: { size: '18px' },
  },
  layout: {
    // TODO(GDD-15.15): minimum target size until the audience is defined.
    buttonMinHeight: '56px',
    buttonGap: '16px',
    menuGap: '16px',
  },
} as const

export const cssVariables: Readonly<Record<string, string>> = {
  '--color-ink-red': tokens.color.ink.red,
  '--color-ink-green': tokens.color.ink.green,
  '--color-ink-blue': tokens.color.ink.blue,
  '--color-ink-yellow': tokens.color.ink.yellow,
  '--color-bg': tokens.color.bg,
  '--color-surface': tokens.color.surface,
  '--color-border': tokens.color.border,
  '--color-text': tokens.color.text,
  '--font-family': tokens.font.family,
  '--font-stimulus-size': tokens.font.stimulus.size,
  '--font-stimulus-weight': tokens.font.stimulus.weight,
  '--font-button-label-size': tokens.font.buttonLabel.size,
  '--font-button-label-weight': tokens.font.buttonLabel.weight,
  '--font-menu-size': tokens.font.menu.size,
  '--layout-button-min-height': tokens.layout.buttonMinHeight,
  '--layout-button-gap': tokens.layout.buttonGap,
  '--layout-menu-gap': tokens.layout.menuGap,
}
