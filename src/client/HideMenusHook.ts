import { useCallback, useEffect, useRef, useState } from 'react'

interface HideMenusHookResponse {
  readonly menusHidden: boolean
  readonly toggleMenusHidden: (hide: boolean) => void
  readonly showMenus: () => void
}

const fiveSeconds = 5 * 1000

export function useHideMenus(): HideMenusHookResponse {
  const timer = useRef(0)
  const [menusHidden, setMenusHidden] = useState(false)
  const [hideMenusRequested, toggleMenusHidden] = useState(false)

  const showMenus = useCallback(() => {
    clearTimeout(timer.current)

    if (menusHidden) {
      setMenusHidden(false)
    }

    if (hideMenusRequested) {
      timer.current = window.setTimeout(() => {
        setMenusHidden(true)
      }, fiveSeconds)
    }
  }, [menusHidden, hideMenusRequested])

  useEffect(() => {
    setMenusHidden(hideMenusRequested)
    if (!hideMenusRequested) {
      clearTimeout(timer.current)
    }
  }, [hideMenusRequested])

  return { menusHidden, toggleMenusHidden, showMenus }
}
