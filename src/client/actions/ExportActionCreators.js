import {send} from '../common/gateways/Gateway'
import {createGist, updateGist} from '../common/gateways/GitHubGateway'
import {gitHubSetGistId} from './GitHubActionCreators'
import Immutable from 'immutable'
import {isBlank} from '../common/Utils'
import {EXPORT_ERROR, EXPORT_SUCCESS, EXPORTING} from './Actions'

export function exporting() {
  return {type: EXPORTING}
}

export function exportSuccess(messages) {
  return {type: EXPORT_SUCCESS, messages: Immutable.List(messages)}
}

export function exportError(errors) {
  return {type: EXPORT_ERROR, errors: Immutable.List(errors)}
}

export function uploadToGitHub(gistId, description, configuration, oauthToken) {
  return function (dispatch) {
    dispatch(exporting())

    if (isBlank(oauthToken)) {
      return dispatch(exportError(['You must provide an access token to upload to GitHub']))
    }

    const req = isBlank(gistId)
      ? createGist(description, configuration, oauthToken)
      : updateGist(gistId, description, configuration, oauthToken)

    return send(req).then((gistJson) => {
      const gistId = gistJson.id
      const successMessage = isBlank(gistId)
        ? `Successfully updated gist with ID ${gistId}`
        : `Successfully created gist, ID ${gistId}`

      dispatch(exportSuccess([successMessage]))
      dispatch(gitHubSetGistId(gistId))
    }).catch((error) => {
      dispatch(exportError([`Unable to upload to GitHub because of an error: ${error.status} - ${error.message}`]))
    })
  }
}
