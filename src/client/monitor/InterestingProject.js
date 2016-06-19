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

    return (
      <li className={`interesting-project ${this.props.prognosis}`}>
        <div className='monitor-outer-container'>
          <div className='monitor-inner-container'>
            <span className='monitor-project-name'>{this.props.name}</span>
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
  lastBuildTime: PropTypes.string.isRequired,
  showBrokenBuildTimers: PropTypes.bool
}

export default InterestingProject
