import { useState } from 'react'
import { useWindowResized } from './ResizableHook'

export function useAspectRatio(): string {
  const [aspectRatio, setAspectRatio] = useState(
    `${window.innerWidth.toString()} / ${window.innerHeight.toString()}`,
  )

  useWindowResized(() => {
    setAspectRatio(
      `${window.innerWidth.toString()} / ${window.innerHeight.toString()}`,
    )
  })

  return aspectRatio
}
