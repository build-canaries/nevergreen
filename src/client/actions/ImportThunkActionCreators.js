import {validate, wrapConfiguration} from '../common/repo/Data'
import {importError, importing, importSuccess} from './ImportActionCreators'
import _ from 'lodash'

export function importData(data) {
  return (dispatch) => {
    dispatch(importing())

    try {
      const configuration = wrapConfiguration(data)
      const validationMessages = validate(configuration)

      if (_.isEmpty(validationMessages)) {
        dispatch(importSuccess(configuration))
      } else {
        dispatch(importError(validationMessages))
      }
    } catch (error) {
      dispatch(importError(['Unable to import because of syntactically invalid JSON with the following errors:', error.message]))
    }
  }
}
