import React, {useCallback, useEffect} from 'react'
import cn from 'classnames'
import {InterestingProjects} from './InterestingProjects'
import {Success} from './Success'
import {SuccessMessage} from '../common/SuccessMessage'
import {Loading} from '../common/Loading'
import styles from './monitor.scss'
import {isEmpty} from 'lodash'
import {Title} from '../common/Title'
import {useTimer} from '../common/TimerHook'
import {useDispatch, useSelector} from 'react-redux'
import {getFullScreen} from '../NevergreenReducer'
import {requestFullScreen} from '../NevergreenActionCreators'
import {getRefreshTime} from '../settings/SettingsReducer'
import {getTrays} from '../tracking/TraysReducer'
import {abortPendingRequest} from '../NevergreenThunkActionCreators'
import {
  getInterestingErrors,
  getInterestingLoaded,
  getInterestingProjects,
  INTERESTING_ROOT
} from './InterestingReducer'
import {fetchInteresting} from './MonitorThunkActionCreators'

export function GettingStartedHelp() {
  return <SuccessMessage message='Add a CI server via the tracking page to start monitoring'/>
}

export function Monitor() {
  const dispatch = useDispatch()
  const isFullScreen = useSelector(getFullScreen)
  const refreshTime = useSelector(getRefreshTime)
  const trays = useSelector(getTrays)
  const projects = useSelector(getInterestingProjects)
  const errors = useSelector(getInterestingErrors)
  const loaded = useSelector(getInterestingLoaded)

  useEffect(() => {
    dispatch(requestFullScreen(true))
    return () => {
      dispatch(requestFullScreen(false))
    }
  }, [])

  useEffect(() => {
    return () => {
      dispatch(abortPendingRequest(INTERESTING_ROOT))
    }
  }, [])

  const onTrigger = useCallback(() => dispatch(fetchInteresting()), [])

  useTimer(onTrigger, refreshTime)

  const traysAdded = !isEmpty(trays)
  const noProjects = isEmpty(projects)
  const noErrors = isEmpty(errors)
  const success = noProjects && noErrors

  const monitorClassNames = cn(styles.monitor, {
    [styles.fullscreen]: isFullScreen
  })

  return (
    <div className={monitorClassNames}>
      <Title>Monitor</Title>
      <Loading loaded={loaded}>
        {!traysAdded && <GettingStartedHelp/>}
        {traysAdded && success && <Success/>}
        {traysAdded && !success && <InterestingProjects/>}
      </Loading>
    </div>
  )
}
