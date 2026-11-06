export type ColorId = 'red' | 'green' | 'blue' | 'yellow'

export type Condition = 'congruent' | 'incongruent' | 'neutral'

export interface Stimulus {
  word: string
  inkColor: ColorId
  condition: Condition
  // null when the word is not a color name (the neutral stimulus).
  wordColor: ColorId | null
}
