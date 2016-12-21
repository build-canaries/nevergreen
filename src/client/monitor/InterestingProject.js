import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import _ from 'lodash'
import './interesting-project.scss'

class InterestingProject extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const isSick = this.props.prognosis === 'sick'
    const timeBrokenLabel = _.isEmpty(_.trim(this.props.lastBuildTime)) ? '??' : moment(this.props.lastBuildTime).fromNow(true)
    const timeBroken = this.props.showBrokenBuildTimers && isSick ?
      <span className='time-broken'> {timeBrokenLabel}</span> : null
    const displayName = this.props.stage ? `${this.props.name} ${this.props.stage}` : this.props.name
    const display = this.props.showTrayName && this.props.trayName ? `${this.props.trayName.toLowerCase()} ${displayName}` : displayName

    return (
      <li className={`interesting-project ${this.props.prognosis}`} data-locator='interesting-project'>
        <div className='monitor-outer-container'>
          <div className='monitor-inner-container'>
            <span className='monitor-project-name'>{display}</span>
            {timeBroken}
          </div>
        </div>
      </li>
    )
  }
}

InterestingProject.propTypes = {
  prognosis: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  stage: PropTypes.string,
  trayName: PropTypes.string,
  lastBuildTime: PropTypes.string,
  showBrokenBuildTimers: PropTypes.bool,
  showTrayName: PropTypes.bool
}

export default InterestingProject
