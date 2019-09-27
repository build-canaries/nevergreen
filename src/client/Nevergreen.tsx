import React, {ReactNode, useState} from 'react'
import {Header} from './header/Header'
import {Footer} from './footer/Footer'
import {Notification} from './Notification'
import styles from './nevergreen.scss'
import {KeyboardShortcuts} from './KeyboardShortcuts'
import {useConfiguration} from './configuration/ConfigurationHook'
import {useServiceWorker} from './ServiceWorkerHook'
import {useFullScreen} from './FullScreenHook'
import {useSelector} from 'react-redux'
import {getClickToShowMenu} from './settings/SettingsReducer'
import {useCheckForNewVersion} from './CheckForNewVersionHook'

interface NevergreenProps {
  readonly children: ReactNode;
}

export function Nevergreen({children}: NevergreenProps) {
  const [notification, setNotification] = useState('')
  const loading = useConfiguration()
  const disableFullScreen = useFullScreen(loading)

  useServiceWorker(setNotification)
  useCheckForNewVersion(loading, setNotification)

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
        <Notification notification={notification}
                      dismiss={() => setNotification('')}/>
        {!loading && <main className={styles.main}>{children}</main>}
        <Footer/>
      </div>
    </>
  )
}
