import { ReactElement, useEffect, useRef, useState } from 'react'
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
import { useInterestingProjects } from './InterestingProjectsHook'
import { useNotifications } from './notifications/NotificationsHook'
import { stopAnyPlayingAudio } from '../common/AudioPlayer'
import { useAppSelector } from '../configuration/Hooks'
import { Mute } from '../common/icons/Mute'
import { Main } from '../common/Main'
import { useAutoHideMenus } from '../common/AutoHideMenusHook'
import styles from './monitor.scss'

function isButton(element: Element | null): boolean {
  return element instanceof HTMLButtonElement || element?.role === 'button'
}

export function Monitor(): ReactElement {
  const menusHidden = useAutoHideMenus()
  const feeds = useAppSelector(getFeeds)
  const ref = useRef<HTMLDivElement>(null)
  const [muted, setMuted] = useState(false)

  const feedsAdded = !isEmpty(feeds)

  const { isLoading, projects, feedErrors } = useInterestingProjects()
  useNotifications(projects, feedErrors, muted)

  useEffect(() => {
    return () => {
      stopAnyPlayingAudio()
    }
  }, [])

  useShortcut('f', () => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (screenfull.isEnabled && ref.current) {
      void screenfull.toggle(ref.current)
    }
  })
  useShortcut('space', () => {
    if (!isButton(document.activeElement)) {
      stopAnyPlayingAudio()
      setMuted((m) => !m)
    }
  })

  const monitorClassNames = cn(styles.monitor, {
    [styles.menusHidden]: menusHidden,
  })

  const title = 'Monitor'

  return (
    <Main>
      <div className={monitorClassNames} ref={ref}>
        <div className={styles.projects}>
          <div className={styles.projectsInner}>
            <Title focus={false}>{title}</Title>
            {!feedsAdded && (
              <SuccessMessage message="Add a feed via the tracking page to start monitoring" />
            )}
            {feedsAdded && (
              <Loading dark isLoading={isLoading} title={title} focus>
                <Success projects={projects} feedErrors={feedErrors} />
                <InterestingProjects
                  projects={projects}
                  feedErrors={feedErrors}
                />
              </Loading>
            )}
            {muted && <Mute className={styles.mute} />}
          </div>
        </div>
      </div>
    </Main>
  )
}

export const Component = Monitor
