import Immutable from 'immutable'
import _ from 'lodash'
import {filter, validate} from '../common/repo/Data'
import {fromJson} from '../common/Json'
import {migrate} from '../common/repo/Migrations'
import {send} from '../common/gateways/Gateway'
import {getGist, getTruncatedFile} from '../common/gateways/GitHubGateway'
import {gitHubSetDescription} from './GitHubActionCreators'
import {isBlank} from '../common/Utils'
import {IMPORT_ERROR, IMPORT_SUCCESS, IMPORTING} from './Actions'

const TEN_MEGS = 10485760

export function importing() {
  return {type: IMPORTING}
}

export function importError(errors) {
  return {type: IMPORT_ERROR, errors: Immutable.List(errors)}
}

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

export function restoreFromGitHub(gistId) {
  return function (dispatch) {
    dispatch(importing())

    if (isBlank(gistId)) {
      dispatch(importError(['Unable to import from GitHub because of an error:', 'gist ID is required']))
      return
    }

    return send(getGist(gistId)).then((res) => {
      const configuration = res.files['configuration.json']
      if (_.isNil(configuration)) {
        throw {message: 'gist did not contain the required configuration.json file'}
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
    }).then((content) => {
      dispatch(importData(content))
    }).catch((error) => {
      dispatch(importError(['Unable to import from GitHub because of an error:', error.message]))
    })
  }
}
