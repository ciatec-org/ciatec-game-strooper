import { strings } from '../content/strings'
import styles from './screen.module.css'

/** End screen: message only, no scores (DD-08). Download is wired in SPEC-07. */
export function ResultScreen() {
  return (
    <main className={styles.root}>
      <h1 className={styles.title}>{strings.result.title}</h1>
      <p className={styles.body}>{strings.result.done}</p>
    </main>
  )
}
