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
import {getFeeds} from '../settings/tracking/FeedsReducer'
import {getSelectedProjects} from '../settings/tracking/SelectedReducer'
import {getKnownProjects} from '../settings/tracking/ProjectsReducer'
import {interesting} from '../gateways/ProjectsGateway'
import {send} from '../gateways/Gateway'
import {enrichProjects, Projects, toProjectError} from '../domain/Project'
import {useAudioNotifications} from './notifications/AudioNotificationsHook'
import {useSystemNotifications} from './notifications/SystemNotificationsHook'
import {useShortcut} from '../common/Keyboard'
import screenfull from 'screenfull'
import {useQuery} from 'react-query'
import {useNevergreenContext} from '../Nevergreen'

export function Monitor(): ReactElement {
  const {menusHidden, toggleMenusHidden} = useNevergreenContext()
  const refreshTime = useSelector(getRefreshTime)
  const feeds = useSelector(getFeeds)
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

  const feedsAdded = !isEmpty(feeds)

  const {isLoading} = useQuery('monitor', async ({signal}) => {
    return await send(interesting(feeds, knownProjects, selected, prognosis, sort), signal)
  }, {
    enabled: feedsAdded,
    refetchInterval: refreshTime * 1000,
    refetchIntervalInBackground: true,
    onSuccess: ((response) => {
      setProjects((previouslyFetchedProjects) => {
        return enrichProjects(response, previouslyFetchedProjects)
      })
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

  const success = isEmpty(projects)

  const monitorClassNames = cn(styles.monitor, {
    [styles.menusHidden]: menusHidden
  })

  return (
    <div className={monitorClassNames} ref={ref}>
      <Title>Monitor</Title>
      {!feedsAdded && (
        <SuccessMessage message='Add a feed via the tracking page to start monitoring'/>
      )}
      {feedsAdded && (
        <Loading dark loaded={!isLoading}>
          {success && <Success/>}
          {!success && <InterestingProjects projects={projects}/>}
        </Loading>
      )}
    </div>
  )
}
