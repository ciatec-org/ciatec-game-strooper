/**
 * Fires after the next paint that contains the committed stimulus.
 * Returns a cancel function (timers / rAF must not leak under StrictMode).
 *
 * `paintedAt` is the start of the frame that drew the stimulus (±1 frame).
 */
export function onNextPaint(callback: (paintedAt: number) => void): () => void {
  let second = 0
  const first = requestAnimationFrame((frameStart) => {
    // The frame that contains the committed stimulus starts now.
    second = requestAnimationFrame(() => {
      callback(frameStart)
    })
  })
  return () => {
    cancelAnimationFrame(first)
    cancelAnimationFrame(second)
  }
}
