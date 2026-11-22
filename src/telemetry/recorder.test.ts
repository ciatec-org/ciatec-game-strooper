import { describe, expect, it } from 'vitest'
import { COLOR_WORDS } from '../game/colors'
import type { TrialRecord } from '../game/types'
import { createRecorder } from './recorder'

const sample: TrialRecord = {
  stimulus: {
    word: COLOR_WORDS.red,
    inkColor: 'red',
    condition: 'congruent',
    wordColor: 'red',
  },
  isiMs: 250,
  stimulusOnsetMs: 10,
  responseAtMs: 510,
  responseTimeMs: 500,
  playerResponse: 'red',
  isCorrect: true,
  timedOut: false,
  responseDevice: 'pointer',
  visibilityLost: false,
}

describe('createRecorder', () => {
  it('numbers trials across the session and within each block', () => {
    const recorder = createRecorder({
      sessionId: 's',
      playerId: 'P-1',
      timestamp: '2026-11-22T00:00:00Z',
      appVersion: '0.0.0',
      frameIntervalMs: 16.7,
      colorblindMode: false,
      rngSeed: 1,
    })

    const a = recorder.recordTrial('practice', sample)
    const b = recorder.recordTrial('practice', sample)
    const c = recorder.recordTrial('baseline', sample)

    expect(a.trialIndex).toBe(1)
    expect(a.indexInBlock).toBe(1)
    expect(b.trialIndex).toBe(2)
    expect(b.indexInBlock).toBe(2)
    expect(c.trialIndex).toBe(3)
    expect(c.indexInBlock).toBe(1)
    expect(recorder.getTrials()).toHaveLength(3)
  })
})
