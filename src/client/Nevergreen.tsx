import React, {ReactElement, useCallback, useState} from 'react'
import {Header} from './header/Header'
import {Footer} from './footer/Footer'
import {Notification} from './Notification'
import styles from './nevergreen.scss'
import {KeyboardShortcuts} from './KeyboardShortcuts'
import {useServiceWorker} from './ServiceWorkerHook'
import {useFullScreen} from './FullScreenHook'
import {useSelector} from 'react-redux'
import {getClickToShowMenu} from './settings/SettingsReducer'
import {Redirect, Route, Switch} from 'react-router'
import {Monitor} from './monitor/Monitor'
import {Tracking} from './tracking/Tracking'
import {Settings} from './settings/Settings'
import {Backup} from './backup/Backup'
import {StyleGuide} from './styleGuide/StyleGuide'
import {Loading} from './common/Loading'
import {useLocalConfiguration} from './configuration/ConfigurationHook'
import {Help} from './help/Help'
import {DEFAULT_FONT_METRICS, FontMetrics, FontMetricsContext} from './FontMetrics'
import {Preview} from './settings/Preview'
import {useShortcut} from './common/Keyboard'
import {useCheckForNewVersion} from './CheckForNewVersionHook'
import {UnhandledErrorMessage} from './UnhandledErrorMessage'

export function Nevergreen(): ReactElement {
  const {loaded, error} = useLocalConfiguration()

  const [notification, setNotification] = useState('')
  const [fontMetrics, setFontMetrics] = useState(DEFAULT_FONT_METRICS)

  const fontMetricsRef = useCallback((ref) => setFontMetrics(ref), [])

  const [fullScreen, requestFullScreen, disableFullScreen] = useFullScreen()

  useServiceWorker(setNotification)
  useCheckForNewVersion(setNotification)

  const clickToShowMenu = useSelector(getClickToShowMenu)

  const disableFullScreenOn = clickToShowMenu
    ? {onClick: disableFullScreen}
    : {onMouseMove: disableFullScreen}

  useShortcut('esc', () => {
    const active = document.activeElement as HTMLElement
    if (active && active.blur) {
      active.blur()
    }
  })

  if (error) {
    return <UnhandledErrorMessage/>
  }

  return (
    <Loading dark loaded={loaded}>
      <FontMetrics ref={fontMetricsRef}/>
      <FontMetricsContext.Provider value={fontMetrics}>
        <KeyboardShortcuts/>
        <Help/>
        <div className={styles.nevergreen}
             tabIndex={-1}
             onKeyDown={disableFullScreen}
             {...disableFullScreenOn}>
          <Header fullScreen={fullScreen}/>
          <Notification notification={notification}
                        dismiss={() => setNotification('')}
                        fullScreen={fullScreen}/>
          <main className={styles.main} role='main'>
            <Switch>
              <Route exact path='/monitor'>
                <Monitor fullScreen={fullScreen}
                         requestFullScreen={requestFullScreen}/>
              </Route>
              <Route exact path='/preview' component={Preview}/>
              <Route>
                <div className={styles.settings}>
                  <Switch>
                    <Route exact path='/tracking' component={Tracking}/>
                    <Route exact path='/settings' component={Settings}/>
                    <Route exact path='/backup' component={Backup}/>
                    <Route exact path='/style-guide' component={StyleGuide}/>
                    <Route exact path='/success'>
                      <Redirect to='/settings'/>
                    </Route>
                    <Route>
                      <Redirect to='/tracking'/>
                    </Route>
                  </Switch>
                </div>
              </Route>
            </Switch>
          </main>
          <Footer fullScreen={fullScreen}/>
        </div>
      </FontMetricsContext.Provider>
    </Loading>
  )
}
