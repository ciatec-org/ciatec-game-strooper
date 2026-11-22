import { strings } from '../content/strings'
import styles from './screen.module.css'

export type InstructionsScreenProps = {
  onContinue: () => void
}

export function InstructionsScreen({ onContinue }: InstructionsScreenProps) {
  return (
    <main className={styles.root}>
      <h1 className={styles.title}>{strings.instructions.title}</h1>
      <p className={styles.body}>{strings.instructions.rule}</p>
      <button type="button" className={styles.button} onClick={onContinue}>
        {strings.instructions.continue}
      </button>
    </main>
  )
}
