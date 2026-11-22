import type { BlockId, TrialRecord } from '../game/types'
import type { ScoredTrial } from '../game/scoring'

export type SessionMeta = {
  sessionId: string
  playerId: string
  timestamp: string
  appVersion: string
  frameIntervalMs: number
  colorblindMode: boolean
  rngSeed: number
}

export type RecordedTrial = ScoredTrial & {
  indexInBlock: number
  trialIndex: number
}

/** In-memory session log. Pure — no React, no DOM (architecture.md). */
export function createRecorder(meta: SessionMeta) {
  const trials: RecordedTrial[] = []
  let trialIndex = 0
  const indexInBlock: Partial<Record<BlockId, number>> = {}

  return {
    meta,
    getTrials(): readonly RecordedTrial[] {
      return trials
    },
    recordTrial(block: BlockId, record: TrialRecord): RecordedTrial {
      trialIndex += 1
      const nextInBlock = (indexInBlock[block] ?? 0) + 1
      indexInBlock[block] = nextInBlock
      const scored: RecordedTrial = {
        ...record,
        block,
        indexInBlock: nextInBlock,
        trialIndex,
      }
      trials.push(scored)
      return scored
    },
  }
}

export type SessionRecorder = ReturnType<typeof createRecorder>
