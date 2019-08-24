import React, {ReactNode} from 'react'
import {Header} from './header/Header'
import {Footer} from './footer/Footer'
import {Notification} from './notification/Notification'
import styles from './nevergreen.scss'
import {KeyboardShortcuts} from './KeyboardShortcuts'
import {useConfiguration} from './configuration/ConfigurationHook'
import {useServiceWorker} from './ServiceWorkerHook'
import {useFullScreen} from './FullScreenHook'
import {useSelector} from 'react-redux'
import {getClickToShowMenu} from './settings/SettingsReducer'
import {useCheckForNewVersion} from './CheckForNewVersionHook'

interface NevergreenProps {
  children: ReactNode;
}

export function Nevergreen({children}: NevergreenProps) {
  useServiceWorker()
  const loading = useConfiguration()
  const disableFullScreen = useFullScreen(loading)
  useCheckForNewVersion(loading)

  const clickToShowMenu = useSelector(getClickToShowMenu)

  const disableFullScreenOn = clickToShowMenu
    ? {onClick: disableFullScreen}
    : {onMouseMove: disableFullScreen}

  return (
    <>
      {!loading && <KeyboardShortcuts/>}

      <div className={styles.nevergreen}
           aria-busy={loading}
           tabIndex={-1}
           {...disableFullScreenOn}>
        <Header/>
        <Notification/>
        {!loading && <main className={styles.main}>{children}</main>}
        <Footer/>
      </div>
    </>
  )
}
