import React, {ChangeEvent, useMemo, useRef, useState} from 'react'
import {isEmpty, sortBy} from 'lodash'
import {AvailableProject} from './AvailableProject'
import {Messages, MessagesType} from '../../common/Messages'
import {Input} from '../../common/forms/Input'
import {Shortcut} from '../../common/Shortcut'
import {Refresh} from './Refresh'
import {isBlank, notEmpty} from '../../common/Utils'
import {VisuallyHidden} from '../../common/VisuallyHidden'
import styles from './available-projects.scss'
import {SecondaryButton} from '../../common/forms/Button'
import {iCheckboxChecked, iCheckboxUnchecked} from '../../common/fonts/Icons'
import {Project} from '../../domain/Project'
import {getTrayErrors, getTrayTimestamp} from '../TraysReducer'
import {getProjects} from '../ProjectsReducer'
import {getSelectedProjects} from '../SelectedReducer'
import {useDispatch, useSelector} from 'react-redux'
import {State} from '../../Reducer'
import {selectProject} from '../TrackingActionCreators'
import {refreshTray} from '../RefreshThunkActionCreators'

interface AvailableProjectsProps {
  trayId: string;
  index: number;
}

export function AvailableProjects({index, trayId}: AvailableProjectsProps) {
  const dispatch = useDispatch()
  const errors = useSelector<State, string[]>((state) => getTrayErrors(state, trayId))
  const timestamp = useSelector<State, string>((state) => getTrayTimestamp(state, trayId))
  const projects = useSelector<State, Project[]>((state) => getProjects(state, trayId))
  const selected = useSelector<State, string[]>((state) => getSelectedProjects(state, trayId))

  const [filter, setFilter] = useState()
  const [filterErrors, setFilterErrors] = useState<string[]>([])
  const rootNode = useRef<HTMLDivElement>(null)

  const includeAll = (projects: Project[]) => () => {
    projects
      .filter((project) => !project.removed)
      .forEach((project) => dispatch(selectProject(trayId, project.projectId, true)))
  }

  const excludeAll = (projects: Project[]) => () => {
    projects.forEach((project) => dispatch(selectProject(trayId, project.projectId, false)))
  }

  const updateFilter = (evt: ChangeEvent<HTMLInputElement>) => {
    if (isBlank(evt.target.value)) {
      setFilter(null)
      setFilterErrors([])
    } else {
      try {
        const regEx = new RegExp(evt.target.value)
        setFilter(regEx)
        setFilterErrors([])
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
  const hasErrors = !isEmpty(errors)

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
                 placeholder='regular expression'>
            filter
          </Input>
        </div>
      </fieldset>
      <Messages type={MessagesType.ERROR}
                messages={filterErrors}/>
    </div>
  )

  const buildItems = (
    <ol className={styles.buildItems}
        aria-live='polite'
        aria-relevant='additions'
        data-locator='available-projects-list'>
      {
        sortBy(filteredProjects, ['name', 'stage']).map((project) => {
          const isSelected = selected.includes(project.projectId)

          return <AvailableProject key={project.projectId}
                                   {...project}
                                   selected={isSelected}
                                   selectProject={(select) => selectProject(trayId, project.projectId, select)}/>
        })
      }
    </ol>
  )

  const noProjectsWarning = (
    <Messages type={MessagesType.WARNING}
              messages={['No projects fetched, please refresh']}
              data-locator='no-projects-warning'/>
  )

  const noProjectsMatchFilterWarning = (
    <Messages type={MessagesType.WARNING}
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
      <VisuallyHidden><h3>Available projects</h3></VisuallyHidden>
      <Refresh index={index}
               timestamp={timestamp}
               refreshTray={() => dispatch(refreshTray(trayId))}/>
      <Messages type={MessagesType.ERROR}
                messages={errors}
                data-locator='errors'/>

      {!hasErrors && hasProjects && controls}
      {!hasErrors && hasProjectsFiltered && buildItems}
      {!hasErrors && !hasProjects && noProjectsWarning}
      {!hasErrors && hasProjects && !hasProjectsFiltered && noProjectsMatchFilterWarning}
      {!hasErrors && hasProjectsFiltered && backToTop}
    </section>
  )
}
