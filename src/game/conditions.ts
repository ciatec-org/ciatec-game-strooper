import { COLOR_ORDER, COLOR_WORDS } from './colors'
import type { ColorId, Condition } from './types'

export function getCondition(word: string, inkColor: ColorId): Condition {
  const wordColor = COLOR_ORDER.find((color) => COLOR_WORDS[color] === word)
  if (wordColor === undefined) return 'neutral'
  return wordColor === inkColor ? 'congruent' : 'incongruent'
}
