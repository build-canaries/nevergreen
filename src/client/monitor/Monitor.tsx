import React, {ReactElement, useEffect, useRef} from 'react'
import cn from 'classnames'
import {InterestingProjects} from './InterestingProjects'
import {Success} from './Success'
import {SuccessMessage} from '../common/SuccessMessage'
import {Loading} from '../common/Loading'
import styles from './monitor.scss'
import isEmpty from 'lodash/isEmpty'
import {Title} from '../common/Title'
import {useSelector} from 'react-redux'
import {getFeeds} from '../settings/tracking/FeedsReducer'
import {useShortcut} from '../common/Keyboard'
import screenfull from 'screenfull'
import {useNevergreenContext} from '../Nevergreen'
import {useInterestingProjects} from './InterestingProjectsHook'
import {useNotifications} from './notifications/NotificationsHook'
import {stopAudio} from '../common/AudioPlayer'

export function Monitor(): ReactElement {
  const {menusHidden, toggleMenusHidden} = useNevergreenContext()
  const feeds = useSelector(getFeeds)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    toggleMenusHidden(true)
    return () => {
      toggleMenusHidden(false)
    }
  }, [toggleMenusHidden])

  const feedsAdded = !isEmpty(feeds)

  const {loaded, projects, feedErrors} = useInterestingProjects()
  const sfx = useNotifications(projects, feedErrors)

  useEffect(() => {
    if (sfx) {
      stopAudio(sfx)
    }
  }, [sfx])

  useShortcut('f', () => {
    if (screenfull.isEnabled && ref.current) {
      void screenfull.toggle(ref.current)
    }
  })

  const monitorClassNames = cn(styles.monitor, {
    [styles.menusHidden]: menusHidden
  })

  return (
    <div className={monitorClassNames} ref={ref}>
      <Title>Monitor</Title>
      {!feedsAdded && (
        <SuccessMessage message="Add a feed via the tracking page to start monitoring"/>
      )}
      {feedsAdded && (
        <Loading dark loaded={loaded}>
          <Success projects={projects} feedErrors={feedErrors}/>
          <InterestingProjects projects={projects} feedErrors={feedErrors}/>
        </Loading>
      )}
    </div>
  )
}
