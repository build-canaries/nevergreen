import { createSlice } from '@reduxjs/toolkit'
import { configurationImported } from '../settings/backup/BackupActionCreators'
import * as t from 'io-ts'

export const migrationsRoot = 'appliedMigrations'

const AppliedMigration = t.exact(
  t.type({
    id: t.readonly(t.string),
    timestamp: t.readonly(t.string),
  })
)

export const AppliedMigrationsState = t.readonlyArray(
  AppliedMigration,
  migrationsRoot
)

export type AppliedMigration = t.TypeOf<typeof AppliedMigration>
export type AppliedMigrationsState = t.TypeOf<typeof AppliedMigrationsState>

const initialState: AppliedMigrationsState = []

const slice = createSlice({
  name: migrationsRoot,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(configurationImported, (draft, action) => {
      return action.payload.configuration.appliedMigrations ?? draft
    })
  },
})

export const { reducer } = slice
