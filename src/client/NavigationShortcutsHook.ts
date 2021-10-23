import {useShortcut} from './common/Keyboard'
import {useHistory} from 'react-router-dom'
import {
  ROUTE_MONITOR,
  ROUTE_SETTINGS,
  ROUTE_SETTINGS_BACKUP,
  ROUTE_SETTINGS_DISPLAY,
  ROUTE_SETTINGS_NOTIFICATIONS,
  ROUTE_SETTINGS_SUCCESS,
  ROUTE_SETTINGS_TRACKING
} from './Routes'

export function useNavigationShortcut(keys: string | string[], route: string) {
  const history = useHistory()
  useShortcut(keys, () => history.push(route), [route, history])
}

export function useNavigationShortcuts(): void {
  useNavigationShortcut(['m', '1'], ROUTE_MONITOR)
  useNavigationShortcut([',', 's', '2'], ROUTE_SETTINGS)
  useNavigationShortcut('t', ROUTE_SETTINGS_TRACKING)
  useNavigationShortcut('v', ROUTE_SETTINGS_SUCCESS)
  useNavigationShortcut('d', ROUTE_SETTINGS_DISPLAY)
  useNavigationShortcut('b', ROUTE_SETTINGS_BACKUP)
  useNavigationShortcut('n', ROUTE_SETTINGS_NOTIFICATIONS)
}
