import React, {ReactElement, useCallback, useState} from 'react'
import {Header} from './header/Header'
import {Footer} from './footer/Footer'
import {Banner} from './Banner'
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
  readonly setBannerMessage: (message: string) => void;
}

export function Nevergreen(): ReactElement {
  const {loaded, error} = useLocalConfiguration()

  const [bannerMessage, setBannerMessage] = useState('')
  const [fontMetrics, setFontMetrics] = useState(DEFAULT_FONT_METRICS)

  const fontMetricsRef = useCallback((measure: Measurable | null) => {
    if (measure) {
      setFontMetrics(measure)
    }
  }, [])

  const {menusHidden, toggleMenusHidden, showMenus} = useHideMenus()

  useServiceWorker(setBannerMessage)
  useCheckForNewVersion(setBannerMessage)
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
    <Loading dark
             loaded={loaded}
             title="Nevergreen"
             focus>
      <FontMetrics ref={fontMetricsRef}/>
      <FontMetricsContext.Provider value={fontMetrics}>
        <Help/>
        <div className={styles.nevergreen}
             tabIndex={-1}
             onKeyDown={showMenus}
             {...showMenusOn}>
          <Header hide={menusHidden}/>
          <Banner message={bannerMessage}
                  onDismiss={() => setBannerMessage('')}
                  hide={menusHidden}/>
          <main className={styles.main} role="main">
            <Outlet context={{menusHidden, toggleMenusHidden, setBannerMessage}}/>
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
