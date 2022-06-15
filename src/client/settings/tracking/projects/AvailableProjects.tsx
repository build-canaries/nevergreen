import React, {ReactElement, useCallback, useMemo, useState} from 'react'
import {AvailableProject} from './AvailableProject'
import {ErrorMessages, WarningMessages} from '../../../common/Messages'
import {Input} from '../../../common/forms/Input'
import {Refresh} from './Refresh'
import {errorMessage, isBlank, notEmpty} from '../../../common/Utils'
import styles from './available-projects.scss'
import {SecondaryButton} from '../../../common/forms/Button'
import {getProjectsForFeed} from '../ProjectsReducer'
import {getSelectedProjectsForFeed} from '../SelectedReducer'
import {useDispatch, useSelector} from 'react-redux'
import {projectSelected} from '../TrackingActionCreators'
import {Loading} from '../../../common/Loading'
import {Feed} from '../../../domain/Feed'
import {useLocation} from 'react-router-dom'
import {matchSorter} from 'match-sorter'
import {CheckboxChecked} from '../../../common/icons/CheckboxChecked'
import {CheckboxUnchecked} from '../../../common/icons/CheckboxUnchecked'
import {useProjects} from './ProjectsHook'

interface AvailableProjectsProps {
  readonly feed: Feed;
}

export function AvailableProjects({feed}: AvailableProjectsProps): ReactElement {
  const {hash} = useLocation()
  const dispatch = useDispatch()
  const projects = useSelector(getProjectsForFeed(feed.trayId))
  const selected = useSelector(getSelectedProjectsForFeed(feed.trayId))

  const [search, setSearch] = useState<string>('')

  const {isFetching, isError, error, refetch} = useProjects(feed, hash === '#refresh')

  const filteredProjects = useMemo(() => {
    if (!isBlank(search)) {
      return matchSorter(projects, search, {keys: ['description']})
    }
    return projects
  }, [projects, search])

  const hasProjects = notEmpty(projects)
  const hasProjectsFiltered = notEmpty(filteredProjects)
  const controlsDisabled = isFetching || !hasProjects || isError

  const includeAll = useCallback(() => {
    filteredProjects
      .filter((project) => !project.removed)
      .forEach((project) => dispatch(projectSelected(feed.trayId, project.projectId, true)))
  }, [dispatch, feed.trayId, filteredProjects])

  const excludeAll = useCallback(() => {
    filteredProjects.forEach((project) => dispatch(projectSelected(feed.trayId, project.projectId, false)))
  }, [dispatch, feed.trayId, filteredProjects])

  const controls = (
    <div className={styles.controls}>
      <fieldset className={styles.toggles}>
        <legend className={styles.legend}>Available projects</legend>
        <SecondaryButton className={styles.includeAll}
                         onClick={includeAll}
                         icon={<CheckboxChecked/>}
                         disabled={controlsDisabled}>
          Include all
        </SecondaryButton>
        <SecondaryButton className={styles.excludeAll}
                         onClick={excludeAll}
                         icon={<CheckboxUnchecked/>}
                         disabled={controlsDisabled}>
          Exclude all
        </SecondaryButton>
        <div className={styles.projectFilter}>
          <Input className={styles.projectFilterInput}
                 onChange={({target}) => setSearch(target.value)}
                 type="search"
                 disabled={controlsDisabled}>
            <span className={styles.search}>Search</span>
          </Input>
        </div>
      </fieldset>
    </div>
  )

  const buildItems = (
    <ol className={styles.buildItems}
        aria-live="polite"
        aria-relevant="additions"
        data-locator="available-projects-list">
      {
        filteredProjects.map((project) => {
          const isSelected = selected.includes(project.projectId)

          return <AvailableProject key={project.projectId}
                                   {...project}
                                   selected={isSelected}
                                   selectProject={(select) => dispatch(projectSelected(feed.trayId, project.projectId, select))}/>
        })
      }
    </ol>
  )

  const noProjectsWarning = (
    <WarningMessages messages="No projects fetched, please refresh"/>
  )

  const noProjectsMatchSearchWarning = (
    <WarningMessages messages="No matching projects, please update your search"/>
  )

  return (
    <section className={styles.availableProjects}
             data-locator="available-projects">
      <Refresh timestamp={feed.timestamp}
               refreshTray={() => void refetch()}
               loaded={!isFetching}/>
      {controls}
      <Loading loaded={!isFetching}
               className={styles.loading}>
        {!isError && !hasProjects && noProjectsWarning}
        {!isError && hasProjects && !hasProjectsFiltered && noProjectsMatchSearchWarning}
        {!isError && hasProjectsFiltered && buildItems}
        {isError && <ErrorMessages messages={errorMessage(error)}/>}
      </Loading>
    </section>
  )
}
