import {EXPORT_ROOT, reduce} from '../../../src/client/reducers/ExportReducer'
import {EXPORT_ERROR, EXPORT_SUCCESS, EXPORTING, NAVIGATED} from '../../../src/client/actions/Actions'
import {fromJS, Map} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {getExportErrors, getExportInfos, getExportLoaded} from '../../../src/client/reducers/Selectors'
import {exportError, exporting, exportSuccess} from '../../../src/client/actions/ExportActionCreators'
import {navigated} from '../../../src/client/actions/NevergreenActionCreators'

describe('ExportReducer', () => {

  const reducer = combineReducers({
    [EXPORT_ROOT]: reduce
  })

  function state(existing) {
    return fromJS({[EXPORT_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state({foo: 'bar'})
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(EXPORTING, () => {

    test('should set the loaded property', () => {
      const existingState = state({loaded: true})
      const action = exporting()
      const newState = reducer(existingState, action)
      expect(getExportLoaded(newState)).toBeFalsy()
    })

    test('should delete the infos property', () => {
      const existingState = state({infos: Map()})
      const action = exporting()
      const newState = reducer(existingState, action)
      expect(getExportInfos(newState)).toBeUndefined()
    })

    test('should delete the errors property', () => {
      const existingState = state({errors: Map()})
      const action = exporting()
      const newState = reducer(existingState, action)
      expect(getExportErrors(newState)).toBeUndefined()
    })
  })

  describe(EXPORT_SUCCESS, () => {

    test('should set the loaded property', () => {
      const existingState = state({loaded: false})
      const action = exportSuccess([])
      const newState = reducer(existingState, action)
      expect(getExportLoaded(newState)).toBeTruthy()
    })

    test('should set the infos property', () => {
      const existingState = state({})
      const action = exportSuccess(['some-message'])
      const newState = reducer(existingState, action)
      expect(getExportInfos(newState).toJS()).toEqual(['some-message'])
    })

    test('should delete the errors property', () => {
      const existingState = state({errors: []})
      const action = exportSuccess([])
      const newState = reducer(existingState, action)
      expect(getExportErrors(newState)).toBeUndefined()
    })
  })

  describe(EXPORT_ERROR, () => {

    test('should set the loaded property', () => {
      const existingState = state({loaded: false})
      const action = exportError([])
      const newState = reducer(existingState, action)
      expect(getExportLoaded(newState)).toBeTruthy()
    })

    test('should delete the infos property', () => {
      const existingState = state({infos: []})
      const action = exportError([])
      const newState = reducer(existingState, action)
      expect(getExportInfos(newState)).toBeUndefined()
    })

    test('should set the errors property', () => {
      const existingState = state({})
      const action = exportError(['some-error'])
      const newState = reducer(existingState, action)
      expect(getExportErrors(newState).toJS()).toEqual(['some-error'])
    })
  })

  describe(NAVIGATED, () => {

    test('should delete the infos property', () => {
      const existingState = state({infos: []})
      const action = navigated()
      const newState = reducer(existingState, action)
      expect(getExportInfos(newState)).toBeUndefined()
    })

    test('should delete the errors property', () => {
      const existingState = state({errors: []})
      const action = navigated()
      const newState = reducer(existingState, action)
      expect(getExportErrors(newState)).toBeUndefined()
    })
  })
})
