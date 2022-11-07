import {createReducer} from '@reduxjs/toolkit'
import {Actions} from '../Actions'
import {ActionConfigurationImported} from '../settings/backup/BackupActionCreators'

export interface AppliedMigration {
  readonly id: string;
  readonly timestamp: string;
}

export type AppliedMigrationsState = ReadonlyArray<AppliedMigration>

export const APPLIED_MIGRATIONS_ROOT = 'appliedMigrations'

const defaultState: AppliedMigrationsState = []

export const reduce = createReducer<AppliedMigrationsState>(defaultState, (builder) => {
  builder
    .addCase(Actions.CONFIGURATION_IMPORTED, (draft, action: ActionConfigurationImported) => {
      return action.configuration[APPLIED_MIGRATIONS_ROOT]
        ? action.configuration[APPLIED_MIGRATIONS_ROOT] as AppliedMigrationsState
        : draft
    })
})
