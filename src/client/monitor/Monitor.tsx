import React, {useEffect} from 'react'
import cn from 'classnames'
import {InterestingProjects, InterestingProjectsProps} from './InterestingProjects'
import {Success, SuccessProps} from './Success'
import {SuccessMessage} from '../common/SuccessMessage'
import {Loading} from '../common/Loading'
import styles from './monitor.scss'
import {isEmpty} from 'lodash'
import {Title} from '../common/Title'
import {useTimer} from '../common/TimerHook'
import {abortPendingRequest} from '../NevergreenThunkActionCreators'
import {INTERESTING_ROOT} from './InterestingReducer'

type MonitorProps = {
  loaded: boolean;
  fetchInteresting: () => void;
  refreshTime: number;
  requestFullScreen: (enabled: boolean) => void;
  isFullScreen: boolean;
  abortPendingRequest: (id: string) => void;
} & InterestingProjectsProps & SuccessProps

export function GettingStartedHelp() {
  return <SuccessMessage message='Add a CI server via the tracking page to start monitoring'/>
}

export function Monitor(props: MonitorProps) {
  const {isFullScreen, projects, errors, messages, fetchInteresting, refreshTime, loaded, trays, requestFullScreen} = props

  useEffect(() => {
    requestFullScreen(true)
    return () => {
      requestFullScreen(false)
    }
  }, [])

  useEffect(() => {
    return () => {
      abortPendingRequest(INTERESTING_ROOT)
    }
  }, [])

  useTimer(fetchInteresting, refreshTime)

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
        {traysAdded && success && <Success messages={messages}/>}
        {traysAdded && !success && <InterestingProjects {...props}/>}
      </Loading>
    </div>
  )
}
