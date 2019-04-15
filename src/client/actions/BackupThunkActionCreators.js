import {send} from '../gateways/Gateway'
import {isBlank} from '../common/Utils'
import {importError, importing} from './ImportActionCreators'
import {importData} from './ImportThunkActionCreators'
import {exportError, exporting, exportSuccess} from './ExportActionCreators'
import {getBackupDescription, getBackupId, getBackupUrl} from '../reducers/Selectors'
import {toJson} from '../common/Json'
import {filter} from '../reducers/Configuration'
import {exportConfiguration, importConfiguration} from '../gateways/BackupGateway'
import {backupSetDescription, backupSetId} from './BackupActionCreators'

export function restore(from, accessToken) {
  return async (dispatch, getState) => {
    dispatch(importing())

    const id = getBackupId(from, getState())
    const url = getBackupUrl(from, getState())

    if (isBlank(id)) {
      dispatch(importError(['You must provide an ID to import']))
    } else {
      try {
        const res = await send(importConfiguration(from, id, accessToken, url))
        dispatch(importData(res.get('configuration')))
        dispatch(backupSetDescription(res.get('description')))
      } catch (error) {
        dispatch(importError([`Unable to import from ${from} because of an error: ${error.message}`]))
      }
    }
  }
}

export function upload(where, accessToken) {
  return async (dispatch, getState) => {
    dispatch(exporting())

    const id = getBackupId(where, getState())
    const url = getBackupUrl(where, getState())
    const description = getBackupDescription(where, getState())
    const configuration = toJson(filter(getState().toJS()))

    if (isBlank(accessToken)) {
      dispatch(exportError(['You must provide an access token to upload']))
    } else {
      try {
        const res = await send(exportConfiguration(where, id, description, configuration, accessToken, url))
        const returnedId = res.get('id')
        dispatch(exportSuccess(['Successfully exported configuration']))
        dispatch(backupSetId(where, returnedId))
      } catch (error) {
        dispatch(exportError([`Unable to upload to ${where} because of an error: ${error.message}`]))
      }
    }
  }
}
