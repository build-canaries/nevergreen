import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import _ from 'lodash'

class InterestingProject extends Component {
  constructor(props) {
    super(props)
  }

  _brokenBuildTimer() {
    if (this.props.showBrokenBuildTimers && this.props.prognosis === 'sick') {
      const time = _.isEmpty(_.trim(this.props.lastBuildTime)) ? '??' : moment(this.props.lastBuildTime).fromNow(true)
      return <span className='monitor-time-broken'> {time}</span>
    }
  }

  _brokenBuildAudio() {
    if (this.props.playBrokenBuildSounds && this.props.prognosis === 'sick') {
      return <audio src={this.props.brokenBuildFx} autoPlay/>
    }
  }

  render() {
    return (
      <li className={'monitor-project monitor-' + this.props.prognosis}>
        <div className='monitor-outer-container'>
          <div className='monitor-inner-container'>
            <span className='monitor-project-name'>{this.props.name}</span>
            {this._brokenBuildTimer()}
            {this._brokenBuildAudio()}
          </div>
        </div>
      </li>
    )
  }
}

InterestingProject.propTypes = {
  prognosis: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lastBuildTime: PropTypes.string.isRequired,
  showBrokenBuildTimers: PropTypes.bool.isRequired,
  playBrokenBuildSounds: PropTypes.bool.isRequired,
  brokenBuildFx: PropTypes.string.isRequired
}

export default InterestingProject
