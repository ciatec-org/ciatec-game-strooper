import { COLOR_ORDER, COLOR_WORDS } from './colors'
import type { Rng } from './rng'
import type { BlockConfig, ColorId, Condition, Stimulus } from './types'

// TODO(GDD-15.5): provisional neutral stimulus until the research team decides.
export const NEUTRAL_STIMULUS = 'XXXX'

const MAX_SHUFFLE_ATTEMPTS = 1000

/** Distribute `count` slots across the four inks so each appears the same number of times (±1). */
function balancedInkColors(count: number): ColorId[] {
  const base = Math.floor(count / COLOR_ORDER.length)
  const remainder = count % COLOR_ORDER.length
  const inks: ColorId[] = []
  for (let i = 0; i < COLOR_ORDER.length; i += 1) {
    const n = base + (i < remainder ? 1 : 0)
    for (let j = 0; j < n; j += 1) {
      inks.push(COLOR_ORDER[i]!)
    }
  }
  return inks
}

function pickOtherColor(inkColor: ColorId, rng: Rng): ColorId {
  const others = COLOR_ORDER.filter((color) => color !== inkColor)
  const index = Math.floor(rng() * others.length)
  return others[index]!
}

function makeStimulus(
  condition: Condition,
  inkColor: ColorId,
  rng: Rng,
): Stimulus {
  if (condition === 'congruent') {
    return {
      word: COLOR_WORDS[inkColor],
      inkColor,
      condition: 'congruent',
      wordColor: inkColor,
    }
  }
  if (condition === 'incongruent') {
    const wordColor = pickOtherColor(inkColor, rng)
    return {
      word: COLOR_WORDS[wordColor],
      inkColor,
      condition: 'incongruent',
      wordColor,
    }
  }
  return {
    word: NEUTRAL_STIMULUS,
    inkColor,
    condition: 'neutral',
    wordColor: null,
  }
}

function buildUnshuffled(block: BlockConfig, rng: Rng): Stimulus[] {
  const trials: Stimulus[] = []
  for (const condition of ['congruent', 'incongruent', 'neutral'] as const) {
    const count = block.counts[condition]
    if (count === 0) continue
    for (const inkColor of balancedInkColors(count)) {
      trials.push(makeStimulus(condition, inkColor, rng))
    }
  }
  return trials
}

function shuffleInPlace<T>(items: T[], rng: Rng): void {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1))
    const tmp = items[i]!
    items[i] = items[j]!
    items[j] = tmp
  }
}

function hasIdenticalConsecutivePair(trials: Stimulus[]): boolean {
  for (let i = 1; i < trials.length; i += 1) {
    const prev = trials[i - 1]!
    const curr = trials[i]!
    if (prev.word === curr.word && prev.inkColor === curr.inkColor) {
      return true
    }
  }
  return false
}

/**
 * Build the exact trial list for a block: balanced ink colors per condition,
 * Fisher–Yates shuffle via `rng`, and no identical word+ink pair in a row (RF02).
 */
export function buildTrials(block: BlockConfig, rng: Rng): Stimulus[] {
  const trials = buildUnshuffled(block, rng)

  for (let attempt = 0; attempt < MAX_SHUFFLE_ATTEMPTS; attempt += 1) {
    shuffleInPlace(trials, rng)
    if (!hasIdenticalConsecutivePair(trials)) {
      return trials
    }
  }

  throw new Error(
    `buildTrials: could not avoid consecutive identical word+ink pairs after ${MAX_SHUFFLE_ATTEMPTS} shuffles (block ${block.id})`,
  )
}
