import { useState } from 'react'
import { useWindowResized } from './ResizableHook'

export function useAspectRatio(): string {
  const [aspectRatio, setAspectRatio] = useState(
    `${window.innerWidth} / ${window.innerHeight}`,
  )

  useWindowResized(() =>
    setAspectRatio(`${window.innerWidth} / ${window.innerHeight}`),
  )

  return aspectRatio
}
