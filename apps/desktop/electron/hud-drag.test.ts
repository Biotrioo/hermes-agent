import { describe, expect, it } from 'vitest'

import { createHudDragTracker } from './hud-drag'

describe('createHudDragTracker', () => {
  it('keeps movement in native screen coordinates across a display-scale transition', () => {
    const tracker = createHudDragTracker()

    tracker.begin({ x: 1900, y: 400 })
    expect(tracker.move({ x: 1920, y: 400 })).toEqual({ x: 20, y: 0 })

    // The next point is sampled by Electron after the cursor has crossed to a
    // display with a different scale factor; no renderer CSS conversion is
    // involved in this delta.
    expect(tracker.move({ x: 1940, y: 400 })).toEqual({ x: 20, y: 0 })
  })

  it('does not leak movement into the next drag after ending', () => {
    const tracker = createHudDragTracker()

    expect(tracker.move({ x: 10, y: 20 })).toBeNull()
    tracker.begin({ x: 10, y: 20 })
    expect(tracker.move({ x: 15, y: 27 })).toEqual({ x: 5, y: 7 })

    tracker.end()

    expect(tracker.move({ x: 50, y: 60 })).toBeNull()
  })
})
