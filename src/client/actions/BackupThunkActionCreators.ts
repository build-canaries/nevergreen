import {send} from '../gateways/Gateway'
import {isBlank} from '../common/Utils'
import {importError, importing} from './ImportActionCreators'
import {importData} from './ImportThunkActionCreators'
import {importConfiguration, ImportResponse} from '../gateways/BackupGateway'
import {BackupLocation, backupSetDescription} from './BackupActionCreators'
import {AnyAction} from 'redux'
import {State} from '../reducers/Reducer'
import {ThunkDispatch} from 'redux-thunk'
import {getBackupId, getBackupUrl} from '../reducers/BackupReducer'

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
