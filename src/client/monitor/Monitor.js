import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {InterestingProjects} from './InterestingProjects'
import {Success} from './Success'
import {SuccessMessage} from '../common/SuccessMessage'
import {Loading} from '../common/Loading'
import styles from './monitor.scss'
import _ from 'lodash'
import {Title} from '../common/Title'
import {abortPendingRequest} from '../gateways/Gateway'
import {useTimer} from '../common/TimerHook'

export function GettingStartedHelp() {
  return <SuccessMessage message='Add a CI server via the tracking page to start monitoring'/>
}

export function Monitor(props) {
  const {isFullScreen, projects, errors, messages, fetchInteresting, refreshTime, loaded, trays, requestFullScreen, pendingRequest} = props

  useEffect(() => {
    requestFullScreen(true)
    return () => {
      requestFullScreen(false)
    }
  }, [])

  // TODO: this shouldn't be done here
  useEffect(() => {
    return () => {
      abortPendingRequest(pendingRequest)
    }
  }, [])

  useTimer(fetchInteresting, refreshTime)

  const traysAdded = !_.isEmpty(trays)
  const noProjects = _.isEmpty(projects)
  const noErrors = _.isEmpty(errors)
  const success = noProjects && noErrors

  const monitorClassNames = classNames(styles.monitor, {
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

Monitor.propTypes = {
  loaded: PropTypes.bool.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  trays: PropTypes.arrayOf(PropTypes.object).isRequired,
  projects: PropTypes.arrayOf(PropTypes.object),
  showBuildTimers: PropTypes.bool,
  showBrokenBuildTimers: PropTypes.bool,
  showTrayName: PropTypes.bool,
  showBrokenBuildLabel: PropTypes.bool,
  playBrokenBuildSounds: PropTypes.bool,
  brokenBuildFx: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchInteresting: PropTypes.func.isRequired,
  refreshTime: PropTypes.number.isRequired,
  requestFullScreen: PropTypes.func.isRequired,
  isFullScreen: PropTypes.bool,
  pendingRequest: PropTypes.object
}
