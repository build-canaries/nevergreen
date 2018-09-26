import _ from 'lodash'
import {filter, validate} from '../common/repo/Data'
import {fromJson} from '../common/Json'
import {migrate} from '../common/repo/Migrations'
import {importError, importing, importSuccess} from './ImportActionCreators'

export function importData(jsonData) {
  return (dispatch) => {
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
