import { strings } from '../content/strings'
import styles from './screen.module.css'

export type StartScreenProps = {
  onBegin: () => void
}

export function StartScreen({ onBegin }: StartScreenProps) {
  return (
    <main className={styles.root}>
      <h1 className={styles.title}>
        {strings.start.title}
        <span className={styles.titleAccent}>.</span>
      </h1>
      <p className={styles.body}>{strings.start.subtitle}</p>
      <button type="button" className={styles.button} onClick={onBegin}>
        {strings.start.begin}
      </button>
    </main>
  )
}
