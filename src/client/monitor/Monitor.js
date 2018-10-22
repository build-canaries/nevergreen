import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {InterestingProjects} from './InterestingProjects'
import {Success} from './Success'
import {Loading} from '../common/loading/Loading'
import styles from './monitor.scss'
import {Timer} from '../common/Timer'
import _ from 'lodash'
import {Title} from '../common/Title'
import {abortPendingRequest} from '../common/gateways/Gateway'

export class Monitor extends Component {

  componentDidMount() {
    this.props.requestFullScreen(true)
  }

  componentWillUnmount() {
    this.props.requestFullScreen(false)
    abortPendingRequest(this.props.pendingRequest)
  }

  render() {
    const {isFullScreen, projects, errors, messages, fetchInteresting, refreshTime, loaded} = this.props

    const noProjects = _.isEmpty(projects)
    const noErrors = _.isEmpty(errors)
    const success = noProjects && noErrors

    const monitorClassNames = classNames(styles.monitor, {
      [styles.fullscreen]: isFullScreen
    })

    const content = success
      ? <Success messages={messages}/>
      : <InterestingProjects {...this.props}/>

    return (
      <div className={monitorClassNames}>
        <Title>Monitor</Title>
        <Timer onTrigger={fetchInteresting} interval={refreshTime}/>
        <Loading loaded={loaded}>
          {content}
        </Loading>
      </div>
    )
  }
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
