export type ColorId = 'red' | 'green' | 'blue' | 'yellow'

export type Condition = 'congruent' | 'incongruent' | 'neutral'

export type BlockId = 'practice' | 'baseline' | 'stroop'

export interface Stimulus {
  word: string
  inkColor: ColorId
  condition: Condition
  // null when the word is not a color name (the neutral stimulus).
  wordColor: ColorId | null
}

/** Hard-coded block: trial counts per condition, feedback, and whether it scores (DD-14). */
export interface BlockConfig {
  id: BlockId
  counts: Readonly<Record<Condition, number>>
  feedback: boolean
  scores: boolean
}

/** How the participant answered; keyboard arrives with SPEC-04. */
export type ResponseDevice = 'pointer' | 'keyboard'

/**
 * One completed trial, before JSON export (SPEC-07 maps names to snake_case).
 * Times are ms on the performance timeline (session-relative at export).
 */
export interface TrialRecord {
  stimulus: Stimulus
  isiMs: number
  stimulusOnsetMs: number
  responseAtMs: number | null
  responseTimeMs: number | null
  playerResponse: ColorId | null
  isCorrect: boolean
  timedOut: boolean
  responseDevice: ResponseDevice
  visibilityLost: boolean
}
