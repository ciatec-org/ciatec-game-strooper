import type { BlockId, Condition, ResponseDevice } from '../game/types'
import type { ScoreSummary } from '../game/scoring'

/** JSON contract — snake_case field names are stable (schema_version 1). */
export const SCHEMA_VERSION = 1 as const

export interface SessionSettingsJson {
  colorblind_mode: boolean
  rng_seed: number
}

export interface ScoreSummaryJson {
  total_trials: number
  total_correct: number
  total_errors: number
  total_omissions: number
  mean_rt_congruent_ms: number | null
  mean_rt_incongruent_ms: number | null
  mean_rt_neutral_ms: number | null
  stroop_interference_effect_ms: number | null
  interference_vs_neutral_ms: number | null
  facilitation_vs_neutral_ms: number | null
  by_block?: Partial<Record<BlockId, ScoreSummaryJson>>
}

export interface TrialJson {
  trial_index: number
  block_type: Condition
  text_displayed: string
  color_displayed: string
  correct_response: string
  player_response: string | null
  is_correct: boolean
  response_time_ms: number | null
  timed_out: boolean
  block: BlockId
  condition: Condition
  index_in_block: number
  isi_ms: number
  stimulus_onset_ms: number
  response_at_ms: number | null
  response_device: ResponseDevice
  visibility_lost: boolean
}

export interface SessionJson {
  schema_version: typeof SCHEMA_VERSION
  session_id: string
  player_id: string
  timestamp: string
  app_version: string
  frame_interval_ms: number
  settings: SessionSettingsJson
  summary: ScoreSummaryJson
  trials: TrialJson[]
}

export function scoreSummaryToJson(
  summary: ScoreSummary,
  byBlock?: Partial<Record<BlockId, ScoreSummary>>,
): ScoreSummaryJson {
  const json: ScoreSummaryJson = {
    total_trials: summary.totalTrials,
    total_correct: summary.totalCorrect,
    total_errors: summary.totalErrors,
    total_omissions: summary.totalOmissions,
    mean_rt_congruent_ms: summary.meanRtCongruentMs,
    mean_rt_incongruent_ms: summary.meanRtIncongruentMs,
    mean_rt_neutral_ms: summary.meanRtNeutralMs,
    stroop_interference_effect_ms: summary.stroopInterferenceEffectMs,
    interference_vs_neutral_ms: summary.interferenceVsNeutralMs,
    facilitation_vs_neutral_ms: summary.facilitationVsNeutralMs,
  }

  if (byBlock) {
    const blocks: Partial<Record<BlockId, ScoreSummaryJson>> = {}
    for (const [blockId, blockSummary] of Object.entries(byBlock) as [
      BlockId,
      ScoreSummary,
    ][]) {
      blocks[blockId] = scoreSummaryToJson(blockSummary)
    }
    json.by_block = blocks
  }

  return json
}
