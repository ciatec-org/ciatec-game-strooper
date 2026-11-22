import type { BlockId, Condition, TrialRecord } from './types'

/** Per-block or whole-session aggregate (before JSON snake_case rename). */
export interface ScoreSummary {
  totalTrials: number
  totalCorrect: number
  totalErrors: number
  totalOmissions: number
  meanRtCongruentMs: number | null
  meanRtIncongruentMs: number | null
  meanRtNeutralMs: number | null
  stroopInterferenceEffectMs: number | null
  interferenceVsNeutralMs: number | null
  facilitationVsNeutralMs: number | null
}

export type ScoredTrial = TrialRecord & {
  block: BlockId
}

function round1(value: number): number {
  return Math.round(value * 10) / 10
}

function meanRt(
  trials: readonly ScoredTrial[],
  condition: Condition,
): number | null {
  const rts = trials
    .filter(
      (trial) =>
        trial.stimulus.condition === condition &&
        trial.isCorrect &&
        !trial.timedOut &&
        !trial.visibilityLost &&
        trial.responseTimeMs !== null,
    )
    .map((trial) => trial.responseTimeMs as number)

  if (rts.length === 0) return null
  const sum = rts.reduce((acc, rt) => acc + rt, 0)
  return round1(sum / rts.length)
}

function summarize(trials: readonly ScoredTrial[]): ScoreSummary {
  const totalTrials = trials.length
  const totalCorrect = trials.filter((t) => t.isCorrect && !t.timedOut).length
  const totalOmissions = trials.filter((t) => t.timedOut).length
  const totalErrors = trials.filter(
    (t) => !t.timedOut && !t.isCorrect,
  ).length

  const meanRtCongruentMs = meanRt(trials, 'congruent')
  const meanRtIncongruentMs = meanRt(trials, 'incongruent')
  const meanRtNeutralMs = meanRt(trials, 'neutral')

  const stroopInterferenceEffectMs =
    meanRtIncongruentMs !== null && meanRtCongruentMs !== null
      ? round1(meanRtIncongruentMs - meanRtCongruentMs)
      : null

  const interferenceVsNeutralMs =
    meanRtIncongruentMs !== null && meanRtNeutralMs !== null
      ? round1(meanRtIncongruentMs - meanRtNeutralMs)
      : null

  const facilitationVsNeutralMs =
    meanRtNeutralMs !== null && meanRtCongruentMs !== null
      ? round1(meanRtNeutralMs - meanRtCongruentMs)
      : null

  return {
    totalTrials,
    totalCorrect,
    totalErrors,
    totalOmissions,
    meanRtCongruentMs,
    meanRtIncongruentMs,
    meanRtNeutralMs,
    stroopInterferenceEffectMs,
    interferenceVsNeutralMs,
    facilitationVsNeutralMs,
  }
}

/**
 * Session summary per telemetry.md.
 * Practice never enters totals or means (DD-06).
 * SIE is Stroop-only (TODO(GDD-15.19)).
 */
export function computeSessionSummary(trials: readonly ScoredTrial[]): {
  overall: ScoreSummary
  byBlock: Partial<Record<BlockId, ScoreSummary>>
} {
  const scoringTrials = trials.filter((trial) => trial.block !== 'practice')

  const byBlock: Partial<Record<BlockId, ScoreSummary>> = {}
  for (const blockId of ['baseline', 'stroop'] as const) {
    const blockTrials = scoringTrials.filter((trial) => trial.block === blockId)
    if (blockTrials.length > 0) {
      byBlock[blockId] = summarize(blockTrials)
    }
  }

  const overall = summarize(scoringTrials)

  // TODO(GDD-15.19): SIE only on the Stroop block until the research team decides.
  const stroop = byBlock.stroop
  overall.stroopInterferenceEffectMs =
    stroop?.stroopInterferenceEffectMs ?? null
  overall.interferenceVsNeutralMs = stroop?.interferenceVsNeutralMs ?? null
  overall.facilitationVsNeutralMs = stroop?.facilitationVsNeutralMs ?? null

  return { overall, byBlock }
}
