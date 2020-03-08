import React, {useCallback, useEffect, useState} from 'react'
import cn from 'classnames'
import {InterestingProjects} from './InterestingProjects'
import {Success} from './Success'
import {SuccessMessage} from '../common/SuccessMessage'
import {Loading} from '../common/Loading'
import styles from './monitor.scss'
import {isEmpty} from 'lodash'
import {Title} from '../common/Title'
import {useTimer} from '../common/TimerHook'
import {useSelector} from 'react-redux'
import {getRefreshTime, getShowPrognosis} from '../settings/SettingsReducer'
import {getTrays} from '../tracking/TraysReducer'
import {getSelectedProjects} from '../tracking/SelectedReducer'
import {getProjectsAll} from '../tracking/ProjectsReducer'
import {interesting, ProjectsResponse} from '../gateways/ProjectsGateway'
import {send} from '../gateways/Gateway'
import {createProjectError, Project, ProjectError, wrapProjectErrors, wrapProjects} from '../domain/Project'
import {useProjectNotifications} from './ProjectNotificationsHook'
import {now} from '../common/DateTime'

interface MonitorProps {
  readonly fullScreen: boolean;
  readonly requestFullScreen: (fullScreen: boolean) => void;
}

export function Monitor({fullScreen, requestFullScreen}: MonitorProps) {
  const refreshTime = useSelector(getRefreshTime)
  const trays = useSelector(getTrays)
  const selected = useSelector(getSelectedProjects)
  const allProjects = useSelector(getProjectsAll)
  const prognosis = useSelector(getShowPrognosis)

  const [loaded, setLoaded] = useState(false)
  const [projects, setProjects] = useState<ReadonlyArray<Project>>([])
  const [errors, setErrors] = useState<ReadonlyArray<ProjectError>>([])

  useEffect(() => {
    requestFullScreen(true)
    return () => {
      requestFullScreen(false)
    }
  }, [requestFullScreen])

  useProjectNotifications(projects)

  const onTrigger = useCallback(async () => {
    const request = interesting(trays, allProjects, selected, prognosis)

    try {
      const response = await send<ProjectsResponse>(request)

      setProjects((previouslyFetchedProjects) => wrapProjects(response, previouslyFetchedProjects))
      setErrors(wrapProjectErrors(response))
      setLoaded(true)
    } catch (e) {
      if (e.message !== 'Aborted') {
        setErrors([createProjectError(e.message, {fetchedTime: now()})])
        setProjects([])
        setLoaded(true)
      }
    }

    return request.abort.bind(request)
  }, [trays, allProjects, selected, prognosis])

  useTimer(onTrigger, refreshTime)

  const traysAdded = !isEmpty(trays)
  const success = isEmpty(projects) && isEmpty(errors)

  const monitorClassNames = cn(styles.monitor, {
    [styles.fullscreen]: fullScreen
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
