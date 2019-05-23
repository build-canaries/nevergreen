import {filter, validate} from '../reducers/Configuration'
import {importError, importing, importSuccess} from './ImportActionCreators'
import {isEmpty} from 'lodash'
import {Dispatch} from 'redux'
import {RecursivePartial} from '../common/Types'
import {State} from '../reducers/Reducer'

export function importData(data: RecursivePartial<State> | string) {
  return (dispatch: Dispatch) => {
    dispatch(importing())

    try {
      const configuration = filter(data)
      const validationMessages = validate(configuration)

      if (isEmpty(validationMessages)) {
        dispatch(importSuccess(configuration))
      } else {
        dispatch(importError(validationMessages))
      }
    } catch (error) {
      dispatch(importError(['Unable to import because of syntactically invalid JSON with the following errors:', error.message]))
    }
  }
}
