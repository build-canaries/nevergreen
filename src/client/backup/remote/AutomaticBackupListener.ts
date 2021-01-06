import isNil from 'lodash/isNil'
import debounce from 'lodash/debounce'
import {Dispatch} from '@reduxjs/toolkit'
import {State} from '../../Reducer'
import {send} from '../../gateways/Gateway'
import {exportConfigurationNew} from '../../gateways/BackupGateway'
import {backupExported} from './RemoteLocationActionCreators'
import * as logger from '../../common/Logger'
import {BACKUP_REMOTE_LOCATIONS_ROOT} from './RemoteLocationsReducer'
import {toExportableConfigurationJson} from '../../configuration/Configuration'

const THIRTY_SECONDS = 1000 * 30

// exported for testing
export async function backupRaw(previousState: State | undefined, currentState: State, dispatch: Dispatch): Promise<void> {
  if (isNil(previousState)) {
    return
  }

  const previouslyExported = toExportableConfigurationJson(previousState)
  const currentExport = toExportableConfigurationJson(currentState)

  if (previouslyExported !== currentExport) {
    const remoteBackups = currentState[BACKUP_REMOTE_LOCATIONS_ROOT]

    await Promise.all(
      Object.keys(remoteBackups).map(async (internalId) => {
        const location = remoteBackups[internalId]

        if (location.automaticallyExport) {
          logger.info(`Attempting to automatically backup to location ${location.internalId}...`, location)

          try {
            const res = await send(exportConfigurationNew(location, currentExport))
            dispatch(backupExported(location.internalId, res.id))
          } catch (error) {
            logger.error(`The automatic export to ${location.internalId} failed!`, error)
          }
        }
      })
    )
  }
}

export const backup = debounce(backupRaw, THIRTY_SECONDS)
