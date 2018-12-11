import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {AvailableProject} from './AvailableProject'
import {Messages} from '../../common/Messages'
import {Input} from '../../common/forms/Input'
import {Shortcut} from '../../common/Shortcut'
import {Refresh} from './Refresh'
import {isBlank, notEmpty} from '../../common/Utils'
import {VisuallyHidden} from '../../common/VisuallyHidden'
import styles from './available-projects.scss'
import memoize from 'memoize-one'
import {SecondaryButton} from '../../common/forms/Button'

const DEFAULT_STATE = {
  filter: null,
  filterErrors: null
}

export class AvailableProjects extends Component {

  constructor(props) {
    super(props)
    this.state = {...DEFAULT_STATE}
    this.rootNode = React.createRef()
  }

  includeAll = (projects) => () => {
    projects
      .filter((project) => !project.removed)
      .forEach((project) => this.props.selectProject(this.props.trayId, project.projectId, true))
  }

  excludeAll = (projects) => () => {
    projects
      .forEach((project) => this.props.selectProject(this.props.trayId, project.projectId, false))
  }

  updateFilter = (evt) => {
    if (isBlank(evt.target.value)) {
      this.setState({...DEFAULT_STATE})
    } else {
      try {
        const regEx = new RegExp(evt.target.value)
        this.setState({
          filter: regEx,
          filterErrors: null
        })
      } catch (e) {
        this.setState({filterErrors: [`Project filter not applied, ${e.message}`]})
      }
    }
  }

  scrollToTop = () => {
    if (this.rootNode.current) {
      this.rootNode.current.scrollIntoView()
    }
  }

  refreshTray = () => {
    this.props.refreshTray(this.props.trayId)
  }

  filteredProjects = memoize(
    (projects, filter) => {
      return projects.filter((project) => {
        return filter
          ? `${project.name} ${project.stage || ''}`.match(filter)
          : true
      })
    }
  )

  render() {
    const {projects, index, selected, trayId, timestamp, errors, selectProject} = this.props
    const {filter, filterErrors} = this.state

    const filteredProjects = this.filteredProjects(projects, filter)

    const hasProjects = notEmpty(projects)
    const hasProjectsFiltered = notEmpty(filteredProjects)

    const controls = (
      <div className={styles.controls}>
        <fieldset className={styles.toggles}>
          <legend className={styles.legend}>Available projects</legend>
          <SecondaryButton className={styles.includeAll}
                           onClick={this.includeAll(filteredProjects)}
                           data-locator='include-all'
                           icon='checkbox-checked'>
            include all
            <Shortcut hotkeys={[`+ ${index}`, `= ${index}`]}/>
          </SecondaryButton>
          <SecondaryButton className={styles.excludeAll}
                           onClick={this.excludeAll(filteredProjects)}
                           data-locator='exclude-all'
                           icon='checkbox-unchecked'>
            exclude all
            <Shortcut hotkeys={[`- ${index}`]}/>
          </SecondaryButton>
          <div className={styles.projectFilter}>
            <Input className={styles.projectFilterInput}
                   onChange={this.updateFilter}
                   placeholder='regular expression'
                   data-locator='filter'>
              filter
            </Input>
          </div>
        </fieldset>
        <Messages type='error' messages={filterErrors} data-locator='invalid-filter'/>
      </div>
    )

    const buildItems = (
      <ol className={styles.buildItems}
          aria-live='polite'
          aria-relevant='additions'
          data-locator='available-projects-list'>
        {
          _.sortBy(filteredProjects, ['name', 'stage']).map((project) => {
            const isSelected = selected.includes(project.projectId)

            return <AvailableProject key={project.projectId}
                                     {...project}
                                     selected={isSelected}
                                     selectProject={() => selectProject(trayId, project.projectId, !isSelected)}/>
          })
        }
      </ol>
    )

    const noProjectsWarning = (
      <Messages type='warning'
                messages={['No projects fetched, please refresh']}
                data-locator='no-projects-warning'/>
    )

    const noProjectsMatchFilterWarning = (
      <Messages type='warning'
                messages={['No matching projects, please update your filter']}
                data-locator='filter-warning'/>
    )

    const backToTop = (
      <SecondaryButton className={styles.backToTop}
                       onClick={this.scrollToTop}>
        back to top
      </SecondaryButton>
    )

    return (
      <section className={styles.availableProjects}
               data-locator='available-projects'
               ref={this.rootNode}>
        <VisuallyHidden data-locator='title'><h3>Available projects</h3></VisuallyHidden>
        <Refresh index={index}
                 timestamp={timestamp}
                 refreshTray={this.refreshTray}/>
        <Messages type='error' messages={errors} data-locator='errors'/>
        {!errors && hasProjects && controls}
        {!errors && hasProjectsFiltered && buildItems}
        {!errors && !hasProjects && noProjectsWarning}
        {!errors && hasProjects && !hasProjectsFiltered && noProjectsMatchFilterWarning}
        {!errors && hasProjectsFiltered && backToTop}
      </section>
    )
  }
}

AvailableProjects.propTypes = {
  trayId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
  url: PropTypes.string.isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  serverType: PropTypes.string,
  projects: PropTypes.arrayOf(PropTypes.shape({
    projectId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    stage: PropTypes.string
  })).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectProject: PropTypes.func.isRequired,
  timestamp: PropTypes.string,
  refreshTray: PropTypes.func.isRequired
}
