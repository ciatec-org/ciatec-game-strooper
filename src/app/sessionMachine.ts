import { BLOCKS } from '../game/blocks'
import type { BlockId } from '../game/types'

/**
 * Session screens. Transitions sit between blocks (SPEC-05 / architecture.md):
 * start → setup → instructions → block → (transition → block)* → result
 */
export type SessionScreen =
  | 'start'
  | 'setup'
  | 'instructions'
  | 'transition'
  | 'block'
  | 'result'

export type SessionEvent =
  | { type: 'BEGIN' }
  | { type: 'SET_PARTICIPANT_CODE'; code: string }
  | { type: 'SET_COLORBLIND_MODE'; enabled: boolean }
  | { type: 'START_SESSION' }
  | { type: 'CONTINUE_INSTRUCTIONS' }
  | { type: 'BLOCK_COMPLETE' }
  | { type: 'CONTINUE_TRANSITION' }

export interface SessionState {
  screen: SessionScreen
  participantCode: string
  colorblindMode: boolean
  /** Index into `BLOCKS` while on `block` or about to enter it from `transition`. */
  blockIndex: number
  /** True after a START_SESSION attempt with an empty code. */
  setupBlocked: boolean
}

export function createSessionState(): SessionState {
  return {
    screen: 'start',
    participantCode: '',
    colorblindMode: false,
    blockIndex: 0,
    setupBlocked: false,
  }
}

export function currentBlockId(state: SessionState): BlockId | null {
  if (state.screen !== 'block' && state.screen !== 'transition') {
    return null
  }
  const block = BLOCKS[state.blockIndex]
  return block?.id ?? null
}

/** Pure session reducer. Block order always comes from `BLOCKS` (DD-02). */
export function sessionReduce(
  state: SessionState,
  event: SessionEvent,
): SessionState {
  switch (event.type) {
    case 'BEGIN': {
      if (state.screen !== 'start') return state
      return { ...state, screen: 'setup', setupBlocked: false }
    }
    case 'SET_PARTICIPANT_CODE': {
      if (state.screen !== 'setup') return state
      return {
        ...state,
        participantCode: event.code,
        setupBlocked: false,
      }
    }
    case 'SET_COLORBLIND_MODE': {
      if (state.screen !== 'setup') return state
      // TODO(GDD-15.11): colorblind mode UI until the research team decides.
      return { ...state, colorblindMode: event.enabled }
    }
    case 'START_SESSION': {
      if (state.screen !== 'setup') return state
      const code = state.participantCode.trim()
      if (code.length === 0) {
        return { ...state, setupBlocked: true }
      }
      return {
        ...state,
        participantCode: code,
        setupBlocked: false,
        screen: 'instructions',
        blockIndex: 0,
      }
    }
    case 'CONTINUE_INSTRUCTIONS': {
      if (state.screen !== 'instructions') return state
      return { ...state, screen: 'block', blockIndex: 0 }
    }
    case 'BLOCK_COMPLETE': {
      if (state.screen !== 'block') return state
      const nextIndex = state.blockIndex + 1
      if (nextIndex >= BLOCKS.length) {
        return { ...state, screen: 'result' }
      }
      return {
        ...state,
        screen: 'transition',
        blockIndex: nextIndex,
      }
    }
    case 'CONTINUE_TRANSITION': {
      if (state.screen !== 'transition') return state
      return { ...state, screen: 'block' }
    }
    default:
      return state
  }
}
