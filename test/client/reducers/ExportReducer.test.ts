import {
  EXPORT_ROOT,
  ExportState,
  getExportErrors,
  getExportInfos,
  getExportLoaded,
  reduce
} from '../../../src/client/reducers/ExportReducer'
import {Actions} from '../../../src/client/actions/Actions'
import {exportError, exporting, exportSuccess} from '../../../src/client/actions/ExportActionCreators'
import {navigated} from '../../../src/client/actions/NevergreenActionCreators'
import {buildState, testReducer} from '../testHelpers'
import {RecursivePartial} from '../../../src/client/common/Types'

describe('ExportReducer', () => {

  const reducer = testReducer({
    [EXPORT_ROOT]: reduce
  })

  function state(existing?: RecursivePartial<ExportState>) {
    return buildState({[EXPORT_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state()
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(Actions.EXPORTING, () => {

    test('should set the loaded property', () => {
      const existingState = state({loaded: true})
      const action = exporting()
      const newState = reducer(existingState, action)
      expect(getExportLoaded(newState)).toBeFalsy()
    })

    test('should delete the infos property', () => {
      const existingState = state({infos: []})
      const action = exporting()
      const newState = reducer(existingState, action)
      expect(getExportInfos(newState)).toEqual([])
    })

    test('should delete the errors property', () => {
      const existingState = state({errors: []})
      const action = exporting()
      const newState = reducer(existingState, action)
      expect(getExportErrors(newState)).toEqual([])
    })
  })

  describe(Actions.EXPORT_SUCCESS, () => {

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
      expect(getExportInfos(newState)).toEqual(['some-message'])
    })

    test('should delete the errors property', () => {
      const existingState = state({errors: []})
      const action = exportSuccess([])
      const newState = reducer(existingState, action)
      expect(getExportErrors(newState)).toEqual([])
    })
  })

  describe(Actions.EXPORT_ERROR, () => {

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
      expect(getExportInfos(newState)).toEqual([])
    })

    test('should set the errors property', () => {
      const existingState = state({})
      const action = exportError(['some-error'])
      const newState = reducer(existingState, action)
      expect(getExportErrors(newState)).toEqual(['some-error'])
    })
  })

  describe(Actions.NAVIGATED, () => {

    test('should delete the infos property', () => {
      const existingState = state({infos: []})
      const action = navigated()
      const newState = reducer(existingState, action)
      expect(getExportInfos(newState)).toEqual([])
    })

    test('should delete the errors property', () => {
      const existingState = state({errors: []})
      const action = navigated()
      const newState = reducer(existingState, action)
      expect(getExportErrors(newState)).toEqual([])
    })
  })
})
