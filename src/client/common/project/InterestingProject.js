import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import moment from 'moment'
import _ from 'lodash'
import './interesting-project.scss'

class InterestingProject extends Component {
  render() {
    const classes = classNames('interesting-project', this.props.prognosis)
    const isSick = this.props.prognosis === 'sick'

    const trayName = this.props.showTrayName && !_.isEmpty(_.trim(this.props.trayName)) ?
      <span data-locator='tray-name'>{this.props.trayName.toLowerCase()} </span> : null

    const stage = this.props.stage ? <span data-locator='project-stage'> {this.props.stage}</span> : null

    const timeBrokenLabel = _.isEmpty(_.trim(this.props.lastBuildTime)) ? '??' : moment(this.props.lastBuildTime).fromNow(true)
    const timeBroken = this.props.showBrokenBuildTimers && isSick ? <span className='time-broken'> {timeBrokenLabel}</span> : null
    const buildLabel = this.props.showBuildLabel && isSick && !_.isEmpty(_.trim(this.props.lastBuildLabel)) ?
      <span className='build-label'> #{this.props.lastBuildLabel}</span> : null

    return (
      <div className={classes} data-locator='interesting-project'>
        <div className='inner'>
          {trayName}
          <span data-locator='project-name'>{this.props.name}</span>
          {stage}
          {timeBroken}
          {buildLabel}
        </div>
      </div>
    )
  }
}

InterestingProject.propTypes = {
  prognosis: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  stage: PropTypes.string,
  trayName: PropTypes.string,
  lastBuildTime: PropTypes.string,
  lastBuildLabel: PropTypes.string,
  showBrokenBuildTimers: PropTypes.bool,
  showTrayName: PropTypes.bool,
  showBuildLabel: PropTypes.bool
}

export default InterestingProject
