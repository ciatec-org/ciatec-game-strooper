import { describe, expect, it } from 'vitest'
import { COLOR_WORDS } from '../game/colors'
import type { TrialRecord } from '../game/types'
import { createRecorder } from './recorder'
import { buildSessionJson } from './exportSession'

const congruent: TrialRecord = {
  stimulus: {
    word: COLOR_WORDS.red,
    inkColor: 'red',
    condition: 'congruent',
    wordColor: 'red',
  },
  isiMs: 300,
  stimulusOnsetMs: 1000,
  responseAtMs: 1500,
  responseTimeMs: 500,
  playerResponse: 'red',
  isCorrect: true,
  timedOut: false,
  responseDevice: 'pointer',
  visibilityLost: false,
}

describe('buildSessionJson', () => {
  it('matches the telemetry.md field names (snapshot)', () => {
    const recorder = createRecorder({
      sessionId: '11111111-2222-4333-8444-555555555555',
      playerId: 'P-014',
      timestamp: '2026-10-21T18:45:00Z',
      appVersion: '0.0.0',
      frameIntervalMs: 16.7,
      colorblindMode: false,
      rngSeed: 123456789,
    })
    recorder.recordTrial('baseline', congruent)

    const json = buildSessionJson(recorder)
    expect(json).toMatchSnapshot()
  })

  it('keeps block_type equal to condition for source compatibility', () => {
    const recorder = createRecorder({
      sessionId: 'aaaaaaaa-bbbb-4ccc-8ddd-eeeeeeeeeeee',
      playerId: 'P-1',
      timestamp: '2026-11-22T12:00:00Z',
      appVersion: '0.0.0',
      frameIntervalMs: 16.7,
      colorblindMode: false,
      rngSeed: 1,
    })
    recorder.recordTrial('stroop', {
      ...congruent,
      stimulus: {
        word: COLOR_WORDS.blue,
        inkColor: 'red',
        condition: 'incongruent',
        wordColor: 'blue',
      },
      isCorrect: true,
      playerResponse: 'red',
      responseTimeMs: 742.3,
      responseAtMs: 1742.3,
    })

    const trial = buildSessionJson(recorder).trials[0]!
    expect(trial.block_type).toBe('incongruent')
    expect(trial.condition).toBe('incongruent')
    expect(trial.block).toBe('stroop')
  })
})
