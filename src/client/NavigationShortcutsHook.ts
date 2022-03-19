import {useShortcut} from './common/Keyboard'
import {useNavigate} from 'react-router-dom'
import {
  ROUTE_BACKUP,
  ROUTE_DISPLAY,
  ROUTE_MONITOR,
  ROUTE_NOTIFICATIONS,
  ROUTE_SETTINGS,
  ROUTE_SUCCESS,
  ROUTE_TRACKING
} from './AppRoutes'

export function useNavigationShortcut(keys: string | string[], route: string) {
  const navigate = useNavigate()
  useShortcut(keys, () => navigate(route, {replace: true}), [route, navigate])
}

export function useNavigationShortcuts(): void {
  useNavigationShortcut(['m', '1'], ROUTE_MONITOR)
  useNavigationShortcut([',', 's', '2'], ROUTE_SETTINGS)
  useNavigationShortcut('t', ROUTE_TRACKING)
  useNavigationShortcut('v', ROUTE_SUCCESS)
  useNavigationShortcut('d', ROUTE_DISPLAY)
  useNavigationShortcut('b', ROUTE_BACKUP)
  useNavigationShortcut('n', ROUTE_NOTIFICATIONS)
}
