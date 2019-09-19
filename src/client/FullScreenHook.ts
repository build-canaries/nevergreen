import {useLayoutEffect, useRef} from 'react'
import {throttle} from 'lodash'
import {useDispatch, useSelector} from 'react-redux'
import {getFullScreen, getFullScreenRequested} from './NevergreenReducer'
import {enableFullScreen} from './NevergreenActionCreators'

type DisabledFullScreen = () => void

const ONE_SECOND = 1000
const THREE_SECONDS = 3 * 1000

export function useFullScreen(loading: boolean): DisabledFullScreen {
  const dispatch = useDispatch()
  const fullScreenTimer = useRef(0)
  const fullScreen = useSelector(getFullScreen)
  const fullScreenRequested = useSelector(getFullScreenRequested)

  const disableFullScreen = throttle(() => {
    clearTimeout(fullScreenTimer.current)

    if (fullScreen) {
      dispatch(enableFullScreen(false))
    }

    if (fullScreenRequested) {
      fullScreenTimer.current = window.setTimeout(
        () => dispatch(enableFullScreen(true)),
        THREE_SECONDS)
    }
  }, ONE_SECOND, {trailing: false})

  useLayoutEffect(() => {
    if (!loading) {
      dispatch(enableFullScreen(fullScreenRequested))
      if (!fullScreenRequested) {
        clearTimeout(fullScreenTimer.current)
      }
    }
  }, [loading, fullScreenRequested, dispatch])

  return disableFullScreen
}
