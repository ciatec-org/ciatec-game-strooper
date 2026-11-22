import { strings } from '../content/strings'
import type { BlockId } from '../game/types'
import styles from './screen.module.css'

export type TransitionScreenProps = {
  blockId: BlockId
  onContinue: () => void
}

const TRANSITION_BODY: Readonly<Record<BlockId, string>> = {
  practice: strings.transition.practice,
  baseline: strings.transition.baseline,
  stroop: strings.transition.stroop,
}

export function TransitionScreen({
  blockId,
  onContinue,
}: TransitionScreenProps) {
  return (
    <main className={styles.root}>
      <p className={styles.eyebrow}>{strings.transition.title}</p>
      <h1 className={styles.title}>{blockId}</h1>
      <p className={styles.body}>{TRANSITION_BODY[blockId]}</p>
      <button type="button" className={styles.button} onClick={onContinue}>
        {strings.transition.continue}
      </button>
    </main>
  )
}
