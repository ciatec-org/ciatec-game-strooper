import { describe, expect, it } from 'vitest'
import { createRng } from './rng'

// Base item B-01: `createRng` (mulberry32). The shuffle invariants live in
// `generator.test.ts` and wait on T-02.1.2 (`buildTrials`).

describe('createRng', () => {
  it('returns values in [0, 1)', () => {
    const rng = createRng(42)
    for (let i = 0; i < 100; i += 1) {
      const value = rng()
      expect(value).toBeGreaterThanOrEqual(0)
      expect(value).toBeLessThan(1)
    }
  })

  it('same seed yields the same sequence', () => {
    const a = createRng(7)
    const b = createRng(7)
    const seqA = Array.from({ length: 20 }, () => a())
    const seqB = Array.from({ length: 20 }, () => b())
    expect(seqA).toEqual(seqB)
  })

  it('different seeds diverge', () => {
    const a = createRng(1)
    const b = createRng(2)
    const seqA = Array.from({ length: 10 }, () => a())
    const seqB = Array.from({ length: 10 }, () => b())
    expect(seqA).not.toEqual(seqB)
  })
})
