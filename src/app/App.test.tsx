import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { COLOR_WORDS } from '../game/colors'
import App from './App'

describe('App', () => {
  it('shows AZUL in red ink as the StimulusWord preview', () => {
    render(<App />)

    expect(screen.getByText(COLOR_WORDS.blue)).toBeInTheDocument()
  })
})
