import { strings } from '../content/strings'
import type { BlockId } from '../game/types'
import styles from './screen.module.css'

export type BlockScreenStubProps = {
  blockId: BlockId
  onComplete: () => void
}

/**
 * Skeleton stand-in for BlockScreen (T-03.2.1). Lets the session machine be
 * exercised end-to-end before the real trial UI is wired.
 */
export function BlockScreenStub({ blockId, onComplete }: BlockScreenStubProps) {
  return (
    <main className={styles.root}>
      <p className={styles.eyebrow}>{strings.block.stubHint}</p>
      <h1 className={styles.title}>{blockId}</h1>
      <button
        type="button"
        className={`${styles.button} ${styles.buttonSecondary}`}
        onClick={onComplete}
      >
        {strings.block.stubComplete}
      </button>
    </main>
  )
}
