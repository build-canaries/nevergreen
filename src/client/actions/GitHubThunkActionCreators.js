import _ from 'lodash'
import {send} from '../common/gateways/Gateway'
import {createGist, getGist, getTruncatedFile, updateGist} from '../common/gateways/GitHubGateway'
import {gitHubSetDescription, gitHubSetGistId} from './GitHubActionCreators'
import {isBlank} from '../common/Utils'
import {importError, importing} from './ImportActionCreators'
import {importData} from './ImportThunkActionCreators'
import {exportError, exporting, exportSuccess} from './ExportActionCreators'

const TEN_MEGS = 10485760 // bytes

function handleGistResponse(dispatch, res) {
  const configuration = res.files['configuration.json']

  if (_.isNil(configuration)) {
    throw {message: 'gist does not contain the required configuration.json file'}

  } else if (configuration.truncated) {
    if (configuration.size > TEN_MEGS) {
      throw {message: `gist configuration.json file is too big to fetch without git cloning, size ${configuration.size} bytes`}
    } else {
      dispatch(gitHubSetDescription(res.description))
      return send(getTruncatedFile(configuration.raw_url))
    }

  } else {
    dispatch(gitHubSetDescription(res.description))
    return configuration.content
  }
}

export function restoreFromGitHub(gistId) {
  return function (dispatch) {
    dispatch(importing())

    if (isBlank(gistId)) {
      return dispatch(importError(['You must provide a gist ID to import from GitHub']))
    }

    return send(getGist(gistId)).then((res) => {
      return handleGistResponse(dispatch, res)
    }).then((content) => {
      dispatch(importData(content))
    }).catch((error) => {
      dispatch(importError(['Unable to import from GitHub because of an error:', error.message]))
    })
  }
}

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
