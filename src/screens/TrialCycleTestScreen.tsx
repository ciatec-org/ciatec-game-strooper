import { useCallback, useMemo, useState, type PointerEvent } from 'react'
import { FixationCross } from '../components/FixationCross'
import { StimulusWord } from '../components/StimulusWord'
import { strings } from '../content/strings'
import { COLOR_ORDER, COLOR_WORDS } from '../game/colors'
import { createRng } from '../game/rng'
import type { ColorId, Stimulus, TrialRecord } from '../game/types'
import { useTrialRunner } from '../trial/useTrialRunner'
import styles from './TrialCycleTestScreen.module.css'

// Provisional list until T-02.1.2 / BlockScreen wire buildTrials (SPEC-03).
const DEMO_STIMULI: readonly Stimulus[] = [
  {
    word: COLOR_WORDS.blue,
    inkColor: 'red',
    condition: 'incongruent',
    wordColor: 'blue',
  },
  {
    word: COLOR_WORDS.red,
    inkColor: 'red',
    condition: 'congruent',
    wordColor: 'red',
  },
  {
    word: 'XXXX',
    inkColor: 'green',
    condition: 'neutral',
    wordColor: null,
  },
  {
    word: COLOR_WORDS.yellow,
    inkColor: 'blue',
    condition: 'incongruent',
    wordColor: 'yellow',
  },
]

/**
 * Provisional screen to exercise the trial cycle (B-03). Replaced by
 * BlockScreen + ResponseButtons in the student tasks (US-03.2 / US-03.1).
 */
export function TrialCycleTestScreen() {
  const rng = useMemo(() => createRng(1), [])
  const [log, setLog] = useState<string[]>([])

  const onTrialComplete = useCallback((record: TrialRecord) => {
    const response = record.timedOut
      ? 'omissão'
      : `${record.playerResponse} (${record.isCorrect ? 'acerto' : 'erro'}, RT ${record.responseTimeMs?.toFixed(0)} ms)`
    setLog((prev) => [
      ...prev,
      `#${prev.length + 1} ${record.stimulus.condition}: ${response}`,
    ])
  }, [])

  const { phase, stimulus, isComplete, acceptingResponse, respond } =
    useTrialRunner({
      stimuli: DEMO_STIMULI,
      rng,
      feedback: true,
      onTrialComplete,
    })

  function handlePointerDown(
    color: ColorId,
    event: PointerEvent<HTMLButtonElement>,
  ) {
    // pointerdown + event.timeStamp — never click (timing.md).
    respond(color, event.timeStamp)
  }

  return (
    <main className={styles.root}>
      <p className={styles.hint}>{strings.trialCycle.hint}</p>

      <div className={styles.stage}>
        {isComplete ? (
          <p className={styles.done}>{strings.trialCycle.done}</p>
        ) : phase === 'fixation' || !stimulus ? (
          <FixationCross />
        ) : phase === 'stimulus' || phase === 'feedback' ? (
          phase === 'stimulus' ? (
            <StimulusWord word={stimulus.word} inkColor={stimulus.inkColor} />
          ) : (
            <p className={styles.feedback} aria-live="polite">
              …
            </p>
          )
        ) : null}
      </div>

      <div className={styles.buttons} role="group" aria-label={strings.trialCycle.buttons}>
        {COLOR_ORDER.map((color) => (
          <button
            key={color}
            type="button"
            className={styles.button}
            disabled={isComplete || !acceptingResponse}
            onPointerDown={(event) => {
              handlePointerDown(color, event)
            }}
          >
            {COLOR_WORDS[color]}
          </button>
        ))}
      </div>

      {log.length > 0 ? (
        <ul className={styles.log}>
          {log.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ) : null}
    </main>
  )
}
