import { useEffect, useState } from 'react'
import { calcAPCA } from 'apca-w3'

interface ContrastCheckerHookResponse {
  readonly lightnessContrast: number
  readonly isLowContrast: boolean
}

export function useAPCA(
  textColour: string,
  backgroundColour: string,
): ContrastCheckerHookResponse {
  const [lightnessContrast, setLightnessContrast] = useState(0)

  useEffect(() => {
    const lc = calcAPCA(textColour, backgroundColour) as number
    setLightnessContrast(Math.abs(lc))
  }, [textColour, backgroundColour])

  return { lightnessContrast, isLowContrast: lightnessContrast < 60 }
}
