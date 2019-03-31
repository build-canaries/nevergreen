import {IMPORT_ROOT, reduce} from '../../../src/client/reducers/ImportReducer'
import {IMPORT_ERROR, IMPORT_SUCCESS, IMPORTING, NAVIGATED} from '../../../src/client/actions/Actions'
import {fromJS, Map} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {getImportErrors, getImportInfos, getImportLoaded} from '../../../src/client/reducers/Selectors'
import {importError, importing, importSuccess} from '../../../src/client/actions/ImportActionCreators'
import {navigated} from '../../../src/client/actions/NevergreenActionCreators'

describe('ImportReducer', () => {

  const reducer = combineReducers({
    [IMPORT_ROOT]: reduce
  })

  function state(existing) {
    return fromJS({[IMPORT_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state({foo: 'bar'})
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(IMPORTING, () => {

    test('should set the loaded property', () => {
      const existingState = state({loaded: true})
      const action = importing()
      const newState = reducer(existingState, action)
      expect(getImportLoaded(newState)).toBeFalsy()
    })

    test('should delete the infos property', () => {
      const existingState = state({infos: Map()})
      const action = importing()
      const newState = reducer(existingState, action)
      expect(getImportInfos(newState)).toBeUndefined()
    })

    test('should delete the errors property', () => {
      const existingState = state({errors: Map()})
      const action = importing()
      const newState = reducer(existingState, action)
      expect(getImportErrors(newState)).toBeUndefined()
    })
  })

  describe(IMPORT_SUCCESS, () => {

    test('should set the loaded property', () => {
      const existingState = state({loaded: false})
      const action = importSuccess({})
      const newState = reducer(existingState, action)
      expect(getImportLoaded(newState)).toBeTruthy()
    })

    test('should set the infos property', () => {
      const existingState = state({})
      const action = importSuccess({})
      const newState = reducer(existingState, action)
      expect(getImportInfos(newState).toJS()).toEqual(['Successfully imported'])
    })

    test('should delete the errors property', () => {
      const existingState = state({errors: Map()})
      const action = importSuccess({})
      const newState = reducer(existingState, action)
      expect(getImportErrors(newState)).toBeUndefined()
    })
  })

  describe(IMPORT_ERROR, () => {

    test('should set the loaded property', () => {
      const existingState = state({loaded: false})
      const action = importError([])
      const newState = reducer(existingState, action)
      expect(getImportLoaded(newState)).toBeTruthy()
    })

    test('should delete the infos property', () => {
      const existingState = state({infos: []})
      const action = importError([])
      const newState = reducer(existingState, action)
      expect(getImportInfos(newState)).toBeUndefined()
    })

    test('should set the errors property', () => {
      const existingState = state({})
      const action = importError(['some-error'])
      const newState = reducer(existingState, action)
      expect(getImportErrors(newState).toJS()).toEqual(['some-error'])
    })
  })

  describe(NAVIGATED, () => {

    test('should delete the infos property', () => {
      const existingState = state({infos: []})
      const action = navigated()
      const newState = reducer(existingState, action)
      expect(getImportInfos(newState)).toBeUndefined()
    })

    test('should delete the errors property', () => {
      const existingState = state({errors: []})
      const action = navigated()
      const newState = reducer(existingState, action)
      expect(getImportErrors(newState)).toBeUndefined()
    })
  })
})
