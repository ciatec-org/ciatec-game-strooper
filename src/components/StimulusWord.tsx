import type { ColorId } from '../game/types'
import styles from './StimulusWord.module.css'

// Maps each ink ColorId to the CSS variable defined from tokens.ts in main.tsx.
const INK_COLOR_VAR: Readonly<Record<ColorId, string>> = {
  red: 'var(--color-ink-red)',
  green: 'var(--color-ink-green)',
  blue: 'var(--color-ink-blue)',
  yellow: 'var(--color-ink-yellow)',
}

export type StimulusWordProps = {
  word: string
  inkColor: ColorId
}

export function StimulusWord({ word, inkColor }: StimulusWordProps) {
  return (
    <p className={styles.root} aria-live="polite">
      <span className={styles.word} style={{ color: INK_COLOR_VAR[inkColor] }}>
        {word}
      </span>
    </p>
  )
}
