import React, {ReactElement, useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {AvailableProject} from './AvailableProject'
import {ErrorMessages, WarningMessages} from '../../common/Messages'
import {Input} from '../../common/forms/Input'
import {Refresh} from './Refresh'
import {errorMessage, isBlank, notEmpty} from '../../common/Utils'
import styles from './available-projects.scss'
import {SecondaryButton} from '../../common/forms/Button'
import {iCheckboxChecked, iCheckboxUnchecked} from '../../common/fonts/Icons'
import {enrichProjects, isError} from '../../domain/Project'
import {getProjectsForTray} from '../ProjectsReducer'
import {getSelectedProjectsForTray} from '../SelectedReducer'
import {useDispatch, useSelector} from 'react-redux'
import {projectSelected, projectsFetched} from '../TrackingActionCreators'
import {fetchAll, ProjectsResponse} from '../../gateways/ProjectsGateway'
import {Request, send} from '../../gateways/Gateway'
import {Loading} from '../../common/Loading'
import {Tray} from '../../domain/Tray'
import {useLocation} from 'react-router-dom'
import {REFRESH_HASH} from '../../Routes'
import {matchSorter} from 'match-sorter'

interface AvailableProjectsProps {
  readonly tray: Tray;
}

export function AvailableProjects({tray}: AvailableProjectsProps): ReactElement {
  const {hash} = useLocation()
  const dispatch = useDispatch()
  const projects = useSelector(getProjectsForTray(tray.trayId))
  const selected = useSelector(getSelectedProjectsForTray(tray.trayId))

  const [search, setSearch] = useState<string>('')
  const [errors, setErrors] = useState<ReadonlyArray<string>>([])
  const [loaded, setLoaded] = useState(true)
  const pendingRequest = useRef<Request<ProjectsResponse>>()

  const refreshTray = useCallback(async () => {
    setLoaded(false)
    setErrors([])
    pendingRequest.current = fetchAll([tray], projects)
    try {
      const apiProjects = await send(pendingRequest.current)
      const fetchedProjects = enrichProjects(apiProjects, [])

      if (fetchedProjects.some(isError)) {
        const errorMessages = fetchedProjects.map((projectError) => projectError.description)
        setErrors(errorMessages)
      } else {
        dispatch(projectsFetched(tray.trayId, fetchedProjects, tray.includeNew))
      }
    } catch (e) {
      setErrors([errorMessage(e)])
    }
    pendingRequest.current = undefined
    setLoaded(true)
  }, [dispatch, projects, tray])

  useEffect(() => {
    if (hash === REFRESH_HASH) {
      void refreshTray()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    return () => {
      if (pendingRequest.current) {
        pendingRequest.current.abort()
      }
    }
  }, [])

  const filteredProjects = useMemo(() => {
    if (!isBlank(search)) {
      return matchSorter(projects, search, {keys: ['description']})
    }
    return projects
  }, [projects, search])

  const hasProjects = notEmpty(projects)
  const hasProjectsFiltered = notEmpty(filteredProjects)
  const hasErrors = notEmpty(errors)
  const controlsDisabled = !loaded || !hasProjects || hasErrors

  const includeAll = useCallback(() => {
    filteredProjects
      .filter((project) => !project.removed)
      .forEach((project) => dispatch(projectSelected(tray.trayId, project.projectId, true)))
  }, [dispatch, tray.trayId, filteredProjects])

  const excludeAll = useCallback(() => {
    filteredProjects.forEach((project) => dispatch(projectSelected(tray.trayId, project.projectId, false)))
  }, [dispatch, tray.trayId, filteredProjects])

  const controls = (
    <div className={styles.controls}>
      <fieldset className={styles.toggles}>
        <legend className={styles.legend}>Available projects</legend>
        <SecondaryButton className={styles.includeAll}
                         onClick={includeAll}
                         icon={iCheckboxChecked}
                         disabled={controlsDisabled}>
          Include all
        </SecondaryButton>
        <SecondaryButton className={styles.excludeAll}
                         onClick={excludeAll}
                         icon={iCheckboxUnchecked}
                         disabled={controlsDisabled}>
          Exclude all
        </SecondaryButton>
        <div className={styles.projectFilter}>
          <Input className={styles.projectFilterInput}
                 onChange={({target}) => setSearch(target.value)}
                 type='search'
                 disabled={controlsDisabled}>
            <span className={styles.search}>Search</span>
          </Input>
        </div>
      </fieldset>
    </div>
  )

  const buildItems = (
    <ol className={styles.buildItems}
        aria-live='polite'
        aria-relevant='additions'
        data-locator='available-projects-list'>
      {
        filteredProjects.map((project) => {
          const isSelected = selected.includes(project.projectId)

          return <AvailableProject key={project.projectId}
                                   {...project}
                                   selected={isSelected}
                                   selectProject={(select) => dispatch(projectSelected(tray.trayId, project.projectId, select))}/>
        })
      }
    </ol>
  )

  const noProjectsWarning = (
    <WarningMessages messages='No projects fetched, please refresh'/>
  )

  const noProjectsMatchSearchWarning = (
    <WarningMessages messages='No matching projects, please update your search'/>
  )

  return (
    <section className={styles.availableProjects}
             data-locator='available-projects'>
      <Refresh timestamp={tray.timestamp}
               refreshTray={refreshTray}
               loaded={loaded}/>
      {controls}
      <Loading loaded={loaded}
               className={styles.loading}>
        {!hasErrors && !hasProjects && noProjectsWarning}
        {!hasErrors && hasProjects && !hasProjectsFiltered && noProjectsMatchSearchWarning}
        {!hasErrors && hasProjectsFiltered && buildItems}
        <ErrorMessages messages={errors}
                       data-locator='errors'/>
      </Loading>
    </section>
  )
}
