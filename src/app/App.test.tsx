import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { strings } from '../content/strings'
import App from './App'

describe('App', () => {
  it('shows the game title and subtitle on the start screen', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: strings.start.title }),
    ).toBeInTheDocument()
    expect(screen.getByText(strings.start.subtitle)).toBeInTheDocument()
  })
})
