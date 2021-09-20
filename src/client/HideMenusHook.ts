import {useCallback, useEffect, useRef, useState} from 'react'

type HideMenusHookResponse = [
  menusHidden: boolean,
  toggleMenusHidden: (hide: boolean) => void,
  showMenus: () => void
]

const THREE_SECONDS = 3 * 1000

export function useHideMenus(): HideMenusHookResponse {
  const timer = useRef(0)
  const [menusHidden, setMenusHidden] = useState(false)
  const [hideMenusRequested, setHideMenusRequested] = useState(false)

  const showMenus = useCallback(() => {
    clearTimeout(timer.current)

    if (menusHidden) {
      setMenusHidden(false)
    }

    if (hideMenusRequested) {
      timer.current = window.setTimeout(
        () => setMenusHidden(true),
        THREE_SECONDS)
    }
  }, [menusHidden, hideMenusRequested])

  useEffect(() => {
    setMenusHidden(hideMenusRequested)
    if (!hideMenusRequested) {
      clearTimeout(timer.current)
    }
  }, [hideMenusRequested])

  return [menusHidden, setHideMenusRequested, showMenus]
}
