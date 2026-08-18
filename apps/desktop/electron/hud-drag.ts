export interface HudDragPoint {
  x: number
  y: number
}

export interface HudDragDelta {
  x: number
  y: number
}

export interface HudDragTracker {
  begin: (point: HudDragPoint) => void
  move: (point: HudDragPoint) => HudDragDelta | null
  end: () => void
}

/** Tracks movement in the native screen coordinate space used by Electron. */
export function createHudDragTracker(): HudDragTracker {
  let lastPoint: HudDragPoint | null = null

  return {
    begin(point) {
      lastPoint = point
    },
    move(point) {
      const previousPoint = lastPoint
      lastPoint = point

      if (!previousPoint) {
        return null
      }

      return {
        x: point.x - previousPoint.x,
        y: point.y - previousPoint.y
      }
    },
    end() {
      lastPoint = null
    }
  }
}
