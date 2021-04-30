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
import {StyleGuide} from './styleGuide/StyleGuide'
import {Loading} from './common/Loading'
import {useLocalConfiguration} from './configuration/ConfigurationHook'
import {Help} from './help/Help'
import {DEFAULT_FONT_METRICS, FontMetrics, FontMetricsContext} from './FontMetrics'
import {Preview} from './settings/Preview'
import {useShortcut} from './common/Keyboard'
import {useCheckForNewVersion} from './CheckForNewVersionHook'
import {UnhandledErrorMessage} from './UnhandledErrorMessage'
import {AddBackup} from './settings/backup/AddBackup'
import {
  ROUTE_BACKUP_ADD,
  ROUTE_EXPORT_LOCAL,
  ROUTE_EXPORT_REMOTE,
  ROUTE_IMPORT_LOCAL,
  ROUTE_IMPORT_REMOTE,
  ROUTE_MONITOR,
  ROUTE_PREVIEW,
  ROUTE_SETTINGS,
  ROUTE_STYLE_GUIDE,
  ROUTE_SUCCESS_ADD,
  ROUTE_TRACKING
} from './Routes'
import {AddMessage} from './settings/success/AddMessage'
import {ImportLocal} from './settings/backup/import/ImportLocal'
import {ImportRemote} from './settings/backup/import/ImportRemote'
import {ExportLocal} from './settings/backup/export/ExportLocal'
import {ExportRemote} from './settings/backup/export/ExportRemote'

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
              <Route exact path={ROUTE_MONITOR}>
                <Monitor fullScreen={fullScreen}
                         requestFullScreen={requestFullScreen}/>
              </Route>
              <Route exact path={ROUTE_PREVIEW} component={Preview}/>
              <Route>
                <div className={styles.settings}>
                  <Switch>
                    <Route exact path={ROUTE_TRACKING} component={Tracking}/>
                    <Route exact path={ROUTE_SETTINGS} component={Settings}/>
                    <Route exact path={ROUTE_SUCCESS_ADD} component={AddMessage}/>
                    <Route exact path={ROUTE_BACKUP_ADD} component={AddBackup}/>
                    <Route exact path={ROUTE_EXPORT_LOCAL} component={ExportLocal}/>
                    <Route exact path={ROUTE_EXPORT_REMOTE} component={ExportRemote}/>
                    <Route exact path={ROUTE_IMPORT_LOCAL} component={ImportLocal}/>
                    <Route exact path={ROUTE_IMPORT_REMOTE} component={ImportRemote}/>
                    <Route exact path={ROUTE_STYLE_GUIDE} component={StyleGuide}/>
                    <Route>
                      <Redirect to={ROUTE_TRACKING}/>
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
