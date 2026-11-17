import { StimulusWord } from '../components/StimulusWord'
import { COLOR_WORDS } from '../game/colors'
import styles from './App.module.css'

// Temporary preview for T-01.3.2; replaced by the test screen in T-01.3.3.
function App() {
  return (
    <main className={styles.preview}>
      <StimulusWord word={COLOR_WORDS.blue} inkColor="red" />
    </main>
  )
}

export default App
