import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { COLOR_WORDS } from '../game/colors'
import { createRng } from '../game/rng'
import type { Stimulus, TrialRecord } from '../game/types'
import { installClock, uninstallClock } from '../timing/clock'
import {
  drawIsiMs,
  ISI_MAX_MS,
  ISI_MIN_MS,
  STIMULUS_TIMEOUT_MS,
} from './trialMachine'
import { useTrialRunner } from './useTrialRunner'

const stimulus: Stimulus = {
  word: COLOR_WORDS.blue,
  inkColor: 'red',
  condition: 'incongruent',
  wordColor: 'blue',
}

/** rAF → short setTimeout so Vitest fake timers can flush paints. */
function stubAnimationFrame() {
  vi.stubGlobal(
    'requestAnimationFrame',
    (cb: FrameRequestCallback): number => {
      return setTimeout(() => {
        cb(performance.now())
      }, 16) as unknown as number
    },
  )
  vi.stubGlobal('cancelAnimationFrame', (id: number) => {
    clearTimeout(id)
  })
}

async function flushPaint() {
  // onNextPaint schedules two rAF ticks (~16ms each).
  await act(async () => {
    await vi.advanceTimersByTimeAsync(16)
    await vi.advanceTimersByTimeAsync(16)
  })
}

describe('useTrialRunner', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    stubAnimationFrame()
    installClock(() => performance.now())
  })

  afterEach(() => {
    uninstallClock()
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('keeps drawn ISI in [200, 500] and times out 1500 ms after onset', async () => {
    const records: TrialRecord[] = []
    // rng() === 0 → ISI_MIN; next call unused in this single trial.
    const rng = () => 0
    const stimuli = [stimulus] as const

    const { result, unmount } = renderHook(() =>
      useTrialRunner({
        stimuli,
        rng,
        feedback: false,
        sessionOriginMs: 0,
        onTrialComplete: (record) => {
          records.push(record)
        },
      }),
    )

    expect(result.current.phase).toBe('fixation')

    await act(async () => {
      await vi.advanceTimersByTimeAsync(ISI_MIN_MS)
    })
    expect(result.current.phase).toBe('stimulus')

    await flushPaint()

    await act(async () => {
      await vi.advanceTimersByTimeAsync(STIMULUS_TIMEOUT_MS)
    })

    expect(records).toHaveLength(1)
    expect(records[0]?.timedOut).toBe(true)
    expect(records[0]?.isiMs).toBe(ISI_MIN_MS)
    expect(records[0]?.responseTimeMs).toBeNull()
    expect(result.current.isComplete).toBe(true)

    unmount()
  })

  it('across many seeds, ISI stays inside [200, 500]', () => {
    for (let seed = 0; seed < 200; seed += 1) {
      const rng = createRng(seed)
      for (let i = 0; i < 5; i += 1) {
        const isi = drawIsiMs(rng)
        expect(isi).toBeGreaterThanOrEqual(ISI_MIN_MS)
        expect(isi).toBeLessThanOrEqual(ISI_MAX_MS)
      }
    }
  })

  it('clears timers on unmount mid-trial without throwing', async () => {
    const stimuli = [stimulus] as const
    const { unmount } = renderHook(() =>
      useTrialRunner({
        stimuli,
        rng: () => 0,
        feedback: false,
        onTrialComplete: () => {},
      }),
    )

    await act(async () => {
      await vi.advanceTimersByTimeAsync(100)
    })

    expect(() => unmount()).not.toThrow()
  })

  it('accepts respond() after paint and completes the trial', async () => {
    const records: TrialRecord[] = []
    const stimuli = [stimulus] as const

    const { result } = renderHook(() =>
      useTrialRunner({
        stimuli,
        rng: () => 0,
        feedback: false,
        sessionOriginMs: 0,
        onTrialComplete: (record) => {
          records.push(record)
        },
      }),
    )

    await act(async () => {
      await vi.advanceTimersByTimeAsync(ISI_MIN_MS)
    })
    await flushPaint()
    expect(result.current.acceptingResponse).toBe(true)

    await act(async () => {
      // Slightly after onset on the fake performance timeline.
      result.current.respond('red', performance.now() + 1)
    })

    expect(records).toHaveLength(1)
    expect(records[0]?.isCorrect).toBe(true)
    expect(records[0]?.playerResponse).toBe('red')
    expect(records[0]?.responseDevice).toBe('pointer')
  })
})

