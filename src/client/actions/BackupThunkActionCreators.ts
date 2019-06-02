import {send} from '../gateways/Gateway'
import {isBlank} from '../common/Utils'
import {importError, importing} from './ImportActionCreators'
import {importData} from './ImportThunkActionCreators'
import {exportError, exporting, exportSuccess} from './ExportActionCreators'
import {toJson} from '../common/Json'
import {filter} from '../reducers/Configuration'
import {exportConfiguration, ExportResponse, importConfiguration, ImportResponse} from '../gateways/BackupGateway'
import {BackupLocation, backupSetDescription, backupSetId} from './BackupActionCreators'
import {AnyAction, Dispatch} from 'redux'
import {State} from '../reducers/Reducer'
import {ThunkDispatch} from 'redux-thunk'
import {getBackupDescription, getBackupId, getBackupUrl} from '../reducers/BackupReducer'

export function restore(from: BackupLocation, accessToken: string) {
  return async (dispatch: ThunkDispatch<State, {}, AnyAction>, getState: () => State) => {
    dispatch(importing())

    const id = getBackupId(from, getState())
    const url = getBackupUrl(from, getState())

    if (isBlank(id)) {
      dispatch(importError(['You must provide an ID to import']))
    } else {
      try {
        const res = await send<ImportResponse>(importConfiguration(from, id, accessToken, url))
        dispatch(importData(res.configuration))
        dispatch(backupSetDescription(from, res.description))
      } catch (error) {
        dispatch(importError([`Unable to import from ${from} because of an error: ${error.message}`]))
      }
    }
  }
}

export function upload(where: BackupLocation, accessToken: string) {
  return async (dispatch: Dispatch, getState: () => State) => {
    dispatch(exporting())

    const id = getBackupId(where, getState())
    const url = getBackupUrl(where, getState())
    const description = getBackupDescription(where, getState())
    const configuration = toJson(filter(getState()))

    if (isBlank(accessToken)) {
      dispatch(exportError(['You must provide an access token to upload']))
    } else {
      try {
        const res = await send<ExportResponse>(exportConfiguration(where, id, description, configuration, accessToken, url))
        const returnedId = res.id
        dispatch(exportSuccess(['Successfully exported configuration']))
        dispatch(backupSetId(where, returnedId))
      } catch (error) {
        dispatch(exportError([`Unable to upload to ${where} because of an error: ${error.message}`]))
      }
    }
  }
}
