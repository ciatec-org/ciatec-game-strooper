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
