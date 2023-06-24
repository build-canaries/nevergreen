import { createSlice } from '@reduxjs/toolkit'
import { configurationImported } from '../settings/backup/BackupActionCreators'
import { z } from 'zod'

export const migrationsRoot = 'appliedMigrations'

const AppliedMigration = z.object({
  id: z.string(),
  timestamp: z.string(),
})

export const AppliedMigrationsState = z.array(AppliedMigration)

export type AppliedMigration = z.infer<typeof AppliedMigration>
export type AppliedMigrationsState = z.infer<typeof AppliedMigrationsState>

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
