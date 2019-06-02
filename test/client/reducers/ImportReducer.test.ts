import {
  getImportErrors,
  getImportInfos,
  getImportLoaded,
  IMPORT_ROOT,
  ImportState,
  reduce
} from '../../../src/client/reducers/ImportReducer'
import {Actions} from '../../../src/client/actions/Actions'
import {importError, importing, importSuccess} from '../../../src/client/actions/ImportActionCreators'
import {navigated} from '../../../src/client/actions/NevergreenActionCreators'
import {buildState, testReducer} from '../testHelpers'
import {RecursivePartial} from '../../../src/client/common/Types'

describe('ImportReducer', () => {

  const reducer = testReducer({
    [IMPORT_ROOT]: reduce
  })

  function state(existing?: RecursivePartial<ImportState>) {
    return buildState({[IMPORT_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state()
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(Actions.IMPORTING, () => {

    test('should set the loaded property', () => {
      const existingState = state({loaded: true})
      const action = importing()
      const newState = reducer(existingState, action)
      expect(getImportLoaded(newState)).toBeFalsy()
    })

    test('should delete the infos property', () => {
      const existingState = state({infos: []})
      const action = importing()
      const newState = reducer(existingState, action)
      expect(getImportInfos(newState)).toEqual([])
    })

    test('should delete the errors property', () => {
      const existingState = state({errors: []})
      const action = importing()
      const newState = reducer(existingState, action)
      expect(getImportErrors(newState)).toEqual([])
    })
  })

  describe(Actions.IMPORT_SUCCESS, () => {

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
      expect(getImportInfos(newState)).toEqual(['Successfully imported'])
    })

    test('should delete the errors property', () => {
      const existingState = state({errors: []})
      const action = importSuccess({})
      const newState = reducer(existingState, action)
      expect(getImportErrors(newState)).toEqual([])
    })
  })

  describe(Actions.IMPORT_ERROR, () => {

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
      expect(getImportInfos(newState)).toEqual([])
    })

    test('should set the errors property', () => {
      const existingState = state({})
      const action = importError(['some-error'])
      const newState = reducer(existingState, action)
      expect(getImportErrors(newState)).toEqual(['some-error'])
    })
  })

  describe(Actions.NAVIGATED, () => {

    test('should delete the infos property', () => {
      const existingState = state({infos: []})
      const action = navigated()
      const newState = reducer(existingState, action)
      expect(getImportInfos(newState)).toEqual([])
    })

    test('should delete the errors property', () => {
      const existingState = state({errors: []})
      const action = navigated()
      const newState = reducer(existingState, action)
      expect(getImportErrors(newState)).toEqual([])
    })
  })
})
