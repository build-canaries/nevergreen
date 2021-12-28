import React, {ReactElement, useEffect, useRef, useState} from 'react'
import cn from 'classnames'
import {InterestingProjects} from './InterestingProjects'
import {Success} from './Success'
import {SuccessMessage} from '../common/SuccessMessage'
import {Loading} from '../common/Loading'
import styles from './monitor.scss'
import isEmpty from 'lodash/isEmpty'
import {Title} from '../common/Title'
import {useSelector} from 'react-redux'
import {getRefreshTime, getShowPrognosis, getSort} from '../settings/SettingsReducer'
import {getTrays} from '../tracking/TraysReducer'
import {getSelectedProjects} from '../tracking/SelectedReducer'
import {getKnownProjects} from '../tracking/ProjectsReducer'
import {interesting} from '../gateways/ProjectsGateway'
import {send} from '../gateways/Gateway'
import {enrichProjects, Projects, toProjectError} from '../domain/Project'
import {useAudioNotifications} from './notifications/AudioNotificationsHook'
import {useSystemNotifications} from './notifications/SystemNotificationsHook'
import {useShortcut} from '../common/Keyboard'
import screenfull from 'screenfull'
import {useQuery} from 'react-query'

interface MonitorProps {
  readonly menusHidden: boolean;
  readonly toggleMenusHidden: (hide: boolean) => void;
}

export function Monitor({menusHidden, toggleMenusHidden}: MonitorProps): ReactElement {
  const refreshTime = useSelector(getRefreshTime)
  const trays = useSelector(getTrays)
  const selected = useSelector(getSelectedProjects)
  const knownProjects = useSelector(getKnownProjects)
  const prognosis = useSelector(getShowPrognosis)
  const sort = useSelector(getSort)
  const ref = useRef<HTMLDivElement>(null)

  const [projects, setProjects] = useState<Projects>([])

  useEffect(() => {
    toggleMenusHidden(true)
    return () => {
      toggleMenusHidden(false)
    }
  }, [toggleMenusHidden])

  const {isLoading} = useQuery('monitor', async ({signal}) => {
    return await send(interesting(trays, knownProjects, selected, prognosis, sort), signal)
  }, {
    refetchInterval: refreshTime * 1000,
    refetchIntervalInBackground: true,
    onSuccess: ((response) => {
      setProjects((previouslyFetchedProjects) => enrichProjects(response, previouslyFetchedProjects))
    }),
    onError: (e) => {
      setProjects([toProjectError(e)])
    }
  })

  useAudioNotifications(projects)
  useSystemNotifications(projects)

  useShortcut('f', () => {
    if (screenfull.isEnabled && ref.current) {
      void screenfull.toggle(ref.current)
    }
  })

  const traysAdded = !isEmpty(trays)
  const success = isEmpty(projects)

  const monitorClassNames = cn(styles.monitor, {
    [styles.menusHidden]: menusHidden
  })

  return (
    <div className={monitorClassNames} ref={ref}>
      <Title>Monitor</Title>
      {!traysAdded && (
        <SuccessMessage message='Add a feed via the tracking page to start monitoring'/>
      )}
      {traysAdded && (
        <Loading dark loaded={!isLoading}>
          {success && <Success/>}
          {!success && <InterestingProjects projects={projects}/>}
        </Loading>
      )}
    </div>
  )
}
