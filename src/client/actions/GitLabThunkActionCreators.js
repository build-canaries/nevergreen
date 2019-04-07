import {exportError, exporting, exportSuccess} from './ExportActionCreators'
import {importError, importing} from './ImportActionCreators'
import {getGitLabSnippetId, getGitLabUrl} from '../reducers/Selectors'
import {toJson} from '../common/Json'
import {filter} from '../reducers/Configuration'
import {isBlank} from '../common/Utils'
import {gitLabSetSnippetId} from './GitLabActionCreators'
import {createSnippet, getSnippetContent, getSnippetMeta, updateSnippet} from '../gateways/GitLabGateway'
import {send} from '../gateways/Gateway'
import {importData} from './ImportThunkActionCreators'

export function restoreFromGitLab(accessToken) {
  return async (dispatch, getState) => {
    dispatch(importing())

    const url = getGitLabUrl(getState())
    const snippetId = getGitLabSnippetId(getState())

    if (isBlank(snippetId)) {
      dispatch(importError(['You must provide a snippet ID to import from GitLab']))
    } else {
      try {
        const resMeta = await send(getSnippetMeta(url, snippetId, accessToken))
        handleSnippetResponse(resMeta)

        const content = await send(getSnippetContent(url, snippetId, accessToken))
        dispatch(importData(content))
      } catch (error) {
        dispatch(importError([`Unable to import from GitLab because of an error: ${error.message}`]))
      }
    }
  }
}

function handleSnippetResponse(res) {
  const configuration = res.get('file_name')

  if (configuration !== 'configuration.json') {
    throw new Error('snippet does not contain the required configuration.json file')
  }
}

export function uploadToGitLab(accessToken) {
  return async (dispatch, getState) => {
    dispatch(exporting())

    const url = getGitLabUrl(getState())
    const id = getGitLabSnippetId(getState())
    const configuration = toJson(filter(getState().toJS()))

    if (isBlank(accessToken)) {
      dispatch(exportError(['You must provide an access token to upload to GitLab']))
    } else {
      const createNewSnippet = isBlank(id)

      const req = createNewSnippet
        ? createSnippet(url, configuration, accessToken)
        : updateSnippet(url, id, configuration, accessToken)

      try {
        const snippetJson = await send(req)
        const returnedSnippetId = snippetJson.get('id').toString()
        const successMessage = createNewSnippet
          ? `Successfully created snippet ${returnedSnippetId}`
          : `Successfully updated snippet ${returnedSnippetId}`

        dispatch(exportSuccess([successMessage]))
        dispatch(gitLabSetSnippetId(returnedSnippetId))
      } catch (error) {
        dispatch(exportError([`Unable to upload to GitLab because of an error: ${error.message}`]))
      }
    }
  }
}
