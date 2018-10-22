import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {ScaledGrid} from '../common/scale/ScaledGrid'
import {InterestingProject} from '../common/project/InterestingProject'
import {isBlank} from '../common/Utils'
import {
  isSick,
  PROGNOSIS_HEALTHY_BUILDING,
  PROGNOSIS_SICK,
  PROGNOSIS_SICK_BUILDING,
  PROGNOSIS_UNKNOWN
} from '../domain/Project'
import {ProjectSummary} from '../common/project/ProjectSummary'
import {ProjectError} from '../common/project/ProjectError'
import styles from './interesting-projects.scss'

export class InterestingProjects extends Component {

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
    const {errors, projects, maxProjectsToShow, playBrokenBuildSounds, brokenBuildFx, trays} = this.props

    const numberOfErrors = _.size(errors)
    const totalItems = numberOfErrors + _.size(projects)
    const showSummary = totalItems > maxProjectsToShow
    const maxProjectsToShowClamped = _.clamp(maxProjectsToShow - numberOfErrors, 1, maxProjectsToShow) - 1

    const errorsToShow = showSummary
      ? _.take(errors, maxProjectsToShow - 1)
      : errors

    const projectsToShow = showSummary
      ? _.take(projects, maxProjectsToShowClamped)
      : projects

    const projectIsBroken = _.reduce(projects, (previous, project) => previous || isSick(project.prognosis), false)
    const playBrokenSfx = playBrokenBuildSounds && (projectIsBroken || numberOfErrors > 0)

    const brokenSfx = playBrokenSfx && !isBlank(brokenBuildFx) &&
      <audio ref={this.sfxNode} src={brokenBuildFx} autoPlay/>

    const errorComponents = _.map(errorsToShow, (error) => {
      return <ProjectError key={error} error={error}/>
    })

    const projectComponents = _.map(projectsToShow, (project) => {
      const tray = trays.find((tray) => tray.trayId === project.trayId)
      return <InterestingProject trayName={tray.name}
                                 key={`${tray.trayId}#${project.projectId}`}
                                 showBuildTimers={this.props.showBuildTimers}
                                 showBrokenBuildTimers={this.props.showBrokenBuildTimers}
                                 showTrayName={this.props.showTrayName}
                                 showBuildLabel={this.props.showBuildLabel}
                                 prognosis={project.prognosis}
                                 name={project.name}
                                 stage={project.stage}
                                 lastBuildTime={project.lastBuildTime}
                                 lastBuildLabel={project.lastBuildLabel}
                                 thisBuildTime={project.thisBuildTime}/>
    })

    const summary = showSummary ? ([
      <ProjectSummary key='summary' additionalProjectsCount={totalItems - maxProjectsToShowClamped}/>
    ]) : []

    return (
      <div className={styles.interestingProjects}
           data-locator='interesting-projects'
           aria-live='assertive'
           aria-relevant='additions removals'>
        <ScaledGrid>{_.concat(errorComponents, projectComponents, summary)}</ScaledGrid>
        {brokenSfx}
      </div>
    )
  }
}

InterestingProjects.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.shape({
    projectId: PropTypes.string.isRequired,
    trayId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    stage: PropTypes.string,
    lastBuildTime: PropTypes.string,
    lastBuildLabel: PropTypes.string,
    thisBuildTime: PropTypes.string,
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
