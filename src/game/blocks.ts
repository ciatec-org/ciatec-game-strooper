import type { BlockConfig } from './types'

// Session order is this array (DD-02). Counterbalancing is pending (GDD §15.2, item 6).
export const BLOCKS = [
  {
    id: 'practice',
    // TODO(GDD-15.4): provisional practice size and mix until the research team decides.
    // TODO(GDD-15.7): provisional practice feedback on and scores off (DD-06).
    counts: { congruent: 4, incongruent: 4, neutral: 4 },
    feedback: true,
    scores: false,
  },
  {
    id: 'baseline',
    // TODO(GDD-15.4): provisional baseline size and mix until the research team decides.
    // TODO(GDD-15.9): provisional feedback on all blocks (see behaviors.md).
    counts: { congruent: 20, incongruent: 0, neutral: 20 },
    feedback: true,
    scores: true,
  },
  {
    id: 'stroop',
    // TODO(GDD-15.4): provisional stroop size until the research team decides.
    // TODO(GDD-15.5): provisional 0 neutrals in stroop; BlockConfig still accepts neutrals.
    // TODO(GDD-15.9): provisional feedback on all blocks (see behaviors.md).
    counts: { congruent: 10, incongruent: 30, neutral: 0 },
    feedback: true,
    scores: true,
  },
] as const satisfies readonly BlockConfig[]
