import { describe, expect, it } from 'vitest'
import { BLOCKS } from '../game/blocks'
import {
  createSessionState,
  currentBlockId,
  sessionReduce,
} from './sessionMachine'

function playTo(
  events: Parameters<typeof sessionReduce>[1][],
  start = createSessionState(),
) {
  return events.reduce(sessionReduce, start)
}

describe('sessionReduce', () => {
  it('runs the full screen sequence in BLOCKS order', () => {
    let state = createSessionState()
    expect(state.screen).toBe('start')

    state = sessionReduce(state, { type: 'BEGIN' })
    expect(state.screen).toBe('setup')

    state = sessionReduce(state, {
      type: 'SET_PARTICIPANT_CODE',
      code: 'P-014',
    })
    state = sessionReduce(state, { type: 'START_SESSION' })
    expect(state.screen).toBe('instructions')

    state = sessionReduce(state, { type: 'CONTINUE_INSTRUCTIONS' })
    expect(state.screen).toBe('block')
    expect(currentBlockId(state)).toBe(BLOCKS[0]!.id)

    for (let i = 1; i < BLOCKS.length; i += 1) {
      state = sessionReduce(state, { type: 'BLOCK_COMPLETE' })
      expect(state.screen).toBe('transition')
      expect(currentBlockId(state)).toBe(BLOCKS[i]!.id)

      state = sessionReduce(state, { type: 'CONTINUE_TRANSITION' })
      expect(state.screen).toBe('block')
      expect(currentBlockId(state)).toBe(BLOCKS[i]!.id)
    }

    state = sessionReduce(state, { type: 'BLOCK_COMPLETE' })
    expect(state.screen).toBe('result')
  })

  it('blocks START_SESSION without a participant code', () => {
    const state = playTo([
      { type: 'BEGIN' },
      { type: 'START_SESSION' },
    ])

    expect(state.screen).toBe('setup')
    expect(state.setupBlocked).toBe(true)
  })

  it('blocks START_SESSION when the code is only whitespace', () => {
    const state = playTo([
      { type: 'BEGIN' },
      { type: 'SET_PARTICIPANT_CODE', code: '   ' },
      { type: 'START_SESSION' },
    ])

    expect(state.screen).toBe('setup')
    expect(state.setupBlocked).toBe(true)
  })

  it('trims the participant code on a successful start', () => {
    const state = playTo([
      { type: 'BEGIN' },
      { type: 'SET_PARTICIPANT_CODE', code: '  P-014  ' },
      { type: 'START_SESSION' },
    ])

    expect(state.screen).toBe('instructions')
    expect(state.participantCode).toBe('P-014')
    expect(state.setupBlocked).toBe(false)
  })

  it('follows BLOCKS order when the array order is the session order', () => {
    const ids = BLOCKS.map((block) => block.id)
    expect(ids).toEqual(['practice', 'baseline', 'stroop'])

    let state = playTo([
      { type: 'BEGIN' },
      { type: 'SET_PARTICIPANT_CODE', code: 'P-1' },
      { type: 'START_SESSION' },
      { type: 'CONTINUE_INSTRUCTIONS' },
    ])
    expect(currentBlockId(state)).toBe('practice')

    state = sessionReduce(state, { type: 'BLOCK_COMPLETE' })
    state = sessionReduce(state, { type: 'CONTINUE_TRANSITION' })
    expect(currentBlockId(state)).toBe('baseline')

    state = sessionReduce(state, { type: 'BLOCK_COMPLETE' })
    state = sessionReduce(state, { type: 'CONTINUE_TRANSITION' })
    expect(currentBlockId(state)).toBe('stroop')
  })
})
