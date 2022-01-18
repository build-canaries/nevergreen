import React, {ReactElement, useCallback, useMemo, useState} from 'react'
import {AvailableProject} from './AvailableProject'
import {ErrorMessages, WarningMessages} from '../../../common/Messages'
import {Input} from '../../../common/forms/Input'
import {Refresh} from './Refresh'
import {errorMessage, isBlank, notEmpty} from '../../../common/Utils'
import styles from './available-projects.scss'
import {SecondaryButton} from '../../../common/forms/Button'
import {enrichProjects, isError as isProjectError} from '../../../domain/Project'
import {getProjectsForTray} from '../ProjectsReducer'
import {getSelectedProjectsForTray} from '../SelectedReducer'
import {useDispatch, useSelector} from 'react-redux'
import {projectSelected, projectsFetched} from '../TrackingActionCreators'
import {fetchAll} from '../../../gateways/ProjectsGateway'
import {send} from '../../../gateways/Gateway'
import {Loading} from '../../../common/Loading'
import {Tray} from '../../../domain/Tray'
import {useLocation} from 'react-router-dom'
import {REFRESH_HASH} from '../../../Routes'
import {matchSorter} from 'match-sorter'
import {CheckboxChecked} from '../../../common/icons/CheckboxChecked'
import {CheckboxUnchecked} from '../../../common/icons/CheckboxUnchecked'
import {useQuery} from 'react-query'

interface AvailableProjectsProps {
  readonly tray: Tray;
}

export function AvailableProjects({tray}: AvailableProjectsProps): ReactElement {
  const {hash} = useLocation()
  const dispatch = useDispatch()
  const projects = useSelector(getProjectsForTray(tray.trayId))
  const selected = useSelector(getSelectedProjectsForTray(tray.trayId))

  const [search, setSearch] = useState<string>('')

  const {isFetching, isError, error, refetch} = useQuery(['available-projects', tray.trayId], async ({signal}) => {
    const res = await send(fetchAll([tray], projects), signal)
    const fetchedProjects = enrichProjects(res, [])
    if (fetchedProjects.some(isProjectError)) {
      const errorMessages = fetchedProjects.map((projectError) => projectError.description)
      throw new Error(errorMessages.join(', '))
    }
    return fetchedProjects
  }, {
    enabled: hash === REFRESH_HASH,
    onSuccess: (res) => {
      dispatch(projectsFetched(tray.trayId, res, tray.includeNew))
    }
  })

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
               refreshTray={() => refetch()}
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
