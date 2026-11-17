import styles from './FixationCross.module.css'

/** Neutral “+” shown between trials so gaze stays on the stimulus center. */
export function FixationCross() {
  return (
    <p className={styles.root} aria-hidden="true">
      <span className={styles.mark}>+</span>
    </p>
  )
}
