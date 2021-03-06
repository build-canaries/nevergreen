import {createReducer} from '@reduxjs/toolkit'
import {Actions} from '../Actions'
import {ActionConfigurationImported} from '../settings/backup/BackupActionCreators'

export interface AppliedMigration {
  readonly id: string;
  readonly timestamp: string;
}

export type AppliedMigrationsState = ReadonlyArray<AppliedMigration>

export const APPLIED_MIGRATIONS_ROOT = 'appliedMigrations'

const DEFAULT_STATE: AppliedMigrationsState = []

export const reduce = createReducer<AppliedMigrationsState>(DEFAULT_STATE, {
  [Actions.CONFIGURATION_IMPORTED]: (draft, action: ActionConfigurationImported) => {
    return action.configuration[APPLIED_MIGRATIONS_ROOT]
      ? action.configuration[APPLIED_MIGRATIONS_ROOT] as AppliedMigrationsState
      : draft
  }
})
