import _ from 'lodash'
import {createGist, getGist, getTruncatedFile, send, updateGist} from '../gateways/GitHubGateway'
import {gitHubSetDescription, gitHubSetGistId} from './GitHubActionCreators'
import {isBlank} from '../common/Utils'
import {importError, importing} from './ImportActionCreators'
import {importData} from './ImportThunkActionCreators'
import {exportError, exporting, exportSuccess} from './ExportActionCreators'
import {getGistDescription, getGistId} from '../reducers/Selectors'
import {toJson} from '../common/Json'
import {filter} from '../reducers/Configuration'

const TEN_MEGS = 10485760 // bytes

function handleGistResponse(dispatch, res) {
  const configuration = res.getIn(['files', 'configuration.json'])

  if (_.isNil(configuration)) {
    throw new Error('gist does not contain the required configuration.json file')

  } else if (configuration.get('truncated')) {
    const size = configuration.get('size')
    if (size > TEN_MEGS) {
      throw new Error(`gist configuration.json file is too big to fetch without git cloning, size ${size} bytes`)
    } else {
      dispatch(gitHubSetDescription(res.get('description')))
      return send(getTruncatedFile(configuration.get('raw_url')))
    }

  } else {
    dispatch(gitHubSetDescription(res.get('description')))
    return configuration.get('content')
  }
}

export function restoreFromGitHub() {
  return async (dispatch, getState) => {
    dispatch(importing())

    const id = getGistId(getState())

    if (isBlank(id)) {
      dispatch(importError(['You must provide a gist ID to import from GitHub']))
    } else {
      try {
        const res = await send(getGist(id))
        const content = await handleGistResponse(dispatch, res)
        dispatch(importData(content))
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

    if (isBlank(oauthToken)) {
      dispatch(exportError(['You must provide an access token to upload to GitHub']))
    } else {
      const createNewGist = isBlank(id)

      const req = createNewGist
        ? createGist(description, configuration, oauthToken)
        : updateGist(id, description, configuration, oauthToken)

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
