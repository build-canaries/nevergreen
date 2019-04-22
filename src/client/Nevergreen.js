import React, {useEffect, useLayoutEffect, useMemo, useRef} from 'react'
import PropTypes from 'prop-types'
import {throttle} from 'lodash'
import {Header} from './header/Header'
import {Footer} from './footer/Footer'
import NotificationContainer from './notification/NotificationContainer'
import version from '../../resources/version.txt'
import styles from './nevergreen.scss'
import {KeyboardShortcuts} from './KeyboardShortcuts'
import {useTimer} from './common/TimerHook'

const ONE_SECOND = 1000
const THREE_SECONDS = 3 * 1000
const TWENTY_FOUR_HOURS = 24 * 60 * 60

export function Nevergreen({initalise, loaded, isFullScreen, children, clickToShowMenu, fullScreenRequested, enableFullScreen, checkForNewVersion}) {
  const fullScreenTimer = useRef()

  const disableFullScreen = throttle(() => {
    clearTimeout(fullScreenTimer.current)

    if (isFullScreen) {
      enableFullScreen(false)
    }

    if (fullScreenRequested) {
      fullScreenTimer.current = setTimeout(() => enableFullScreen(true), THREE_SECONDS)
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
           tabIndex='-1'
           {...disableFullScreenOn}>
        <Header fullScreen={isFullScreen}/>
        <NotificationContainer/>
        {loaded && <main className={styles.main}>{children}</main>}
        <Footer fullScreen={isFullScreen}/>
      </div>
    </>
  )
}

Nevergreen.propTypes = {
  children: PropTypes.node.isRequired,
  loaded: PropTypes.bool.isRequired,
  initalise: PropTypes.func.isRequired,
  checkForNewVersion: PropTypes.func.isRequired,
  isFullScreen: PropTypes.bool,
  fullScreenRequested: PropTypes.bool,
  enableFullScreen: PropTypes.func.isRequired,
  clickToShowMenu: PropTypes.bool
}
