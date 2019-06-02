import {getSelectedProjects, reduce, SELECTED_ROOT, SelectedState} from '../../../src/client/reducers/SelectedReducer'
import {Actions} from '../../../src/client/actions/Actions'
import {initalised} from '../../../src/client/actions/NevergreenActionCreators'
import {importSuccess} from '../../../src/client/actions/ImportActionCreators'
import {projectsFetched, removeTray, selectProject, trayAdded} from '../../../src/client/actions/TrackingActionCreators'
import {buildProject, buildState, testReducer} from '../testHelpers'
import {RecursivePartial} from '../../../src/client/common/Types'

describe('SelectedReducer', () => {

  const reducer = testReducer({
    [SELECTED_ROOT]: reduce
  })

  function state(existing?: RecursivePartial<SelectedState>) {
    return buildState({[SELECTED_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state({foo: []})
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(Actions.INITIALISED, () => {

    test('should set the selected data', () => {
      const existingState = state({oldId: ['foo']})
      const action = initalised({[SELECTED_ROOT]: {trayId: ['bar']}})
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'oldId')).toBeUndefined()
      expect(getSelectedProjects(newState, 'trayId')).toEqual(['bar'])
    })

    test('should handle no selected data', () => {
      const existingState = state({oldId: ['foo']})
      const action = initalised({})
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'oldId')).toEqual(['foo'])
    })
  })

  describe(Actions.IMPORT_SUCCESS, () => {

    test('should set the selected data', () => {
      const existingState = state({oldId: ['foo']})
      const action = importSuccess({selected: {trayId: ['bar']}})
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'oldId')).toBeUndefined()
      expect(getSelectedProjects(newState, 'trayId')).toEqual(['bar'])
    })
  })

  describe(Actions.TRAY_ADDED, () => {

    test('should add the tray id with an empty set of selected projects', () => {
      const existingState = state({})
      const action = trayAdded('trayId', '', '')
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'trayId')).toHaveLength(0)
    })
  })

  describe(Actions.REMOVE_TRAY, () => {

    test('should remove the tray id', () => {
      const existingState = state({trayId: []})
      const action = removeTray('trayId')
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'trayId')).toBeUndefined()
    })
  })

  describe(Actions.SELECT_PROJECT, () => {

    test('should add the project if selected', () => {
      const existingState = state({trayId: ['a', 'b', 'c']})
      const action = selectProject('trayId', 'd', true)
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'trayId')).toEqual(['a', 'b', 'c', 'd'])
    })

    test('should remove the project if not selected', () => {
      const existingState = state({trayId: ['a', 'b', 'c']})
      const action = selectProject('trayId', 'b', false)
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'trayId')).toEqual(['a', 'c'])
    })
  })

  describe(Actions.PROJECTS_FETCHED, () => {

    test('should remove selected projects that were not fetched', () => {
      const existingState = state({trayId: ['a', 'b', 'c']})
      const action = projectsFetched('trayId', [buildProject({projectId: 'b'})], false)
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'trayId')).toEqual(['b'])
    })

    test('should add new projects if select new is true', () => {
      const existingState = state({trayId: []})
      const fetchedProjects = [
        buildProject({projectId: 'a', isNew: true}),
        buildProject({projectId: 'b'}),
        buildProject({projectId: 'c'})
      ]
      const action = projectsFetched('trayId', fetchedProjects, true)
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'trayId')).toEqual(['a'])
    })
  })
})
