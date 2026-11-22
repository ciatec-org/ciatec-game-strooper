import type {
  ColorId,
  ResponseDevice,
  Stimulus,
  TrialRecord,
} from '../game/types'

/** RF04 — max time from painted onset to a valid response. */
export const STIMULUS_TIMEOUT_MS = 1500

/** RF05 — fixation ISI bounds (inclusive), drawn per trial. */
export const ISI_MIN_MS = 200
export const ISI_MAX_MS = 500

export type TrialPhase = 'fixation' | 'stimulus' | 'feedback' | 'done'

export type TrialEvent =
  | { type: 'FIXATION_END' }
  | { type: 'STIMULUS_PAINTED'; t: number }
  | {
      type: 'RESPONSE'
      color: ColorId
      t: number
      device?: ResponseDevice
      /** When the painted onset is known to the hook before React state catches up. */
      onsetMs?: number
    }
  | { type: 'TIMEOUT'; t: number }
  | { type: 'FEEDBACK_END' }
  | { type: 'VISIBILITY_LOST' }

export interface TrialState {
  phase: TrialPhase
  stimulus: Stimulus
  isiMs: number
  feedback: boolean
  onsetMs: number | null
  playerResponse: ColorId | null
  responseAtMs: number | null
  responseTimeMs: number | null
  isCorrect: boolean
  timedOut: boolean
  visibilityLost: boolean
  responseDevice: ResponseDevice
  /** Set when phase becomes `done`. */
  record: TrialRecord | null
}

export function createTrialState(
  stimulus: Stimulus,
  isiMs: number,
  feedback: boolean,
): TrialState {
  return {
    phase: 'fixation',
    stimulus,
    isiMs,
    feedback,
    onsetMs: null,
    playerResponse: null,
    responseAtMs: null,
    responseTimeMs: null,
    isCorrect: false,
    timedOut: false,
    visibilityLost: false,
    // Until SPEC-04 (keyboard), every response is a pointer (B-03).
    responseDevice: 'pointer',
    record: null,
  }
}

function buildRecord(state: TrialState): TrialRecord {
  if (state.onsetMs === null) {
    throw new Error('trialMachine: cannot build a record without stimulus onset')
  }
  return {
    stimulus: state.stimulus,
    isiMs: state.isiMs,
    stimulusOnsetMs: state.onsetMs,
    responseAtMs: state.responseAtMs,
    responseTimeMs: state.responseTimeMs,
    playerResponse: state.playerResponse,
    isCorrect: state.isCorrect,
    timedOut: state.timedOut,
    responseDevice: state.responseDevice,
    visibilityLost: state.visibilityLost,
  }
}

function finishResponsePhase(state: TrialState): TrialState {
  if (state.feedback) {
    return { ...state, phase: 'feedback', record: null }
  }
  return { ...state, phase: 'done', record: buildRecord(state) }
}

/** Pure reducer: times arrive in events; never reads the clock (timing.md §5). */
export function trialReduce(state: TrialState, event: TrialEvent): TrialState {
  switch (event.type) {
    case 'FIXATION_END': {
      if (state.phase !== 'fixation') return state
      return { ...state, phase: 'stimulus' }
    }
    case 'STIMULUS_PAINTED': {
      if (state.phase !== 'stimulus' || state.onsetMs !== null) return state
      return { ...state, onsetMs: event.t }
    }
    case 'RESPONSE': {
      if (state.phase !== 'stimulus') return state
      if (state.playerResponse !== null || state.timedOut) return state
      const onsetMs = state.onsetMs ?? event.onsetMs ?? null
      if (onsetMs === null) return state
      const responseTimeMs = event.t - onsetMs
      return finishResponsePhase({
        ...state,
        onsetMs,
        playerResponse: event.color,
        responseAtMs: event.t,
        responseTimeMs,
        isCorrect: event.color === state.stimulus.inkColor,
        timedOut: false,
        responseDevice: event.device ?? 'pointer',
      })
    }
    case 'TIMEOUT': {
      if (state.phase !== 'stimulus' || state.onsetMs === null) return state
      if (state.playerResponse !== null || state.timedOut) return state
      return finishResponsePhase({
        ...state,
        playerResponse: null,
        responseAtMs: null,
        responseTimeMs: null,
        isCorrect: false,
        timedOut: true,
      })
    }
    case 'FEEDBACK_END': {
      if (state.phase !== 'feedback') return state
      return { ...state, phase: 'done', record: buildRecord(state) }
    }
    case 'VISIBILITY_LOST': {
      if (state.phase === 'done') return state
      return { ...state, visibilityLost: true }
    }
    default: {
      return state
    }
  }
}

/** Uniform integer ISI in [ISI_MIN_MS, ISI_MAX_MS]. */
export function drawIsiMs(rng: () => number): number {
  const span = ISI_MAX_MS - ISI_MIN_MS + 1
  return ISI_MIN_MS + Math.floor(rng() * span)
}
