import {send} from '../common/gateways/Gateway'
import {createGist, updateGist} from '../common/gateways/GitHubGateway'
import {fromJson} from '../common/Json'
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

    const successMessage = isBlank(gistId) ? 'Successfully updated gist' : 'Successfully created gist'
    const req = isBlank(gistId)
      ? createGist(description, configuration, oauthToken)
      : updateGist(gistId, description, configuration, oauthToken)

    return send(req).then((gistJson) => {
      dispatch(exportSuccess([successMessage, gistJson.id]))
      dispatch(gitHubSetGistId(gistJson.id))
    }).catch((error) => {
      const message = fromJson(error.message).message
      dispatch(exportError(['Unable to upload to GitHub because of an error:', `${error.status} - ${message}`]))
    })
  }
}
