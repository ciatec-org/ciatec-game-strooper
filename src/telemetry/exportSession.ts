import { COLOR_WORDS } from '../game/colors'
import { computeSessionSummary } from '../game/scoring'
import { tokens } from '../theme/tokens'
import type { SessionRecorder } from './recorder'
import {
  SCHEMA_VERSION,
  scoreSummaryToJson,
  type SessionJson,
  type TrialJson,
} from './schema'

function inkHex(ink: keyof typeof tokens.color.ink): string {
  return tokens.color.ink[ink]
}

function toTrialJson(
  trial: ReturnType<SessionRecorder['getTrials']>[number],
): TrialJson {
  const { stimulus } = trial
  return {
    trial_index: trial.trialIndex,
    block_type: stimulus.condition,
    text_displayed: stimulus.word,
    color_displayed: inkHex(stimulus.inkColor),
    correct_response: COLOR_WORDS[stimulus.inkColor],
    player_response:
      trial.playerResponse === null
        ? null
        : COLOR_WORDS[trial.playerResponse],
    is_correct: trial.isCorrect,
    response_time_ms: trial.responseTimeMs,
    timed_out: trial.timedOut,
    block: trial.block,
    condition: stimulus.condition,
    index_in_block: trial.indexInBlock,
    isi_ms: trial.isiMs,
    stimulus_onset_ms: trial.stimulusOnsetMs,
    response_at_ms: trial.responseAtMs,
    response_device: trial.responseDevice,
    visibility_lost: trial.visibilityLost,
  }
}

/** Pure JSON builder — no DOM. */
export function buildSessionJson(recorder: SessionRecorder): SessionJson {
  const trials = recorder.getTrials()
  const { overall, byBlock } = computeSessionSummary(trials)
  const { meta } = recorder

  return {
    schema_version: SCHEMA_VERSION,
    session_id: meta.sessionId,
    player_id: meta.playerId,
    timestamp: meta.timestamp,
    app_version: meta.appVersion,
    frame_interval_ms: meta.frameIntervalMs,
    settings: {
      colorblind_mode: meta.colorblindMode,
      rng_seed: meta.rngSeed,
    },
    summary: scoreSummaryToJson(overall, byBlock),
    trials: trials.map(toTrialJson),
  }
}

/** Only DOM touch point for export (architecture.md). */
export function downloadSession(json: SessionJson): void {
  const shortId = json.session_id.slice(0, 8)
  const filename = `strooper_${json.player_id}_${shortId}.json`
  const blob = new Blob([JSON.stringify(json, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}
