import React, {useState} from 'react'
import {Header} from './header/Header'
import {Footer} from './footer/Footer'
import {Notification} from './Notification'
import styles from './nevergreen.scss'
import {KeyboardShortcuts} from './KeyboardShortcuts'
import {useServiceWorker} from './ServiceWorkerHook'
import {useFullScreen} from './FullScreenHook'
import {useSelector} from 'react-redux'
import {getClickToShowMenu} from './settings/SettingsReducer'
import {useCheckForNewVersion} from './CheckForNewVersionHook'
import {Redirect, Route, Switch} from 'react-router'
import {Monitor} from './monitor/Monitor'
import {Tracking} from './tracking/Tracking'
import {Success} from './success/Success'
import {Settings} from './settings/Settings'
import {Backup} from './backup/Backup'
import {StyleGuide} from './styleGuide/StyleGuide'

export function Nevergreen() {
  const [notification, setNotification] = useState('')

  const [fullScreen, requestFullScreen, disableFullScreen] = useFullScreen()

  useServiceWorker(setNotification)
  useCheckForNewVersion(setNotification)

  const clickToShowMenu = useSelector(getClickToShowMenu)

  const disableFullScreenOn = clickToShowMenu
    ? {onClick: disableFullScreen}
    : {onMouseMove: disableFullScreen}

  return (
    <>
      <KeyboardShortcuts/>
      <div className={styles.nevergreen}
           tabIndex={-1}
           {...disableFullScreenOn}>
        <Header fullScreen={fullScreen}/>
        <Notification notification={notification}
                      dismiss={() => setNotification('')}
                      fullScreen={fullScreen}/>
        <main className={styles.main}>
          <Switch>
            <Route exact path='/monitor'>
              <Monitor fullScreen={fullScreen}
                       requestFullScreen={requestFullScreen}/>
            </Route>
            <Route exact path='/tracking' component={Tracking}/>
            <Route exact path='/success' component={Success}/>
            <Route exact path='/settings' component={Settings}/>
            <Route exact path='/backup' component={Backup}/>
            <Route exact path='/style-guide' component={StyleGuide}/>
            <Route>
              <Redirect to='/tracking'/>
            </Route>
          </Switch>
        </main>
        <Footer fullScreen={fullScreen}/>
      </div>
    </>
  )
}
