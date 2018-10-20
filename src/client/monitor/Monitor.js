import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import InterestingProjects from './InterestingProjects'
import Success from './Success'
import Loading from '../common/loading/Loading'
import styles from './monitor.scss'
import Timer from '../common/Timer'
import _ from 'lodash'
import Title from '../common/Title'
import {abortPendingRequest} from '../common/gateways/Gateway'

class Monitor extends Component {
  componentDidMount() {
    this.props.requestFullScreen(true)
  }

  componentWillUnmount() {
    this.props.requestFullScreen(false)
    abortPendingRequest(this.props.pendingRequest)
  }

  render() {
    const monitorClassNames = classNames(styles.monitor, {
      [styles.fullscreen]: this.props.isFullScreen
    })

    let content

    if (_.isEmpty(this.props.projects) && _.isEmpty(this.props.errors)) {
      content = <Success messages={this.props.messages}/>
    } else {
      content = <InterestingProjects {...this.props}/>
    }

    return (
      <div className={monitorClassNames}>
        <Title>Monitor</Title>
        <Timer onTrigger={this.props.fetchInteresting} interval={this.props.refreshTime}/>
        <Loading loaded={this.props.loaded}>
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

export default Monitor
