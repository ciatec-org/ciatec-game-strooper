import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import type { Rng } from '../game/rng'
import type { ColorId, Stimulus, TrialRecord } from '../game/types'
import { now } from '../timing/clock'
import { onNextPaint } from '../timing/onset'
import { tokens } from '../theme/tokens'
import {
  createTrialState,
  drawIsiMs,
  STIMULUS_TIMEOUT_MS,
  trialReduce,
  type TrialState,
} from './trialMachine'

export type UseTrialRunnerOptions = {
  stimuli: readonly Stimulus[]
  rng: Rng
  /** When true, hold the feedback phase for `feedbackMs` (DD-09). */
  feedback: boolean
  feedbackMs?: number
  timeoutMs?: number
  /**
   * Performance timeline origin for relative onset/response times.
   * Defaults to `now()` when the hook first mounts.
   */
  sessionOriginMs?: number
  onTrialComplete: (record: TrialRecord) => void
  onBlockComplete?: () => void
}

export type TrialRunnerView = {
  index: number
  phase: TrialState['phase']
  stimulus: Stimulus | null
  /** True after the last trial has completed. */
  isComplete: boolean
  /** Stimulus is painted and the first response will be accepted. */
  acceptingResponse: boolean
  /**
   * Deliver a response with the browser event timestamp (`pointerdown` /
   * `keydown`). Never call this from `click`.
   */
  respond: (color: ColorId, timeStamp: number) => void
}

type RunnerAction =
  | { type: 'start'; stimulus: Stimulus; isiMs: number; feedback: boolean }
  | { type: 'trial'; event: Parameters<typeof trialReduce>[1] }
  | { type: 'clear' }

type RunnerState = {
  trial: TrialState | null
}

function runnerReduce(state: RunnerState, action: RunnerAction): RunnerState {
  switch (action.type) {
    case 'start':
      return {
        trial: createTrialState(
          action.stimulus,
          action.isiMs,
          action.feedback,
        ),
      }
    case 'trial': {
      if (!state.trial) return state
      return { trial: trialReduce(state.trial, action.event) }
    }
    case 'clear':
      return { trial: null }
    default:
      return state
  }
}

/**
 * Runs fixation → stimulus → feedback → next for a fixed `stimuli` list.
 * Timers and paint marking live here; the reducer stays pure (timing.md).
 */
export function useTrialRunner(options: UseTrialRunnerOptions): TrialRunnerView {
  const {
    stimuli,
    rng,
    feedback,
    feedbackMs = tokens.timing.feedbackMs,
    timeoutMs = STIMULUS_TIMEOUT_MS,
    onTrialComplete,
    onBlockComplete,
  } = options

  const sessionOriginRef = useRef(options.sessionOriginMs ?? now())
  const [index, setIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(stimuli.length === 0)
  const [runner, dispatch] = useReducer(runnerReduce, { trial: null })

  const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const feedbackIdRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isiIdRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cancelPaintRef = useRef<(() => void) | null>(null)
  /** Absolute performance deadline (`onsetAbs + timeoutMs`). */
  const deadlineRef = useRef<number | null>(null)
  /** Absolute onset; used by `respond` without waiting on React state. */
  const onsetAbsRef = useRef<number | null>(null)
  const pendingResponseRef = useRef<{ color: ColorId; t: number } | null>(null)
  const completedIndexRef = useRef<number | null>(null)
  const trialRef = useRef(runner.trial)
  const stimuliRef = useRef(stimuli)
  const rngRef = useRef(rng)
  const feedbackRef = useRef(feedback)
  const onTrialCompleteRef = useRef(onTrialComplete)
  const onBlockCompleteRef = useRef(onBlockComplete)
  const timeoutMsRef = useRef(timeoutMs)
  const feedbackMsRef = useRef(feedbackMs)

  // Sync refs after render so event handlers / timers see the latest values
  // without restarting effects on unstable callback identities.
  useLayoutEffect(() => {
    trialRef.current = runner.trial
    stimuliRef.current = stimuli
    rngRef.current = rng
    feedbackRef.current = feedback
    onTrialCompleteRef.current = onTrialComplete
    onBlockCompleteRef.current = onBlockComplete
    timeoutMsRef.current = timeoutMs
    feedbackMsRef.current = feedbackMs
  })

  const clearTimers = useCallback(() => {
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current)
      timeoutIdRef.current = null
    }
    if (feedbackIdRef.current !== null) {
      clearTimeout(feedbackIdRef.current)
      feedbackIdRef.current = null
    }
    if (isiIdRef.current !== null) {
      clearTimeout(isiIdRef.current)
      isiIdRef.current = null
    }
    cancelPaintRef.current?.()
    cancelPaintRef.current = null
  }, [])

  const relative = useCallback((absoluteMs: number) => {
    return absoluteMs - sessionOriginRef.current
  }, [])

  // Start (or restart) the trial at `index`.
  useEffect(() => {
    if (isComplete) return
    const list = stimuliRef.current
    if (index >= list.length) return
    const stimulus = list[index]
    if (!stimulus) return

    clearTimers()
    pendingResponseRef.current = null
    deadlineRef.current = null
    onsetAbsRef.current = null
    completedIndexRef.current = null

    const isiMs = drawIsiMs(rngRef.current)
    dispatch({
      type: 'start',
      stimulus,
      isiMs,
      feedback: feedbackRef.current,
    })

    isiIdRef.current = setTimeout(() => {
      dispatch({ type: 'trial', event: { type: 'FIXATION_END' } })
    }, isiMs)

    return () => {
      clearTimers()
    }
  }, [index, isComplete, clearTimers])

  // Mark paint onset once the stimulus phase is on screen.
  useLayoutEffect(() => {
    const trial = runner.trial
    if (!trial || trial.phase !== 'stimulus' || trial.onsetMs !== null) {
      return
    }

    cancelPaintRef.current?.()
    cancelPaintRef.current = onNextPaint((paintedAt) => {
      const onsetAbs = paintedAt
      const limit = timeoutMsRef.current
      onsetAbsRef.current = onsetAbs
      deadlineRef.current = onsetAbs + limit
      dispatch({
        type: 'trial',
        event: { type: 'STIMULUS_PAINTED', t: relative(onsetAbs) },
      })

      const delay = Math.max(0, deadlineRef.current - now())
      timeoutIdRef.current = setTimeout(() => {
        const pending = pendingResponseRef.current
        const deadline = deadlineRef.current
        if (pending && deadline !== null && pending.t <= deadline) {
          dispatch({
            type: 'trial',
            event: {
              type: 'RESPONSE',
              color: pending.color,
              t: relative(pending.t),
            },
          })
          return
        }
        dispatch({
          type: 'trial',
          event: { type: 'TIMEOUT', t: relative(deadline ?? now()) },
        })
      }, delay)
    })

    return () => {
      cancelPaintRef.current?.()
      cancelPaintRef.current = null
    }
  }, [runner.trial, relative])

  // After feedback starts, schedule FEEDBACK_END.
  useEffect(() => {
    const trial = runner.trial
    if (!trial || trial.phase !== 'feedback') return

    feedbackIdRef.current = setTimeout(() => {
      dispatch({ type: 'trial', event: { type: 'FEEDBACK_END' } })
    }, feedbackMsRef.current)

    return () => {
      if (feedbackIdRef.current !== null) {
        clearTimeout(feedbackIdRef.current)
        feedbackIdRef.current = null
      }
    }
  }, [runner.trial])

  // Emit record and advance when a trial is done.
  useEffect(() => {
    const trial = runner.trial
    if (!trial || trial.phase !== 'done' || !trial.record) return
    if (completedIndexRef.current === index) return
    completedIndexRef.current = index

    clearTimers()
    onTrialCompleteRef.current(trial.record)

    const nextIndex = index + 1
    if (nextIndex >= stimuliRef.current.length) {
      setIsComplete(true)
      dispatch({ type: 'clear' })
      onBlockCompleteRef.current?.()
      return
    }
    setIndex(nextIndex)
  }, [runner.trial, index, clearTimers])

  // Visibility: mark the in-flight trial; do not pause (GDD §15.3).
  useEffect(() => {
    function onVisibility() {
      if (document.visibilityState === 'hidden') {
        dispatch({ type: 'trial', event: { type: 'VISIBILITY_LOST' } })
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const respond = useCallback(
    (color: ColorId, timeStamp: number) => {
      pendingResponseRef.current = { color, t: timeStamp }
      const trial = trialRef.current
      if (!trial || trial.phase !== 'stimulus') {
        return
      }
      if (onsetAbsRef.current === null) {
        return
      }
      const deadline = deadlineRef.current
      if (deadline !== null && timeStamp > deadline) {
        return
      }
      if (timeoutIdRef.current !== null) {
        clearTimeout(timeoutIdRef.current)
        timeoutIdRef.current = null
      }
      const onsetAbs = onsetAbsRef.current
      dispatch({
        type: 'trial',
        event: {
          type: 'RESPONSE',
          color,
          t: relative(timeStamp),
          onsetMs: onsetAbs === null ? undefined : relative(onsetAbs),
        },
      })
    },
    [relative],
  )

  const trial = runner.trial
  const acceptingResponse =
    trial?.phase === 'stimulus' && trial.onsetMs !== null

  return {
    index,
    phase: trial?.phase ?? (isComplete ? 'done' : 'fixation'),
    stimulus: trial?.stimulus ?? null,
    isComplete,
    acceptingResponse,
    respond,
  }
}
