import {createSlice} from '@reduxjs/toolkit'
import {configurationImported} from '../settings/backup/BackupActionCreators'

export interface AppliedMigration {
  readonly id: string;
  readonly timestamp: string;
}

export type AppliedMigrationsState = ReadonlyArray<AppliedMigration>

export const migrationsRoot = 'appliedMigrations'

const initialState: AppliedMigrationsState = []

const slice = createSlice({
  name: migrationsRoot,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(configurationImported, (draft, action) => {
        return action.payload.appliedMigrations ?? draft
      })
  }
})

export const {reducer} = slice
