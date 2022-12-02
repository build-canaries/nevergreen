import isNil from 'lodash/isNil'
import debounce from 'lodash/debounce'
import {Dispatch} from '@reduxjs/toolkit'
import type {RootState} from '../../configuration/ReduxStore'
import {exportConfiguration} from '../../gateways/BackupGateway'
import * as logger from '../../common/Logger'
import {backupExported, remoteLocationsRoot} from './RemoteLocationsReducer'
import {toExportableConfigurationJson} from '../../configuration/Configuration'

const thirtySeconds = 1000 * 30

// exported for testing
export async function backupRaw(previousState: RootState | undefined, currentState: RootState, dispatch: Dispatch): Promise<void> {
  if (isNil(previousState)) {
    return
  }

  const previouslyExported = toExportableConfigurationJson(previousState)
  const currentExport = toExportableConfigurationJson(currentState)

  if (previouslyExported !== currentExport) {
    const remoteBackups = currentState[remoteLocationsRoot]

    await Promise.all(
      Object.keys(remoteBackups).map(async (internalId) => {
        const location = remoteBackups[internalId]

        if (location.automaticallyExport) {
          logger.info(`Attempting to automatically backup to location ${location.internalId}...`, location)

          try {
            const res = await exportConfiguration(location, currentExport)
            dispatch(backupExported(location.internalId, res.id))
          } catch (error) {
            logger.error(`The automatic export to ${location.internalId} failed!`, error)
          }
        }
      })
    )
  }
}

export const backup = debounce(backupRaw, thirtySeconds)
