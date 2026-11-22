import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { strings } from '../content/strings'
import App from './App'

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

  it('walks from start to result through the block stubs', () => {
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
        screen.getByRole('button', { name: strings.block.stubComplete }),
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
