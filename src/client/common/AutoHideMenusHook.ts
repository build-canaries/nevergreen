import { useEffect } from 'react'
import { useNevergreenContext } from '../Nevergreen'

export function useAutoHideMenus(): boolean {
  const { menusHidden, toggleMenusHidden } = useNevergreenContext()

  useEffect(() => {
    toggleMenusHidden(true)
    return () => {
      toggleMenusHidden(false)
    }
  }, [toggleMenusHidden])

  return menusHidden
}
