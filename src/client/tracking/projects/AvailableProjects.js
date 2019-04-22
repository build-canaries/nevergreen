import React, {useMemo, useRef, useState} from 'react'
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
import {SecondaryButton} from '../../common/forms/Button'
import {iCheckboxChecked, iCheckboxUnchecked} from '../../common/fonts/Icons'

export function AvailableProjects({projects, index, selected, trayId, timestamp, errors, selectProject, refreshTray}) {
  const [filter, setFilter] = useState(null)
  const [filterErrors, setFilterErrors] = useState(null)
  const rootNode = useRef(null)

  const includeAll = (projects) => () => {
    projects
      .filter((project) => !project.removed)
      .forEach((project) => selectProject(trayId, project.projectId, true))
  }

  const excludeAll = (projects) => () => {
    projects.forEach((project) => selectProject(trayId, project.projectId, false))
  }

  const updateFilter = (evt) => {
    if (isBlank(evt.target.value)) {
      setFilter(null)
      setFilterErrors(null)
    } else {
      try {
        const regEx = new RegExp(evt.target.value)
        setFilter(regEx)
        setFilterErrors(null)
      } catch (e) {
        setFilterErrors([`Project filter not applied, ${e.message}`])
      }
    }
  }

  const scrollToTop = () => {
    if (rootNode.current) {
      rootNode.current.scrollIntoView()
    }
  }

  const filteredProjects = useMemo(() => {
    if (filter) {
      return projects.filter((project) => `${project.name} ${project.stage || ''}`.match(filter))
    }
    return projects
  }, [projects, filter])

  const hasProjects = notEmpty(projects)
  const hasProjectsFiltered = notEmpty(filteredProjects)

  const controls = (
    <div className={styles.controls}>
      <fieldset className={styles.toggles}>
        <legend className={styles.legend}>Available projects</legend>
        <SecondaryButton className={styles.includeAll}
                         onClick={includeAll(filteredProjects)}
                         data-locator='include-all'
                         icon={iCheckboxChecked}>
          include all
          <Shortcut hotkeys={[`+ ${index}`, `= ${index}`]}/>
        </SecondaryButton>
        <SecondaryButton className={styles.excludeAll}
                         onClick={excludeAll(filteredProjects)}
                         data-locator='exclude-all'
                         icon={iCheckboxUnchecked}>
          exclude all
          <Shortcut hotkeys={[`- ${index}`]}/>
        </SecondaryButton>
        <div className={styles.projectFilter}>
          <Input className={styles.projectFilterInput}
                 onChange={updateFilter}
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
                     onClick={scrollToTop}>
      back to top
    </SecondaryButton>
  )

  return (
    <section className={styles.availableProjects}
             data-locator='available-projects'
             ref={rootNode}>
      <VisuallyHidden data-locator='title'><h3>Available projects</h3></VisuallyHidden>
      <Refresh index={index}
               timestamp={timestamp}
               refreshTray={() => refreshTray(trayId)}/>
      <Messages type='error' messages={errors} data-locator='errors'/>
      {!errors && hasProjects && controls}
      {!errors && hasProjectsFiltered && buildItems}
      {!errors && !hasProjects && noProjectsWarning}
      {!errors && hasProjects && !hasProjectsFiltered && noProjectsMatchFilterWarning}
      {!errors && hasProjectsFiltered && backToTop}
    </section>
  )
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
