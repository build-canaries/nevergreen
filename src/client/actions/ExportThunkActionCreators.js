import {send} from '../common/gateways/Gateway'
import {createGist, updateGist} from '../common/gateways/GitHubGateway'
import {gitHubSetGistId} from './GitHubActionCreators'
import {isBlank} from '../common/Utils'
import {exportError, exporting, exportSuccess} from './ExportActionCreators'

export function uploadToGitHub(gistId, description, configuration, oauthToken) {
  return function (dispatch) {
    dispatch(exporting())

    if (isBlank(oauthToken)) {
      return dispatch(exportError(['You must provide an access token to upload to GitHub']))
    }

    const createNewGist = isBlank(gistId)

    const req = createNewGist
      ? createGist(description, configuration, oauthToken)
      : updateGist(gistId, description, configuration, oauthToken)

    return send(req).then((gistJson) => {
      const returnedGistId = gistJson.id
      const successMessage = createNewGist
        ? `Successfully created gist ${returnedGistId}`
        : `Successfully updated gist ${returnedGistId}`

      dispatch(exportSuccess([successMessage]))
      dispatch(gitHubSetGistId(returnedGistId))
    }).catch((error) => {
      dispatch(exportError([`Unable to upload to GitHub because of an error: ${error.status} - ${error.message}`]))
    })
  }
}
