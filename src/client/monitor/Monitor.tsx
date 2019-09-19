import React, {useCallback, useEffect, useState} from 'react'
import cn from 'classnames'
import {InterestingProjects} from './InterestingProjects'
import {Success} from './Success'
import {SuccessMessage} from '../common/SuccessMessage'
import {Loading} from '../common/Loading'
import styles from './monitor.scss'
import {isEmpty, omit} from 'lodash'
import {Title} from '../common/Title'
import {useTimer} from '../common/TimerHook'
import {useDispatch, useSelector} from 'react-redux'
import {getFullScreen} from '../NevergreenReducer'
import {requestFullScreen} from '../NevergreenActionCreators'
import {getRefreshTime, getShowPrognosis} from '../settings/SettingsReducer'
import {getTrays} from '../tracking/TraysReducer'
import {getSelectedProjects} from '../tracking/SelectedReducer'
import {getProjectsAll} from '../tracking/ProjectsReducer'
import {interesting, ProjectsResponse} from '../gateways/ProjectsGateway'
import {send} from '../gateways/Gateway'
import {isBuilding, Project, ProjectError, wrapProjectErrors, wrapProjects} from '../domain/Project'
import {Tray} from '../domain/Tray'
import {useProjectNotifications} from './ProjectNotificationsHook'

function toErrorString(trays: ReadonlyArray<Tray>, projectError: ProjectError): string {
  const tray = trays.find((tray) => tray.trayId === projectError.trayId)
  const identifier = tray ? `${tray.name || tray.url} ` : ''
  return `${identifier}${projectError.errorMessage}`
}

function addThisBuildTime(project: Project, previouslyFetchedProjects: ReadonlyArray<Project>): Project {
  if (isBuilding(project.prognosis)) {
    const previousProject = previouslyFetchedProjects.find((previous) => project.projectId === previous.projectId)
    const thisBuildTime = previousProject && isBuilding(previousProject.prognosis)
      ? previousProject.thisBuildTime
      : project.fetchedTime
    return {...project, thisBuildTime}
  } else {
    return omit(project, 'thisBuildTime')
  }
}

export function Monitor() {
  const dispatch = useDispatch()
  const isFullScreen = useSelector(getFullScreen)
  const refreshTime = useSelector(getRefreshTime)
  const trays = useSelector(getTrays)
  const selected = useSelector(getSelectedProjects)
  const allProjects = useSelector(getProjectsAll)
  const prognosis = useSelector(getShowPrognosis)

  const [loaded, setLoaded] = useState(false)
  const [projects, setProjects] = useState<ReadonlyArray<Project>>([])
  const [errors, setErrors] = useState<ReadonlyArray<string>>([])

  useEffect(() => {
    dispatch(requestFullScreen(true))
    return () => {
      dispatch(requestFullScreen(false))
    }
  }, [dispatch])

  useProjectNotifications(projects)

  const onTrigger = useCallback(async () => {
    const request = interesting(trays, allProjects, selected, prognosis)

    try {
      const rawProjects = await send<ProjectsResponse>(request)
      const fetchedProjects = wrapProjects(rawProjects)

      setProjects((previous) => fetchedProjects
        .map((project) => addThisBuildTime(project, previous)))

      const errorMessages = wrapProjectErrors(rawProjects)
        .map((projectError) => toErrorString(trays, projectError))
      setErrors(errorMessages)
    } catch (e) {
      const returnedErrors = e.message === 'Aborted' ? [] : [e.message]
      setErrors(returnedErrors)
      setProjects([])
    }

    setLoaded(true)

    return request.abort.bind(request)
  }, [trays, allProjects, selected, prognosis])

  useTimer(onTrigger, refreshTime)

  const traysAdded = !isEmpty(trays)
  const success = isEmpty(projects) && isEmpty(errors)

  const monitorClassNames = cn(styles.monitor, {
    [styles.fullscreen]: isFullScreen
  })

  return (
    <div className={monitorClassNames}>
      <Title>Monitor</Title>
      {!traysAdded && (
        <SuccessMessage message='Add a CI server via the tracking page to start monitoring'/>
      )}
      {traysAdded && (
        <Loading loaded={loaded}>
          {success && <Success/>}
          {!success && <InterestingProjects projects={projects} errors={errors}/>}
        </Loading>
      )}
    </div>
  )
}
