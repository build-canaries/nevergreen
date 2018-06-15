import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ScaledGrid from '../common/scale/ScaledGrid'
import InterestingProject from '../common/project/InterestingProject'
import styles from './interesting-projects.scss'
import {isBlank} from '../common/Utils'
import {
  isSick,
  PROGNOSIS_HEALTHY_BUILDING,
  PROGNOSIS_SICK,
  PROGNOSIS_SICK_BUILDING,
  PROGNOSIS_UNKNOWN
} from '../domain/Project'
import ProjectSummary from '../common/project/ProjectSummary'
import ProjectError from '../common/project/ProjectError'

class InterestingProjects extends Component {

  constructor(props) {
    super(props)
    this.sfxNode = React.createRef()
  }

  componentWillUnmount() {
    if (this.sfxNode.current) {
      this.sfxNode.current.pause()
    }
  }

  render() {
    const numberOfErrors = _.size(this.props.errors)
    const totalItems = numberOfErrors + _.size(this.props.projects)
    const showSummary = totalItems > this.props.maxProjectsToShow
    const maxProjectsToShow = _.clamp(this.props.maxProjectsToShow - numberOfErrors, 1, this.props.maxProjectsToShow) - 1

    const errorsToShow = showSummary
      ? _.take(this.props.errors, this.props.maxProjectsToShow - 1)
      : this.props.errors

    const projectsToShow = showSummary
      ? _.take(this.props.projects, maxProjectsToShow)
      : this.props.projects

    const brokenProject = _.reduce(this.props.projects, (previous, project) => previous || isSick(project.prognosis), false)
    const playBrokenSfx = this.props.playBrokenBuildSounds && (brokenProject || numberOfErrors > 0)

    const brokenSfx = playBrokenSfx && !isBlank(this.props.brokenBuildFx) &&
      <audio ref={this.sfxNode} src={this.props.brokenBuildFx} autoPlay/>

    const errors = _.map(errorsToShow, (error) => {
      return <ProjectError key={error} error={error}/>
    })

    const projects = _.map(projectsToShow, (project) => {
      const tray = this.props.trays.find((tray) => tray.trayId === project.trayId)
      return <InterestingProject {...project}
                                 trayName={tray.name}
                                 key={`${tray.trayId}#${project.projectId}`}
                                 showBuildTimers={this.props.showBuildTimers}
                                 showBrokenBuildTimers={this.props.showBrokenBuildTimers}
                                 showTrayName={this.props.showTrayName}
                                 showBuildLabel={this.props.showBuildLabel}/>
    })

    const summary = showSummary ? ([
      <ProjectSummary key='summary' additionalProjectsCount={totalItems - maxProjectsToShow}/>
    ]) : []

    return (
      <div className={styles.interestingProjects}
           data-locator='interesting-projects'
           aria-live='assertive'
           aria-relevant='additions removals'>
        <ScaledGrid>{_.concat(errors, projects, summary)}</ScaledGrid>
        {brokenSfx}
      </div>
    )
  }
}

InterestingProjects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    projectId: PropTypes.string.isRequired,
    trayId: PropTypes.string.isRequired,
    prognosis: PropTypes.oneOf([
      PROGNOSIS_SICK,
      PROGNOSIS_HEALTHY_BUILDING,
      PROGNOSIS_SICK_BUILDING,
      PROGNOSIS_UNKNOWN
    ]).isRequired
  })),
  trays: PropTypes.arrayOf(PropTypes.shape({
    trayId: PropTypes.string.isRequired,
    name: PropTypes.string
  })).isRequired,
  showBuildTimers: PropTypes.bool,
  showBrokenBuildTimers: PropTypes.bool,
  showTrayName: PropTypes.bool,
  playBrokenBuildSounds: PropTypes.bool,
  brokenBuildFx: PropTypes.string,
  showBuildLabel: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  maxProjectsToShow: PropTypes.number.isRequired
}

export default InterestingProjects
