import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { strings } from '../content/strings'
import { COLOR_WORDS } from '../game/colors'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows AZUL in red ink when the test screen opens', () => {
    render(<App />)

    expect(screen.getByText(COLOR_WORDS.blue)).toBeInTheDocument()
  })

  it('shows the fixation cross after Next, then another stimulus', async () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: strings.stimulusTest.next }))

    expect(screen.getByText('+')).toBeInTheDocument()
    expect(screen.queryByText(COLOR_WORDS.blue)).not.toBeInTheDocument()

    await act(async () => {
      await vi.advanceTimersByTimeAsync(350)
    })

    expect(screen.queryByText('+')).not.toBeInTheDocument()
    expect(screen.getByText(COLOR_WORDS.green)).toBeInTheDocument()
  })
})
