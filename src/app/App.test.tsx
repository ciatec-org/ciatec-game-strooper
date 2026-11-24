import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { strings } from '../content/strings'
import App from './App'

// The real BlockScreen runs timed trials; this test only checks the screen flow.
const FINISH_BLOCK = 'test: finish block'
vi.mock('../screens/BlockScreen', () => ({
  BlockScreen: ({ onComplete }: { onComplete: () => void }) => (
    <button type="button" onClick={onComplete}>
      {FINISH_BLOCK}
    </button>
  ),
}))

describe('App session shell', () => {
  it('blocks starting a session without a participant code', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: strings.start.begin }))
    fireEvent.click(
      screen.getByRole('button', { name: strings.setup.startSession }),
    )

    expect(
      screen.getByText(strings.setup.participantCodeRequired),
    ).toBeInTheDocument()
    expect(screen.getByText(strings.setup.title)).toBeInTheDocument()
  })

  it('walks from start to result through the blocks', () => {
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: strings.start.begin }))
    fireEvent.change(screen.getByLabelText(strings.setup.participantCode), {
      target: { value: 'P-014' },
    })
    fireEvent.click(
      screen.getByRole('button', { name: strings.setup.startSession }),
    )
    fireEvent.click(
      screen.getByRole('button', { name: strings.instructions.continue }),
    )

    // practice → baseline → stroop
    for (let i = 0; i < 3; i += 1) {
      fireEvent.click(
        screen.getByRole('button', { name: FINISH_BLOCK }),
      )
      if (i < 2) {
        fireEvent.click(
          screen.getByRole('button', { name: strings.transition.continue }),
        )
      }
    }

    expect(screen.getByText(strings.result.done)).toBeInTheDocument()
    expect(screen.queryByText(/\d/)).not.toBeInTheDocument()
  })
})
