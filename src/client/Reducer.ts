import {combineReducers} from 'redux'
import {reduce as settings, SETTINGS_ROOT, SettingsState} from './settings/SettingsReducer'
import {FEEDS_ROOT, FeedsState, reduce as feeds} from './settings/tracking/FeedsReducer'
import {reduce as success, SUCCESS_ROOT, SuccessState} from './settings/success/SuccessReducer'
import {reduce as selected, SELECTED_ROOT, SelectedState} from './settings/tracking/SelectedReducer'
import {
  APPLIED_MIGRATIONS_ROOT,
  AppliedMigrationsState,
  reduce as appliedMigrations
} from './configuration/MigrationsReducer'
import {
  BACKUP_REMOTE_LOCATIONS_ROOT,
  reduce as backupRemoteLocations,
  RemoteLocationsState
} from './settings/backup/RemoteLocationsReducer'
import {
  NOTIFICATIONS_ROOT,
  NotificationsState,
  reduce as notifications
} from './settings/notifications/NotificationsReducer'

export interface State {
  readonly [SETTINGS_ROOT]: SettingsState;
  readonly [SELECTED_ROOT]: SelectedState;
  readonly [SUCCESS_ROOT]: SuccessState;
  readonly [FEEDS_ROOT]: FeedsState;
  readonly [APPLIED_MIGRATIONS_ROOT]: AppliedMigrationsState;
  readonly [BACKUP_REMOTE_LOCATIONS_ROOT]: RemoteLocationsState;
  readonly [NOTIFICATIONS_ROOT]: NotificationsState;
}

export const reducer = combineReducers<State>({
  [SETTINGS_ROOT]: settings,
  [SELECTED_ROOT]: selected,
  [SUCCESS_ROOT]: success,
  [FEEDS_ROOT]: feeds,
  [APPLIED_MIGRATIONS_ROOT]: appliedMigrations,
  [BACKUP_REMOTE_LOCATIONS_ROOT]: backupRemoteLocations,
  [NOTIFICATIONS_ROOT]: notifications
})
