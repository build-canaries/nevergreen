import {exportError, exporting, exportSuccess} from './ExportActionCreators'
import {importError, importing} from './ImportActionCreators'
import {gitLabUrl, gitLabSnippetId, gitLabTitle} from '../reducers/Selectors'
import {toJson} from '../common/Json'
import {filter} from '../reducers/Configuration'
import {isBlank} from '../common/Utils'
import {gitLabSetSnippetId, gitLabSetTitle} from './GitLabActionCreators'
import {createSnippet, updateSnippet, getSnippetMeta, getSnippetContent, send} from '../gateways/GitLabGateway'
import {importData} from './ImportThunkActionCreators'

export function restoreFromGitLab(accessToken) {
  return async (dispatch, getState) => {
    dispatch(importing())

    const url = gitLabUrl(getState())
    const snippetId = gitLabSnippetId(getState())

    if (isBlank(snippetId)) {
      dispatch(importError(['You must provide a snippet ID to import from GitLab']))
    } else {
      try {
        const resMeta = await send(getSnippetMeta(url, snippetId, accessToken))
        await handleSnippetResponse(dispatch, resMeta)

        const content = await send(getSnippetContent(url, snippetId, accessToken))
        dispatch(importData(content))
      } catch (error) {
        dispatch(importError([`Unable to import from GitLab because of an error: ${error.message}`]))
      }
    }
  }
}

function handleSnippetResponse(dispatch, res) {
  const configuration = res.get('file_name')

  if (configuration !== 'configuration.json') {
    throw new Error('snippet does not contain the required configuration.json file')
  } else {
    dispatch(gitLabSetTitle(res.get('title')))
  }
}

export function uploadToGitLab(accessToken) {
    return async (dispatch, getState) => {
      dispatch(exporting())
  
      const url = gitLabUrl(getState())
      const id = gitLabSnippetId(getState())
      const title = gitLabTitle(getState())
      const configuration = toJson(filter(getState().toJS()))
  
      if (isBlank(accessToken)) {
        dispatch(exportError(['You must provide an access token to upload to GitLab']))
      } else {
        const createNewSnippet = isBlank(id)
  
        const req = createNewSnippet
          ? createSnippet(url, title, configuration, accessToken)
          : updateSnippet(url, id, title, configuration, accessToken)
  
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