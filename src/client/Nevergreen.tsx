import React, {ReactNode, useEffect, useLayoutEffect, useMemo, useRef} from 'react'
import {throttle} from 'lodash'
import {Header} from './header/Header'
import {Footer} from './footer/Footer'
import NotificationContainer from './notification/NotificationContainer'
import version from '../../resources/version.txt'
import styles from './nevergreen.scss'
import {KeyboardShortcuts} from './KeyboardShortcuts'
import {useTimer} from './common/TimerHook'

interface NevergreenProps {
  children: ReactNode;
  loaded: boolean;
  initalise: () => void;
  checkForNewVersion: (version: string, hostname: string) => void;
  isFullScreen: boolean;
  fullScreenRequested: boolean;
  enableFullScreen: (enable: boolean) => void;
  clickToShowMenu: boolean;
}

const ONE_SECOND = 1000
const THREE_SECONDS = 3 * 1000
const TWENTY_FOUR_HOURS = 24 * 60 * 60

export function Nevergreen({initalise, loaded, isFullScreen, children, clickToShowMenu, fullScreenRequested, enableFullScreen, checkForNewVersion}: NevergreenProps) {
  const fullScreenTimer = useRef(0)

  const disableFullScreen = throttle(() => {
    clearTimeout(fullScreenTimer.current)

    if (isFullScreen) {
      enableFullScreen(false)
    }

    if (fullScreenRequested) {
      fullScreenTimer.current = window.setTimeout(() => enableFullScreen(true), THREE_SECONDS)
    }
  }, ONE_SECOND, {trailing: false})

  const checkVersion = useMemo(() => () => loaded && checkForNewVersion(version, window.location.hostname), [loaded])

  useEffect(() => {
    initalise()
  }, [])

  useLayoutEffect(() => {
    enableFullScreen(fullScreenRequested)
    if (!fullScreenRequested) {
      clearTimeout(fullScreenTimer.current)
    }
  }, [fullScreenRequested])

  useTimer(checkVersion, TWENTY_FOUR_HOURS)

  const disableFullScreenOn = clickToShowMenu
    ? {onClick: disableFullScreen}
    : {onMouseMove: disableFullScreen}

  return (
    <>
      {loaded && <KeyboardShortcuts/>}

      <div className={styles.nevergreen}
           aria-busy={!loaded}
           tabIndex={-1}
           {...disableFullScreenOn}>
        <Header fullScreen={isFullScreen}/>
        <NotificationContainer/>
        {loaded && <main className={styles.main}>{children}</main>}
        <Footer fullScreen={isFullScreen}/>
      </div>
    </>
  )
}
