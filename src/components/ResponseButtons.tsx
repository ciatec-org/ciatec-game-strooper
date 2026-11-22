import { strings } from '../content/strings'
import { COLOR_ORDER, COLOR_WORDS } from '../game/colors'
import type { ColorId } from '../game/types'
import styles from './ResponseButtons.module.css'

export type ResponseButtonsProps = {
  /**
   * Called on pointerdown with the chosen color and the browser event
   * timestamp (same clock as performance.now). Never wire this to click.
   */
  onResponse: (color: ColorId, timeStamp: number) => void
}

/**
 * Fixed 2×2 response pad (RNF02). Order comes from game/colors.ts and must
 * not change during a session. Press feedback is visual only; the response
 * is taken on pointerdown (timing.md).
 */
export function ResponseButtons({ onResponse }: ResponseButtonsProps) {
  return (
    <div
      className={styles.root}
      role="group"
      aria-label={strings.responseButtons.groupLabel}
    >
      {COLOR_ORDER.map((color) => (
        <button
          key={color}
          type="button"
          className={styles.button}
          onPointerDown={(event) => {
            onResponse(color, event.timeStamp)
          }}
        >
          {COLOR_WORDS[color]}
        </button>
      ))}
    </div>
  )
}
