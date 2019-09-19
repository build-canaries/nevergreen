import {useCallback} from 'react'
import version from '../../resources/version.txt'
import {useTimer} from './common/TimerHook'
import {useDispatch} from 'react-redux'
import {checkForNewVersion} from './notification/NotificationThunkActionCreators'

const TWENTY_FOUR_HOURS = 24 * 60 * 60

export function useCheckForNewVersion(loading: boolean) {
  const dispatch = useDispatch()

  const checkVersion = useCallback(() => {
    !loading && dispatch(checkForNewVersion(version, window.location.hostname))
  }, [loading, dispatch])

  useTimer(checkVersion, TWENTY_FOUR_HOURS)
}
