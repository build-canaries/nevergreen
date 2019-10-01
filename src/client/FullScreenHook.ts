import {useCallback, useLayoutEffect, useRef, useState} from 'react'
import {throttle} from 'lodash'

type FullScreen = [
  boolean,
  (fullScreen: boolean) => void,
  () => void
]

const ONE_SECOND = 1000
const THREE_SECONDS = 3 * 1000

export function useFullScreen(): FullScreen {
  const fullScreenTimer = useRef(0)
  const [fullScreen, setFullScreen] = useState(false)
  const [fullScreenRequested, setFullScreenRequested] = useState(false)

  const disableFullScreen = useCallback(throttle(() => {
      clearTimeout(fullScreenTimer.current)

      if (fullScreen) {
        setFullScreen(false)
      }

      if (fullScreenRequested) {
        fullScreenTimer.current = window.setTimeout(
          () => setFullScreen(true),
          THREE_SECONDS)
      }
    }, ONE_SECOND, {trailing: false}),
    [fullScreen, fullScreenRequested])

  useLayoutEffect(() => {
    setFullScreen(fullScreenRequested)
    if (!fullScreenRequested) {
      clearTimeout(fullScreenTimer.current)
    }
  }, [fullScreenRequested])

  return [fullScreen, setFullScreenRequested, disableFullScreen]
}
