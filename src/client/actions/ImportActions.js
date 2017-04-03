import Immutable from 'immutable'
import _ from 'lodash'
import {validate, filter} from '../common/repo/Data'
import {fromJson} from '../common/Json'
import {migrate} from '../common/repo/Migrations'
import {send} from '../common/gateways/Gateway'
import {getGist} from '../common/gateways/GitHubGateway'

export const IMPORTING = 'IMPORTING'
export function importing() {
  return {type: IMPORTING}
}

export const IMPORT_ERROR = 'IMPORT_ERROR'
export function importError(errors) {
  return {
    type: IMPORT_ERROR,
    errors: Immutable.List(errors)
  }
}

export const IMPORT_SUCCESS = 'IMPORT_SUCCESS'
export function importSuccess(configuration) {
  return {
    type: IMPORT_SUCCESS,
    data: Immutable.fromJS(configuration),
    messages: Immutable.List(['Successfully imported'])
  }
}

export function importData(jsonData) {
  return function (dispatch) {
    dispatch(importing())

    try {
      const data = filter(migrate(fromJson(jsonData)))
      const validationMessages = validate(data)

      if (_.isEmpty(validationMessages)) {
        dispatch(importSuccess(data))
      } else {
        dispatch(importError(validationMessages))
      }
    } catch (e) {
      dispatch(importError(['Unable to import because of syntactically invalid JSON with the following errors:', e]))
    }
  }
}

export function restoreFromGitHub(location, oauthToken) {
  return function (dispatch) {
    dispatch(importing())

    return send(getGist(location, oauthToken))
      .then((gistJson) => dispatch(importData(gistJson.files['configuration.json'].content)))
      .catch((error) => {
        const message = fromJson(error.message).message
        dispatch(importError(['Unable to restore from GitHub because of an error:', `${error.status} - ${message}`]))
      })
  }
}
