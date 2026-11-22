import { describe, expect, it } from 'vitest'
import { COLOR_WORDS } from '../game/colors'
import type { Stimulus } from '../game/types'
import {
  createTrialState,
  STIMULUS_TIMEOUT_MS,
  trialReduce,
} from './trialMachine'

const incongruent: Stimulus = {
  word: COLOR_WORDS.blue,
  inkColor: 'red',
  condition: 'incongruent',
  wordColor: 'blue',
}

function painted(state = createTrialState(incongruent, 300, true)) {
  let next = trialReduce(state, { type: 'FIXATION_END' })
  next = trialReduce(next, { type: 'STIMULUS_PAINTED', t: 1000 })
  return next
}

describe('trialReduce', () => {
  it('records a correct response RT from fixed times', () => {
    let state = painted()
    state = trialReduce(state, { type: 'RESPONSE', color: 'red', t: 1742 })

    expect(state.phase).toBe('feedback')
    expect(state.isCorrect).toBe(true)
    expect(state.timedOut).toBe(false)
    expect(state.responseTimeMs).toBe(742)
    expect(state.playerResponse).toBe('red')
    expect(state.responseDevice).toBe('pointer')

    state = trialReduce(state, { type: 'FEEDBACK_END' })
    expect(state.phase).toBe('done')
    expect(state.record).toMatchObject({
      responseTimeMs: 742,
      isCorrect: true,
      timedOut: false,
      stimulusOnsetMs: 1000,
      responseAtMs: 1742,
    })
  })

  it('records an incorrect response', () => {
    let state = painted()
    state = trialReduce(state, { type: 'RESPONSE', color: 'green', t: 1200 })

    expect(state.isCorrect).toBe(false)
    expect(state.playerResponse).toBe('green')
    expect(state.timedOut).toBe(false)
    expect(state.responseTimeMs).toBe(200)
  })

  it('marks omission on timeout', () => {
    let state = painted(createTrialState(incongruent, 300, false))
    state = trialReduce(state, {
      type: 'TIMEOUT',
      t: 1000 + STIMULUS_TIMEOUT_MS,
    })

    expect(state.phase).toBe('done')
    expect(state.timedOut).toBe(true)
    expect(state.isCorrect).toBe(false)
    expect(state.playerResponse).toBeNull()
    expect(state.responseTimeMs).toBeNull()
    expect(state.responseAtMs).toBeNull()
    expect(state.record?.timedOut).toBe(true)
  })

  it('accepts a response exactly at the deadline', () => {
    let state = painted()
    const atDeadline = 1000 + STIMULUS_TIMEOUT_MS
    state = trialReduce(state, { type: 'RESPONSE', color: 'red', t: atDeadline })

    expect(state.timedOut).toBe(false)
    expect(state.responseTimeMs).toBe(STIMULUS_TIMEOUT_MS)
    expect(state.isCorrect).toBe(true)
  })

  it('ignores a response during fixation', () => {
    const state = createTrialState(incongruent, 300, true)
    const next = trialReduce(state, { type: 'RESPONSE', color: 'red', t: 50 })

    expect(next).toEqual(state)
    expect(next.phase).toBe('fixation')
  })

  it('ignores a second response', () => {
    let state = painted()
    state = trialReduce(state, { type: 'RESPONSE', color: 'red', t: 1100 })
    const afterFirst = state
    state = trialReduce(state, { type: 'RESPONSE', color: 'green', t: 1150 })

    expect(state).toEqual(afterFirst)
    expect(state.playerResponse).toBe('red')
  })

  it('ignores timeout after a response already landed', () => {
    let state = painted()
    state = trialReduce(state, { type: 'RESPONSE', color: 'red', t: 1100 })
    const afterResponse = state
    state = trialReduce(state, { type: 'TIMEOUT', t: 1000 + STIMULUS_TIMEOUT_MS })

    expect(state).toEqual(afterResponse)
    expect(state.timedOut).toBe(false)
  })

  it('marks visibility_lost without ending the trial', () => {
    let state = painted()
    state = trialReduce(state, { type: 'VISIBILITY_LOST' })

    expect(state.visibilityLost).toBe(true)
    expect(state.phase).toBe('stimulus')
  })
})
