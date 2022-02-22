import {useShortcut} from './common/Keyboard'
import {useNavigate} from 'react-router-dom'
import {
  routeBackup,
  routeDisplay,
  routeMonitor,
  routeNotifications,
  routeSettings,
  routeSuccess,
  routeTracking
} from './AppRoutes'

export function useNavigationShortcut(keys: string | string[], route: string) {
  const navigate = useNavigate()
  useShortcut(keys, () => navigate(route, {replace: true}), [route, navigate])
}

export function useNavigationShortcuts(): void {
  useNavigationShortcut(['m', '1'], routeMonitor)
  useNavigationShortcut([',', 's', '2'], routeSettings)
  useNavigationShortcut('t', routeTracking)
  useNavigationShortcut('v', routeSuccess)
  useNavigationShortcut('d', routeDisplay)
  useNavigationShortcut('b', routeBackup)
  useNavigationShortcut('n', routeNotifications)
}
