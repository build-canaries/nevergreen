import _ from 'lodash'
import {createGist, getGist, getTruncatedFile, send, updateGist} from '../common/gateways/GitHubGateway'
import {gitHubSetDescription, gitHubSetGistId} from './GitHubActionCreators'
import {isBlank} from '../common/Utils'
import {importError, importing} from './ImportActionCreators'
import {importData} from './ImportThunkActionCreators'
import {exportError, exporting, exportSuccess} from './ExportActionCreators'
import {NevergreenError} from '../common/gateways/NevergreenGateway'

const TEN_MEGS = 10485760 // bytes

function handleGistResponse(dispatch, res) {
  const configuration = res.getIn(['files', 'configuration.json'])

  if (_.isNil(configuration)) {
    throw new NevergreenError({message: 'gist does not contain the required configuration.json file'})

  } else if (configuration.get('truncated')) {
    const size = configuration.get('size')
    if (size > TEN_MEGS) {
      throw new NevergreenError({message: `gist configuration.json file is too big to fetch without git cloning, size ${size} bytes`})
    } else {
      dispatch(gitHubSetDescription(res.get('description')))
      return send(getTruncatedFile(configuration.get('raw_url')))
    }

  } else {
    dispatch(gitHubSetDescription(res.get('description')))
    return configuration.get('content')
  }
}

export function restoreFromGitHub(gistId) {
  return async (dispatch) => {
    dispatch(importing())

    if (isBlank(gistId)) {
      dispatch(importError(['You must provide a gist ID to import from GitHub']))
    } else {
      try {
        const res = await send(getGist(gistId))
        const content = await handleGistResponse(dispatch, res)
        dispatch(importData(content))
      } catch (error) {
        dispatch(importError([`Unable to import from GitHub because of an error: ${error.get('message')}`]))
      }
    }
  }
}

export function uploadToGitHub(gistId, description, configuration, oauthToken) {
  return async (dispatch) => {
    dispatch(exporting())

    if (isBlank(oauthToken)) {
      dispatch(exportError(['You must provide an access token to upload to GitHub']))
    } else {
      const createNewGist = isBlank(gistId)

      const req = createNewGist
        ? createGist(description, configuration, oauthToken)
        : updateGist(gistId, description, configuration, oauthToken)

      try {
        const gistJson = await send(req)
        const returnedGistId = gistJson.get('id')
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
