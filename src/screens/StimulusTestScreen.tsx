import { useEffect, useState } from 'react'
import { FixationCross } from '../components/FixationCross'
import { StimulusWord } from '../components/StimulusWord'
import { strings } from '../content/strings'
import { COLOR_WORDS } from '../game/colors'
import type { ColorId } from '../game/types'
import styles from './StimulusTestScreen.module.css'

type PreviewStimulus = {
  word: string
  inkColor: ColorId
}

// Hand-picked pairs for the US-01.3 test screen; real blocks come from buildTrials later.
const PREVIEW_STIMULI: readonly PreviewStimulus[] = [
  { word: COLOR_WORDS.blue, inkColor: 'red' },
  { word: COLOR_WORDS.green, inkColor: 'yellow' },
  { word: COLOR_WORDS.red, inkColor: 'red' },
  { word: COLOR_WORDS.yellow, inkColor: 'blue' },
]

// Midpoint of RF05 (200–500 ms). The real ISI draw lives in useTrialRunner (SPEC-03).
const FIXATION_MS = 350

type Phase = 'stimulus' | 'fixation'

export function StimulusTestScreen() {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('stimulus')

  useEffect(() => {
    if (phase !== 'fixation') {
      return
    }

    const timerId = window.setTimeout(() => {
      setIndex((current) => (current + 1) % PREVIEW_STIMULI.length)
      setPhase('stimulus')
    }, FIXATION_MS)

    return () => {
      window.clearTimeout(timerId)
    }
  }, [phase])

  const stimulus = PREVIEW_STIMULI[index]!

  function handleNext() {
    if (phase !== 'stimulus') {
      return
    }
    setPhase('fixation')
  }

  return (
    <main className={styles.root}>
      <div className={styles.stage}>
        {phase === 'fixation' ? (
          <FixationCross />
        ) : (
          <StimulusWord word={stimulus.word} inkColor={stimulus.inkColor} />
        )}
      </div>

      <button
        type="button"
        className={styles.next}
        onClick={handleNext}
        disabled={phase === 'fixation'}
      >
        {strings.stimulusTest.next}
      </button>
    </main>
  )
}
