import {send} from '../gateways/Gateway'
import {gitHubSetDescription, gitHubSetGistId} from './GitHubActionCreators'
import {isBlank} from '../common/Utils'
import {importError, importing} from './ImportActionCreators'
import {importData} from './ImportThunkActionCreators'
import {exportError, exporting, exportSuccess} from './ExportActionCreators'
import {getGistDescription, getGistId, getGitHubUrl} from '../reducers/Selectors'
import {toJson} from '../common/Json'
import {filter} from '../reducers/Configuration'
import {exportConfiguration, importConfiguration} from '../gateways/BackupGateway'

export function restoreFromGitHub() {
  return async (dispatch, getState) => {
    dispatch(importing())

    const id = getGistId(getState())
    const url = getGitHubUrl(getState())

    if (isBlank(id)) {
      dispatch(importError(['You must provide a gist ID to import from GitHub']))
    } else {
      try {
        const res = await send(importConfiguration('github', id, null, url))
        dispatch(importData(res.get('configuration')))
        dispatch(gitHubSetDescription(res.get('description')))
      } catch (error) {
        dispatch(importError([`Unable to import from GitHub because of an error: ${error.message}`]))
      }
    }
  }
}

export function uploadToGitHub(oauthToken) {
  return async (dispatch, getState) => {
    dispatch(exporting())

    const id = getGistId(getState())
    const description = getGistDescription(getState())
    const configuration = toJson(filter(getState().toJS()))
    const url = getGitHubUrl(getState())

    if (isBlank(oauthToken)) {
      dispatch(exportError(['You must provide an access token to upload to GitHub']))
    } else {
      const createNewGist = isBlank(id)

      try {
        const res = await send(exportConfiguration('github', id, description, configuration, oauthToken, url))
        const returnedGistId = res.get('id')
        const successMessage = createNewGist
          ? `Successfully created gist ${returnedGistId}`
          : `Successfully updated gist ${returnedGistId}`

        dispatch(exportSuccess([successMessage]))
        dispatch(gitHubSetGistId(returnedGistId))
      } catch (error) {
        dispatch(exportError([`Unable to upload to GitHub because of an error: ${error.message}`]))
      }
    }
  }
}
