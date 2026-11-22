import { strings } from '../content/strings'
import styles from './screen.module.css'

export type SetupScreenProps = {
  participantCode: string
  colorblindMode: boolean
  setupBlocked: boolean
  onParticipantCodeChange: (code: string) => void
  onColorblindModeChange: (enabled: boolean) => void
  onStartSession: () => void
}

export function SetupScreen({
  participantCode,
  colorblindMode,
  setupBlocked,
  onParticipantCodeChange,
  onColorblindModeChange,
  onStartSession,
}: SetupScreenProps) {
  return (
    <main className={styles.root}>
      <h1 className={styles.title}>{strings.setup.title}</h1>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="participant-code">
          {strings.setup.participantCode}
        </label>
        <input
          id="participant-code"
          className={styles.input}
          value={participantCode}
          autoComplete="off"
          onChange={(event) => {
            onParticipantCodeChange(event.target.value)
          }}
        />
        {setupBlocked ? (
          <p className={styles.error} role="alert">
            {strings.setup.participantCodeRequired}
          </p>
        ) : null}
      </div>

      <label className={styles.check}>
        <input
          type="checkbox"
          checked={colorblindMode}
          onChange={(event) => {
            onColorblindModeChange(event.target.checked)
          }}
        />
        {strings.setup.colorblindMode}
      </label>

      <button type="button" className={styles.button} onClick={onStartSession}>
        {strings.setup.startSession}
      </button>
    </main>
  )
}
