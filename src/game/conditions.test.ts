import { describe, expect, it } from 'vitest'
import { getCondition } from './conditions'

// Base item B-05: the answer key for T-01.1.4, written before `conditions.ts` exists, so
// `npm test`, `npm run typecheck` and `npm run build` report the missing module until that
// task lands. The task must export `getCondition` by name (not with `export default`).
// If a test fails, fix `getCondition`; if a test itself looks wrong, stop and tell the advisor.

// Spelled out here instead of imported from `colors.ts`: `getCondition` must read that
// table, so a typo in it fails these tests rather than being copied into the expected values.
const COLOR_WORDS = [
  ['red', 'VERMELHO'],
  ['green', 'VERDE'],
  ['blue', 'AZUL'],
  ['yellow', 'AMARELO'],
] as const

const INK_COLORS = COLOR_WORDS.map(([inkColor]) => inkColor)

const MATCHING_PAIRS = COLOR_WORDS.map(([inkColor, word]) => ({ word, inkColor }))

const MISMATCHING_PAIRS = COLOR_WORDS.flatMap(([wordColor, word]) =>
  INK_COLORS.filter((inkColor) => inkColor !== wordColor).map((inkColor) => ({
    word,
    inkColor,
  })),
)

// TODO(GDD-15.5): the neutral stimulus is still open (XXXX or common words), so any word
// that is not a color name must be neutral, and not only XXXX. AZULEJO guards against
// matching a color name inside a longer word.
const NEUTRAL_PAIRS = ['XXXX', 'CASA', 'AZULEJO'].flatMap((word) =>
  INK_COLORS.map((inkColor) => ({ word, inkColor })),
)

describe('getCondition', () => {
  // Requiring 'congruent' here also proves that a stimulus whose word names its ink
  // is never incongruent, the invariant B-05 asks for.
  it.each(MATCHING_PAIRS)(
    '$word in $inkColor ink is congruent',
    ({ word, inkColor }) => {
      expect(getCondition(word, inkColor)).toBe('congruent')
    },
  )

  it.each(MISMATCHING_PAIRS)(
    '$word in $inkColor ink is incongruent',
    ({ word, inkColor }) => {
      expect(getCondition(word, inkColor)).toBe('incongruent')
    },
  )

  it.each(NEUTRAL_PAIRS)(
    '$word in $inkColor ink is neutral',
    ({ word, inkColor }) => {
      expect(getCondition(word, inkColor)).toBe('neutral')
    },
  )
})
