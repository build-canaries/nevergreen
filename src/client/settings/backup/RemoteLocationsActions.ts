import { createAction } from '@reduxjs/toolkit'
import { now } from '../../common/DateTime'
import { RemoteLocation } from './RemoteLocationsReducer'

export const addBackupLocation =
  createAction<RemoteLocation>('addBackupLocation')

export const backupExported = createAction(
  'backupExported',
  (internalId: string, externalId: string) => {
    return {
      payload: {
        internalId,
        externalId,
        timestamp: now(),
      },
    }
  }
)

export const backupImported = createAction(
  'backupImported',
  (internalId: string) => {
    return {
      payload: {
        internalId,
        timestamp: now(),
      },
    }
  }
)

export const removeBackupLocation = createAction<string>('removeBackupLocation')
