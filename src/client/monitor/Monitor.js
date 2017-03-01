import React, {Component, PropTypes} from 'react'
import classNames from 'classnames'
import InterestingProjects from './InterestingProjects'
import Success from './Success'
import Loading from '../common/loading/Loading'
import Messages from '../common/messages/Messages'
import './monitor.scss'
import Timer from '../common/Timer'

class Monitor extends Component {
  componentDidMount() {
    this.props.requestFullScreen(true)
  }

  componentWillUnmount() {
    this.props.requestFullScreen(false)
  }

  render() {
    const fetch = () => this.props.fetchInteresting(this.props.trays, this.props.selected)
    const monitorClassNames = classNames('monitor', {fullscreen: this.props.isFullScreen})

    let content

    if (this.props.errors) {
      content = <Messages type='error' messages={this.props.errors}/>
    } else if (this.props.projects.length > 0) {
      content = <InterestingProjects {...this.props}/>
    } else {
      content = <Success messages={this.props.messages}/>
    }

    return (
      <div className={monitorClassNames}>
        <Timer onTrigger={fetch} interval={this.props.refreshTime}/>
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
  selected: PropTypes.object.isRequired,
  projects: PropTypes.arrayOf(PropTypes.object).isRequired,
  showBrokenBuildTimers: PropTypes.bool,
  showTrayName: PropTypes.bool,
  playBrokenBuildSounds: PropTypes.bool,
  brokenBuildFx: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string).isRequired,
  fetchInteresting: PropTypes.func.isRequired,
  refreshTime: PropTypes.number.isRequired,
  requestFullScreen: PropTypes.func.isRequired,
  isFullScreen: PropTypes.bool
}

export default Monitor
