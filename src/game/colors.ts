import type { ColorId } from './types'

// The response buttons follow this order and must never change it during a session (RNF02).
export const COLOR_ORDER: readonly ColorId[] = ['red', 'green', 'blue', 'yellow']

export const COLOR_WORDS: Readonly<Record<ColorId, string>> = {
  red: 'VERMELHO',
  green: 'VERDE',
  blue: 'AZUL',
  yellow: 'AMARELO',
}
