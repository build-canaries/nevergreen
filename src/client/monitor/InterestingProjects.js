import React, {Component} from 'react'
import PropTypes from 'prop-types'
import reduce from 'lodash/reduce'
import map from 'lodash/map'
import concat from 'lodash/concat'
import isEmpty from 'lodash/isEmpty'
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
    const brokenProject = reduce(this.props.projects, (previous, project) => previous || project.prognosis === 'sick', false)
    const playBrokenSfx = this.props.playBrokenBuildSounds && (brokenProject || !isEmpty(this.props.errors))
    const brokenSfx = playBrokenSfx && this.props.brokenBuildFx ?
      <audio ref={(node) => this.sfx = node} src={this.props.brokenBuildFx} autoPlay/> : null

    const errors = map(this.props.errors, (error) => {
      return <div key={error} className={styles.error}>
        <div className={styles.inner}>{error}</div>
      </div>
    })

    const projects = map(this.props.projects, (project) => {
      const tray = this.props.trays.find((tray) => tray.trayId === project.trayId)
      return <InterestingProject {...project} trayName={tray.name} key={`${tray.trayId}#${project.projectId}`}
                                 showBrokenBuildTimers={this.props.showBrokenBuildTimers}
                                 showTrayName={this.props.showTrayName}
                                 showBuildLabel={this.props.showBuildLabel}/>
    })

    return (
      <span className={styles.interestingProjects} data-locator='interesting-projects'>
        <ScaledGrid>{concat(errors, projects)}</ScaledGrid>
        {brokenSfx}
      </span>
    )
  }
}

InterestingProjects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    projectId: PropTypes.string.isRequired,
    trayId: PropTypes.string.isRequired,
    prognosis: PropTypes.oneOf(['sick', 'healthy-building', 'sick-building', 'unknown']).isRequired
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
