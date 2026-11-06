import { strings } from '../content/strings'
import styles from './App.module.css'

function App() {
  return (
    <main className={styles.start}>
      <h1 className={styles.title}>{strings.start.title}</h1>
      <p className={styles.subtitle}>{strings.start.subtitle}</p>
    </main>
  )
}

export default App
