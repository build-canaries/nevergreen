import type { ReactElement } from 'react'
import { useEffect, useRef } from 'react'
import cn from 'classnames'
import isEmpty from 'lodash/isEmpty'
import screenfull from 'screenfull'
import { InterestingProjects } from './InterestingProjects'
import { Success } from './Success'
import { SuccessMessage } from '../common/SuccessMessage'
import { Loading } from '../common/Loading'
import { Title } from '../common/Title'
import { getFeeds } from '../settings/tracking/FeedsReducer'
import { useShortcut } from '../common/Keyboard'
import { useNevergreenContext } from '../Nevergreen'
import { useInterestingProjects } from './InterestingProjectsHook'
import { useNotifications } from './notifications/NotificationsHook'
import { stopAnyPlayingAudio } from '../common/AudioPlayer'
import { useAppSelector } from '../configuration/Hooks'
import styles from './monitor.scss'

export function Monitor(): ReactElement {
  const { menusHidden, toggleMenusHidden } = useNevergreenContext()
  const feeds = useAppSelector(getFeeds)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    toggleMenusHidden(true)
    return () => {
      toggleMenusHidden(false)
    }
  }, [toggleMenusHidden])

  const feedsAdded = !isEmpty(feeds)

  const { isLoading, projects, feedErrors } = useInterestingProjects()
  useNotifications(projects, feedErrors)

  useEffect(() => {
    return () => {
      stopAnyPlayingAudio()
    }
  }, [])

  useShortcut('f', () => {
    if (screenfull.isEnabled && ref.current) {
      void screenfull.toggle(ref.current)
    }
  })

  const monitorClassNames = cn(styles.monitor, {
    [styles.menusHidden]: menusHidden,
  })

  const title = 'Monitor'

  return (
    <div className={monitorClassNames} ref={ref}>
      <Title focus={false}>{title}</Title>
      {!feedsAdded && (
        <SuccessMessage message="Add a feed via the tracking page to start monitoring" />
      )}
      {feedsAdded && (
        <Loading dark isLoading={isLoading} title={title} focus>
          <Success projects={projects} feedErrors={feedErrors} />
          <InterestingProjects projects={projects} feedErrors={feedErrors} />
        </Loading>
      )}
    </div>
  )
}

export const Component = Monitor
