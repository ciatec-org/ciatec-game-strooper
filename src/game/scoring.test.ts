import { describe, expect, it } from 'vitest'
import { COLOR_WORDS } from './colors'
import { computeSessionSummary, type ScoredTrial } from './scoring'
import type { Stimulus } from './types'

// Base item B-04: answer key for session scoring (telemetry.md). Values below
// were checked by hand. Practice, errors, omissions, and visibility_lost stay
// out of RT means. If a test fails, fix scoring.ts; if the expected value looks
// wrong, stop and tell the advisor.

function stimulus(
  condition: Stimulus['condition'],
  ink: Stimulus['inkColor'] = 'red',
): Stimulus {
  if (condition === 'neutral') {
    return {
      word: 'XXXX',
      inkColor: ink,
      condition,
      wordColor: null,
    }
  }
  if (condition === 'congruent') {
    return {
      word: COLOR_WORDS[ink],
      inkColor: ink,
      condition,
      wordColor: ink,
    }
  }
  const wordColor = ink === 'red' ? 'blue' : 'red'
  return {
    word: COLOR_WORDS[wordColor],
    inkColor: ink,
    condition,
    wordColor,
  }
}

function trial(
  partial: {
    block: ScoredTrial['block']
    stimulus?: Stimulus
    responseAtMs: number | null
    responseTimeMs: number | null
    playerResponse: ScoredTrial['playerResponse']
    isCorrect: boolean
    timedOut: boolean
    visibilityLost: boolean
    responseDevice?: ScoredTrial['responseDevice']
  },
): ScoredTrial {
  return {
    stimulus: partial.stimulus ?? stimulus('congruent'),
    isiMs: 300,
    stimulusOnsetMs: 1000,
    responseAtMs: partial.responseAtMs,
    responseTimeMs: partial.responseTimeMs,
    playerResponse: partial.playerResponse,
    isCorrect: partial.isCorrect,
    timedOut: partial.timedOut,
    responseDevice: partial.responseDevice ?? 'pointer',
    visibilityLost: partial.visibilityLost,
    block: partial.block,
  }
}

describe('computeSessionSummary', () => {
  it('excludes practice from totals and means', () => {
    const trials: ScoredTrial[] = [
      trial({
        block: 'practice',
        stimulus: stimulus('congruent'),
        responseAtMs: 1500,
        responseTimeMs: 100,
        playerResponse: 'red',
        isCorrect: true,
        timedOut: false,
        visibilityLost: false,
      }),
      trial({
        block: 'baseline',
        stimulus: stimulus('congruent'),
        responseAtMs: 1600,
        responseTimeMs: 500,
        playerResponse: 'red',
        isCorrect: true,
        timedOut: false,
        visibilityLost: false,
      }),
    ]

    const { overall, byBlock } = computeSessionSummary(trials)
    expect(overall.totalTrials).toBe(1)
    expect(overall.meanRtCongruentMs).toBe(500)
    expect(byBlock.practice).toBeUndefined()
  })

  it('excludes omissions, errors, and visibility_lost from RT means', () => {
    const trials: ScoredTrial[] = [
      trial({
        block: 'stroop',
        stimulus: stimulus('incongruent'),
        responseAtMs: 1700,
        responseTimeMs: 800,
        playerResponse: 'red',
        isCorrect: true,
        timedOut: false,
        visibilityLost: false,
      }),
      trial({
        block: 'stroop',
        stimulus: stimulus('incongruent'),
        responseAtMs: null,
        responseTimeMs: null,
        playerResponse: null,
        isCorrect: false,
        timedOut: true,
        visibilityLost: false,
      }),
      trial({
        block: 'stroop',
        stimulus: stimulus('incongruent'),
        responseAtMs: 1800,
        responseTimeMs: 200,
        playerResponse: 'blue',
        isCorrect: false,
        timedOut: false,
        visibilityLost: false,
      }),
      trial({
        block: 'stroop',
        stimulus: stimulus('incongruent'),
        responseAtMs: 1900,
        responseTimeMs: 900,
        playerResponse: 'red',
        isCorrect: true,
        timedOut: false,
        visibilityLost: true,
      }),
    ]

    const { overall } = computeSessionSummary(trials)
    expect(overall.totalTrials).toBe(4)
    expect(overall.totalCorrect).toBe(2)
    expect(overall.totalErrors).toBe(1)
    expect(overall.totalOmissions).toBe(1)
    // Only the first incongruent correct without visibility_lost.
    expect(overall.meanRtIncongruentMs).toBe(800)
  })

  it('computes SIE on Stroop and null neutral contrasts without neutrals', () => {
    const trials: ScoredTrial[] = [
      trial({
        block: 'stroop',
        stimulus: stimulus('congruent'),
        responseAtMs: 1500,
        responseTimeMs: 600,
        playerResponse: 'red',
        isCorrect: true,
        timedOut: false,
        visibilityLost: false,
      }),
      trial({
        block: 'stroop',
        stimulus: stimulus('congruent'),
        responseAtMs: 1600,
        responseTimeMs: 640,
        playerResponse: 'red',
        isCorrect: true,
        timedOut: false,
        visibilityLost: false,
      }),
      trial({
        block: 'stroop',
        stimulus: stimulus('incongruent'),
        responseAtMs: 1700,
        responseTimeMs: 780,
        playerResponse: 'red',
        isCorrect: true,
        timedOut: false,
        visibilityLost: false,
      }),
      trial({
        block: 'stroop',
        stimulus: stimulus('incongruent'),
        responseAtMs: 1800,
        responseTimeMs: 820,
        playerResponse: 'red',
        isCorrect: true,
        timedOut: false,
        visibilityLost: false,
      }),
    ]

    // congruent mean = (600+640)/2 = 620
    // incongruent mean = (780+820)/2 = 800
    // SIE = 180
    const { overall, byBlock } = computeSessionSummary(trials)
    expect(overall.meanRtCongruentMs).toBe(620)
    expect(overall.meanRtIncongruentMs).toBe(800)
    expect(overall.stroopInterferenceEffectMs).toBe(180)
    expect(overall.interferenceVsNeutralMs).toBeNull()
    expect(overall.facilitationVsNeutralMs).toBeNull()
    expect(byBlock.stroop?.stroopInterferenceEffectMs).toBe(180)
  })

  it('computes neutral contrasts on baseline', () => {
    const trials: ScoredTrial[] = [
      trial({
        block: 'baseline',
        stimulus: stimulus('congruent'),
        responseAtMs: 1500,
        responseTimeMs: 500,
        playerResponse: 'red',
        isCorrect: true,
        timedOut: false,
        visibilityLost: false,
      }),
      trial({
        block: 'baseline',
        stimulus: stimulus('neutral'),
        responseAtMs: 1600,
        responseTimeMs: 560,
        playerResponse: 'red',
        isCorrect: true,
        timedOut: false,
        visibilityLost: false,
      }),
    ]

    const { byBlock, overall } = computeSessionSummary(trials)
    expect(byBlock.baseline?.meanRtCongruentMs).toBe(500)
    expect(byBlock.baseline?.meanRtNeutralMs).toBe(560)
    expect(byBlock.baseline?.facilitationVsNeutralMs).toBe(60)
    // Overall SIE fields come from Stroop only — none here.
    expect(overall.stroopInterferenceEffectMs).toBeNull()
  })
})
