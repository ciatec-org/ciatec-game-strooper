import { useReducer, useState } from 'react'
import { BlockScreen } from '../screens/BlockScreen'
import { InstructionsScreen } from '../screens/InstructionsScreen'
import { ResultScreen } from '../screens/ResultScreen'
import { SetupScreen } from '../screens/SetupScreen'
import { StartScreen } from '../screens/StartScreen'
import { TransitionScreen } from '../screens/TransitionScreen'
import {
  createSessionState,
  currentBlockId,
  sessionReduce,
} from './sessionMachine'

/**
 * Session shell (B-04 / SPEC-05). Download hooks in with SPEC-07 / T-04.2.2.
 */
function App() {
  const [session, dispatch] = useReducer(sessionReduce, undefined, createSessionState)
  // Drawn once per session; goes into the JSON as rng_seed with T-04.2.x.
  const [rngSeed] = useState(() => Math.floor(Math.random() * 2 ** 32))
  const blockId = currentBlockId(session)

  switch (session.screen) {
    case 'start':
      return (
        <StartScreen
          onBegin={() => {
            dispatch({ type: 'BEGIN' })
          }}
        />
      )
    case 'setup':
      return (
        <SetupScreen
          participantCode={session.participantCode}
          colorblindMode={session.colorblindMode}
          setupBlocked={session.setupBlocked}
          onParticipantCodeChange={(code) => {
            dispatch({ type: 'SET_PARTICIPANT_CODE', code })
          }}
          onColorblindModeChange={(enabled) => {
            dispatch({ type: 'SET_COLORBLIND_MODE', enabled })
          }}
          onStartSession={() => {
            dispatch({ type: 'START_SESSION' })
          }}
        />
      )
    case 'instructions':
      return (
        <InstructionsScreen
          onContinue={() => {
            dispatch({ type: 'CONTINUE_INSTRUCTIONS' })
          }}
        />
      )
    case 'transition':
      if (!blockId) return null
      return (
        <TransitionScreen
          blockId={blockId}
          onContinue={() => {
            dispatch({ type: 'CONTINUE_TRANSITION' })
          }}
        />
      )
    case 'block':
      if (!blockId) return null
      return (
        <BlockScreen
          key={blockId}
          blockId={blockId}
          seed={rngSeed}
          onComplete={() => {
            dispatch({ type: 'BLOCK_COMPLETE' })
          }}
        />
      )
    case 'result':
      return <ResultScreen />
    default:
      return null
  }
}

export default App
