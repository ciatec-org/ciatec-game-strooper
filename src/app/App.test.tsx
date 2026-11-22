import { act, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { strings } from '../content/strings'
import { COLOR_WORDS } from '../game/colors'
import App from './App'

/** Match useTrialRunner: two rAF ticks via fake timers. */
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

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    stubAnimationFrame()
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('starts on fixation, then shows a stimulus and response buttons', async () => {
    render(<App />)

    expect(screen.getByText('+')).toBeInTheDocument()
    expect(screen.getByText(strings.trialCycle.hint)).toBeInTheDocument()

    await act(async () => {
      await vi.advanceTimersByTimeAsync(500)
      await vi.advanceTimersByTimeAsync(16)
      await vi.advanceTimersByTimeAsync(16)
    })

    expect(screen.getAllByText(COLOR_WORDS.blue).length).toBeGreaterThanOrEqual(1)
    expect(screen.getByRole('button', { name: COLOR_WORDS.red })).toBeInTheDocument()
    expect(screen.queryByText('+')).not.toBeInTheDocument()
  })
})
