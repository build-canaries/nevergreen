import {combineReducers} from 'redux'
import {reduce as settings, SETTINGS_ROOT, SettingsState} from './settings/SettingsReducer'
import {reduce as trays, TRAYS_ROOT, TraysState} from './tracking/TraysReducer'
import {PROJECTS_ROOT, ProjectsState, reduce as projects} from './tracking/ProjectsReducer'
import {reduce as success, SUCCESS_ROOT, SuccessState} from './success/SuccessReducer'
import {reduce as selected, SELECTED_ROOT, SelectedState} from './tracking/SelectedReducer'
import {BACKUP_ROOT, BackupState, reduce as backup} from './backup/BackupReducer'
import {
  APPLIED_MIGRATIONS_ROOT,
  AppliedMigrationsState,
  reduce as appliedMigrations
} from './configuration/MigrationsReducer'

export interface State {
  readonly [SETTINGS_ROOT]: SettingsState;
  readonly [BACKUP_ROOT]: BackupState;
  readonly [PROJECTS_ROOT]: ProjectsState;
  readonly [SELECTED_ROOT]: SelectedState;
  readonly [SUCCESS_ROOT]: SuccessState;
  readonly [TRAYS_ROOT]: TraysState;
  readonly [APPLIED_MIGRATIONS_ROOT]: AppliedMigrationsState;
}

export const reducer = combineReducers<State>({
  [SETTINGS_ROOT]: settings,
  [BACKUP_ROOT]: backup,
  [PROJECTS_ROOT]: projects,
  [SELECTED_ROOT]: selected,
  [SUCCESS_ROOT]: success,
  [TRAYS_ROOT]: trays,
  [APPLIED_MIGRATIONS_ROOT]: appliedMigrations
})
