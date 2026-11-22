import { describe, expect, it } from 'vitest'
import { BLOCKS } from './blocks'
import { COLOR_ORDER, COLOR_WORDS } from './colors'
import { buildTrials } from './generator'
import { createRng } from './rng'
import type { Condition, Stimulus } from './types'

// Base item B-01: the answer key for T-02.1.2 (`buildTrials`), written before
// `generator.ts` exists, so `npm test` reports the missing module until that task
// lands. The task must export `buildTrials` by name (not with `export default`).
// If a test fails, fix `buildTrials`; if a test itself looks wrong, stop and tell
// the advisor. Uses `createRng` from `rng.ts` (also B-01) — never `Math.random`.

const SEED_COUNT = 1000

const COLOR_WORD_SET = new Set(Object.values(COLOR_WORDS))

function countByCondition(trials: Stimulus[]): Record<Condition, number> {
  const counts: Record<Condition, number> = {
    congruent: 0,
    incongruent: 0,
    neutral: 0,
  }
  for (const trial of trials) {
    counts[trial.condition] += 1
  }
  return counts
}

function inkCountsForCondition(
  trials: Stimulus[],
  condition: Condition,
): number[] {
  const counts = Object.fromEntries(COLOR_ORDER.map((c) => [c, 0])) as Record<
    (typeof COLOR_ORDER)[number],
    number
  >
  for (const trial of trials) {
    if (trial.condition === condition) {
      counts[trial.inkColor] += 1
    }
  }
  return COLOR_ORDER.map((c) => counts[c])
}

function hasIdenticalConsecutivePair(trials: Stimulus[]): boolean {
  for (let i = 1; i < trials.length; i += 1) {
    const prev = trials[i - 1]!
    const curr = trials[i]!
    if (prev.word === curr.word && prev.inkColor === curr.inkColor) {
      return true
    }
  }
  return false
}

describe('buildTrials', () => {
  it.each(BLOCKS)(
    '$id returns exact condition counts from the block config',
    (block) => {
      const trials = buildTrials(block, createRng(1))
      expect(countByCondition(trials)).toEqual({ ...block.counts })
      expect(trials).toHaveLength(
        block.counts.congruent +
          block.counts.incongruent +
          block.counts.neutral,
      )
    },
  )

  it('same seed yields the same list for every block', () => {
    for (const block of BLOCKS) {
      const a = buildTrials(block, createRng(12345))
      const b = buildTrials(block, createRng(12345))
      expect(a).toEqual(b)
    }
  })

  it(`across ${SEED_COUNT} seeds, never repeats the same word+ink pair in a row`, () => {
    for (let seed = 0; seed < SEED_COUNT; seed += 1) {
      for (const block of BLOCKS) {
        const trials = buildTrials(block, createRng(seed))
        expect(hasIdenticalConsecutivePair(trials)).toBe(false)
      }
    }
  })

  it(`across ${SEED_COUNT} seeds, congruent words match ink and incongruent words do not`, () => {
    for (let seed = 0; seed < SEED_COUNT; seed += 1) {
      for (const block of BLOCKS) {
        const trials = buildTrials(block, createRng(seed))
        for (const trial of trials) {
          if (trial.condition === 'congruent') {
            expect(trial.word).toBe(COLOR_WORDS[trial.inkColor])
            expect(trial.wordColor).toBe(trial.inkColor)
          }
          if (trial.condition === 'incongruent') {
            expect(COLOR_WORD_SET.has(trial.word)).toBe(true)
            expect(trial.word).not.toBe(COLOR_WORDS[trial.inkColor])
            expect(trial.wordColor).not.toBeNull()
            expect(trial.wordColor).not.toBe(trial.inkColor)
          }
          if (trial.condition === 'neutral') {
            // TODO(GDD-15.5): provisional neutral is XXXX until the research team decides.
            expect(COLOR_WORD_SET.has(trial.word)).toBe(false)
            expect(trial.wordColor).toBeNull()
          }
        }
      }
    }
  })

  it(`across ${SEED_COUNT} seeds, ink colors are balanced per condition (±1)`, () => {
    for (let seed = 0; seed < SEED_COUNT; seed += 1) {
      for (const block of BLOCKS) {
        const trials = buildTrials(block, createRng(seed))
        for (const condition of ['congruent', 'incongruent', 'neutral'] as const) {
          const n = block.counts[condition]
          if (n === 0) continue
          const inks = inkCountsForCondition(trials, condition)
          const total = inks.reduce((sum, c) => sum + c, 0)
          expect(total).toBe(n)
          expect(Math.max(...inks) - Math.min(...inks)).toBeLessThanOrEqual(1)
        }
      }
    }
  })
})
