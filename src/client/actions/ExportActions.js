import {send} from '../common/gateways/Gateway'
import {createGist, updateGist} from '../common/gateways/GitHubGateway'
import {fromJson} from '../common/Json'
import {gitHubSetUrl} from './GitHubActions'
import Immutable from 'immutable'
import _ from 'lodash'

export const EXPORTING = 'EXPORTING'
export function exporting() {
  return {type: EXPORTING}
}

export const EXPORT_SUCCESS = 'EXPORT_SUCCESS'
export function exportSuccess(messages) {
  return {
    type: EXPORT_SUCCESS,
    messages: Immutable.List(messages)
  }
}

export const EXPORT_ERROR = 'EXPORT_ERROR'
export function exportError(errors) {
  return {
    type: EXPORT_ERROR,
    errors: Immutable.List(errors)
  }
}

export function uploadToGitHub(url, description, configuration, oauthToken) {
  return function (dispatch) {
    dispatch(exporting())

    const successMessage = url ? 'Successfully updated gist' : 'Successfully created gist'
    const req = _.isEmpty(_.trim(url)) ? createGist(description, configuration, oauthToken) : updateGist(url, configuration, oauthToken)

    return send(req)
      .then((gistJson) => {
        dispatch(exportSuccess([successMessage, gistJson.url]))
        dispatch(gitHubSetUrl(gistJson.url))
      }).catch((error) => {
        const message = fromJson(error.message).message
        dispatch(exportError(['Unable to upload to GitHub because of an error:', `${error.status} - ${message}`]))
      })
  }
}
