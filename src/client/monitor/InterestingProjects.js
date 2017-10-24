import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ScaledGrid from '../common/scale/ScaledGrid'
import InterestingProject from '../common/project/InterestingProject'
import styles from './interesting-projects.scss'

class InterestingProjects extends Component {
  componentWillUnmount() {
    if (this.sfx) {
      this.sfx.pause()
    }
  }

  render() {
    const brokenProject = _.reduce(this.props.projects, (previous, project) => previous || project.prognosis === 'sick', false)
    const playBrokenSfx = this.props.playBrokenBuildSounds && (brokenProject || !_.isEmpty(this.props.errors))
    const brokenSfx = playBrokenSfx && this.props.brokenBuildFx ?
      <audio ref={(node) => this.sfx = node} src={this.props.brokenBuildFx} autoPlay/> : null

    const errors = _.map(this.props.errors, (error) => {
      return <div key={error} className={styles.error}>
        <div className={styles.inner}>{error}</div>
      </div>
    })

    const projects = _.map(this.props.projects, (project) => {
      const tray = this.props.trays.find((tray) => tray.trayId === project.trayId)
      return <InterestingProject {...project} trayName={tray.name} key={`${tray.trayId}#${project.projectId}`}
                                 showBrokenBuildTimers={this.props.showBrokenBuildTimers}
                                 showTrayName={this.props.showTrayName}
                                 showBuildLabel={this.props.showBuildLabel}/>
    })

    return (
      <span className={styles.interestingProjects} data-locator='interesting-projects'>
        <ScaledGrid>{_.concat(errors, projects)}</ScaledGrid>
        {brokenSfx}
      </span>
    )
  }
}

InterestingProjects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    projectId: PropTypes.string.isRequired
  })),
  trays: PropTypes.arrayOf(PropTypes.shape({
    trayId: PropTypes.string.isRequired,
    name: PropTypes.string
  })).isRequired,
  showBrokenBuildTimers: PropTypes.bool,
  showTrayName: PropTypes.bool,
  playBrokenBuildSounds: PropTypes.bool,
  brokenBuildFx: PropTypes.string,
  showBuildLabel: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string)
}

export default InterestingProjects
