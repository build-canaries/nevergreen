import type { ReactElement } from 'react'
import { useCallback, useState } from 'react'
import { Header } from './header/Header'
import { Banner } from './Banner'
import { useServiceWorker } from './ServiceWorkerHook'
import { useHideMenus } from './HideMenusHook'
import { getClickToShowMenu } from './settings/other/OtherSettingsReducer'
import { Loading } from './common/Loading'
import { useLocalConfiguration } from './configuration/ConfigurationHook'
import { Help } from './help/Help'
import {
  DEFAULT_FONT_METRICS,
  FontMetrics,
  FontMetricsContext,
  Measurable,
} from './FontMetrics'
import { useShortcut } from './common/Keyboard'
import { useCheckForNewVersion } from './CheckForNewVersionHook'
import { useNavigationShortcuts } from './NavigationShortcutsHook'
import { Outlet, useOutletContext } from 'react-router'
import { useAppSelector } from './configuration/Hooks'
import styles from './nevergreen.scss'
import { PrimaryButton } from './common/forms/Button'

interface AppState {
  readonly menusHidden: boolean
  readonly toggleMenusHidden: (hide: boolean) => void
  readonly setBannerMessage: (message: string) => void
}

export function Nevergreen(): ReactElement {
  const { isLoading, isError, error } = useLocalConfiguration()

  const [bannerMessage, setBannerMessage] = useState('')
  const [fontMetrics, setFontMetrics] = useState(DEFAULT_FONT_METRICS)

  const fontMetricsRef = useCallback((measure: Measurable | null) => {
    if (measure) {
      setFontMetrics(measure)
    }
  }, [])

  const { menusHidden, toggleMenusHidden, showMenus } = useHideMenus()

  useServiceWorker(setBannerMessage)
  useCheckForNewVersion(setBannerMessage)
  useNavigationShortcuts()

  const clickToShowMenu = useAppSelector(getClickToShowMenu)

  useShortcut('esc', () => {
    const active = document.activeElement
    if (active && active instanceof HTMLElement) {
      active.blur()
    }
  })

  if (isError) {
    // throw to trigger "unhandled" error page for loading config errors
    throw error
  }

  const showMenusOn = clickToShowMenu
    ? { onClick: showMenus }
    : { onMouseMove: showMenus }

  return (
    <Loading dark isLoading={isLoading} title="Nevergreen" focus>
      <FontMetrics ref={fontMetricsRef} />
      <FontMetricsContext.Provider value={fontMetrics}>
        <Help />
        <div
          className={styles.nevergreen}
          tabIndex={-1}
          onKeyDown={showMenus}
          {...showMenusOn}
        >
          <PrimaryButton
            onClick={() => {
              document.getElementsByTagName('h1').item(0)?.focus()
            }}
            className={styles.skipButton}
          >
            Skip to content
          </PrimaryButton>
          <Header hide={menusHidden} />
          <Banner
            message={bannerMessage}
            onDismiss={() => {
              setBannerMessage('')
            }}
            hide={menusHidden}
          />
          <Outlet
            context={{ menusHidden, toggleMenusHidden, setBannerMessage }}
          />
        </div>
      </FontMetricsContext.Provider>
    </Loading>
  )
}

export function useNevergreenContext(): AppState {
  return useOutletContext()
}
