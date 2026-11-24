import { useMemo } from 'react'
import { FixationCross } from '../components/FixationCross'
import { ResponseButtons } from '../components/ResponseButtons'
import { StimulusWord } from '../components/StimulusWord'
import { BLOCKS } from '../game/blocks'
import { buildTrials } from '../game/generator'
import { createRng } from '../game/rng'
import type { BlockId, TrialRecord } from '../game/types'
import { useTrialRunner } from '../trial/useTrialRunner'
import styles from './BlockScreen.module.css'

export type BlockScreenProps = {
  blockId: BlockId
  /** Session seed; each block derives its own RNG from it (replayable). */
  seed: number
  /** Receives every trial record; telemetry hooks in here (T-04.2.x). */
  onTrialComplete?: (record: TrialRecord) => void
  onComplete: () => void
}

/**
 * Plays one block (T-03.2.1 / SPEC-05): buildTrials → useTrialRunner →
 * FixationCross / StimulusWord, with ResponseButtons always mounted (RNF02).
 */
export function BlockScreen({
  blockId,
  seed,
  onTrialComplete,
  onComplete,
}: BlockScreenProps) {
  const blockIndex = BLOCKS.findIndex((block) => block.id === blockId)
  const block = BLOCKS[blockIndex]

  // One RNG per block, created fresh from the seed: it shuffles the stimuli
  // and then draws the ISIs, so the same seed replays the same block.
  const { rng, stimuli } = useMemo(() => {
    const blockRng = createRng(seed + blockIndex)
    return {
      rng: blockRng,
      stimuli: block ? buildTrials(block, blockRng) : [],
    }
  }, [block, seed, blockIndex])

  const { phase, stimulus, respond } = useTrialRunner({
    stimuli,
    rng,
    feedback: block?.feedback ?? false,
    onTrialComplete: (record) => onTrialComplete?.(record),
    onBlockComplete: onComplete,
  })

  return (
    <main className={styles.root}>
      <div className={styles.stage}>
        {phase === 'fixation' ? <FixationCross /> : null}
        {phase === 'stimulus' && stimulus ? (
          <StimulusWord word={stimulus.word} inkColor={stimulus.inkColor} />
        ) : null}
        {/* TODO(T-03.4.1): show hit / error / omission feedback (no color) during 'feedback'. */}
      </div>

      {/* Always rendered so the buttons never move during the block (RNF02). */}
      <ResponseButtons onResponse={respond} />
    </main>
  )
}
