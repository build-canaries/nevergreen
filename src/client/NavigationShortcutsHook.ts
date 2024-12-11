import { useShortcut } from './common/Keyboard'
import { useNavigate } from 'react-router-dom'
import { RoutePaths } from './AppRoutes'

export function useNavigationShortcut(keys: string | string[], route: string) {
  const navigate = useNavigate()
  useShortcut(keys, () => {
    navigate(route, { replace: true })
  }, [route, navigate])
}

export function useNavigationShortcuts(): void {
  useNavigationShortcut(['m', '1'], RoutePaths.monitor)
  useNavigationShortcut([',', 's', '2'], RoutePaths.settings)
  useNavigationShortcut('t', RoutePaths.tracking)
  useNavigationShortcut('v', RoutePaths.success)
  useNavigationShortcut('d', RoutePaths.display)
  useNavigationShortcut('b', RoutePaths.backup)
  useNavigationShortcut('n', RoutePaths.notifications)
  useNavigationShortcut('p', RoutePaths.prognosis)
}
