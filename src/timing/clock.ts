/** Monotonic clock in ms. Always prefer this over `Date.now()` for RT (timing.md). */
export type Clock = () => number

let installed: Clock | null = null

/** Current time; injectable in tests via `installClock`. */
export function now(): number {
  return (installed ?? defaultClock)()
}

function defaultClock(): number {
  return performance.now()
}

/** Replace the clock for tests (`vi.useFakeTimers` + a controllable `now`). */
export function installClock(clock: Clock): void {
  installed = clock
}

export function uninstallClock(): void {
  installed = null
}
