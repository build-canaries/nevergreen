import React, {ReactElement, useCallback, useState} from 'react'
import {Header} from './header/Header'
import {Footer} from './footer/Footer'
import {Notification} from './Notification'
import styles from './nevergreen.scss'
import {useServiceWorker} from './ServiceWorkerHook'
import {useHideMenus} from './HideMenusHook'
import {useSelector} from 'react-redux'
import {getClickToShowMenu} from './settings/SettingsReducer'
import {Loading} from './common/Loading'
import {useLocalConfiguration} from './configuration/ConfigurationHook'
import {Help} from './help/Help'
import {DEFAULT_FONT_METRICS, FontMetrics, FontMetricsContext, Measurable} from './FontMetrics'
import {useShortcut} from './common/Keyboard'
import {useCheckForNewVersion} from './CheckForNewVersionHook'
import {UnhandledErrorMessage} from './UnhandledErrorMessage'
import {useNavigationShortcuts} from './NavigationShortcutsHook'
import {Outlet, useOutletContext} from 'react-router-dom'

interface AppState {
  readonly menusHidden: boolean;
  readonly toggleMenusHidden: (hide: boolean) => void;
  readonly setNotification: (notification: string) => void;
}

export function Nevergreen(): ReactElement {
  const {loaded, error} = useLocalConfiguration()

  const [notification, setNotification] = useState('')
  const [fontMetrics, setFontMetrics] = useState(DEFAULT_FONT_METRICS)

  const fontMetricsRef = useCallback((ref: Measurable) => setFontMetrics(ref), [])

  const {menusHidden, toggleMenusHidden, showMenus} = useHideMenus()

  useServiceWorker(setNotification)
  useCheckForNewVersion(setNotification)
  useNavigationShortcuts()

  const clickToShowMenu = useSelector(getClickToShowMenu)

  useShortcut('esc', () => {
    const active = document.activeElement as HTMLElement
    if (active && active.blur) {
      active.blur()
    }
  })

  if (error) {
    return <UnhandledErrorMessage/>
  }

  const showMenusOn = clickToShowMenu
    ? {onClick: showMenus}
    : {onMouseMove: showMenus}

  return (
    <Loading dark loaded={loaded}>
      <FontMetrics ref={fontMetricsRef}/>
      <FontMetricsContext.Provider value={fontMetrics}>
        <Help/>
        <div className={styles.nevergreen}
             tabIndex={-1}
             onKeyDown={showMenus}
             {...showMenusOn}>
          <Header hide={menusHidden}/>
          <Notification notification={notification}
                        onDismiss={() => setNotification('')}
                        hide={menusHidden}/>
          <main className={styles.main} role='main'>
            <Outlet context={{menusHidden, toggleMenusHidden, setNotification}}/>
          </main>
          <Footer hide={menusHidden}/>
        </div>
      </FontMetricsContext.Provider>
    </Loading>
  )
}

export function useNevergreenContext(): AppState {
  return useOutletContext()
}
