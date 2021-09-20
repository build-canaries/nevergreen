import React, {ReactElement, useCallback, useState} from 'react'
import {Header} from './header/Header'
import {Footer} from './footer/Footer'
import {Notification} from './Notification'
import styles from './nevergreen.scss'
import {KeyboardShortcuts} from './KeyboardShortcuts'
import {useServiceWorker} from './ServiceWorkerHook'
import {useHideMenus} from './HideMenusHook'
import {useSelector} from 'react-redux'
import {getClickToShowMenu} from './settings/SettingsReducer'
import {Redirect, Route, Switch} from 'react-router'
import {Monitor} from './monitor/Monitor'
import {Settings} from './settings/Settings'
import {Loading} from './common/Loading'
import {useLocalConfiguration} from './configuration/ConfigurationHook'
import {Help} from './help/Help'
import {DEFAULT_FONT_METRICS, FontMetrics, FontMetricsContext} from './FontMetrics'
import {Preview} from './settings/Preview'
import {useShortcut} from './common/Keyboard'
import {useCheckForNewVersion} from './CheckForNewVersionHook'
import {UnhandledErrorMessage} from './UnhandledErrorMessage'
import {ROUTE_MONITOR, ROUTE_PREVIEW, ROUTE_SETTINGS} from './Routes'
import {StyleGuide} from './styleGuide/StyleGuide'

export function Nevergreen(): ReactElement {
  const {loaded, error} = useLocalConfiguration()

  const [notification, setNotification] = useState('')
  const [fontMetrics, setFontMetrics] = useState(DEFAULT_FONT_METRICS)

  const fontMetricsRef = useCallback((ref) => setFontMetrics(ref), [])

  const [menusHidden, toggleMenusHidden, showMenus] = useHideMenus()

  useServiceWorker(setNotification)
  useCheckForNewVersion(setNotification)

  const clickToShowMenu = useSelector(getClickToShowMenu)

  const hideMenusOn = clickToShowMenu
    ? {onClick: showMenus}
    : {onMouseMove: showMenus}

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
             onKeyDown={showMenus}
             {...hideMenusOn}>
          <Header hide={menusHidden}/>
          <Notification notification={notification}
                        dismiss={() => setNotification('')}
                        hide={menusHidden}/>
          <main className={styles.main} role='main'>
            <Switch>
              <Route exact path={ROUTE_MONITOR}>
                <Monitor menusHidden={menusHidden}
                         toggleMenusHidden={toggleMenusHidden}/>
              </Route>
              <Route exact path={ROUTE_PREVIEW} component={Preview}/>
              <Route path={ROUTE_SETTINGS} component={Settings}/>
              <Route exact path='/style-guide' component={StyleGuide}/>
              <Route>
                <Redirect to={ROUTE_SETTINGS}/>
              </Route>
            </Switch>
          </main>
          <Footer hide={menusHidden}/>
        </div>
      </FontMetricsContext.Provider>
    </Loading>
  )
}
