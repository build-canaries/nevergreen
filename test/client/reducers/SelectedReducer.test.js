import {reduce, SELECTED_ROOT} from '../../../src/client/reducers/SelectedReducer'
import {
  IMPORT_SUCCESS,
  INITIALISED,
  PROJECTS_FETCHED,
  REMOVE_TRAY,
  SELECT_PROJECT,
  TRAY_ADDED
} from '../../../src/client/actions/Actions'
import {fromJS, Set} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {initalised} from '../../../src/client/actions/NevergreenActionCreators'
import {importSuccess} from '../../../src/client/actions/ImportActionCreators'
import {projectsFetched, removeTray, selectProject, trayAdded} from '../../../src/client/actions/TrackingActionCreators'
import {getSelectedProjects} from '../../../src/client/reducers/Selectors'

describe('SelectedReducer', () => {

  const reducer = combineReducers({
    [SELECTED_ROOT]: reduce
  })

  function state(existing) {
    return fromJS({[SELECTED_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state({foo: Set()})
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INITIALISED, () => {

    test('should set the selected data', () => {
      const existingState = state({oldId: Set.of('foo')})
      const action = initalised({[SELECTED_ROOT]: {trayId: ['bar']}})
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'oldId')).toBeUndefined()
      expect(getSelectedProjects(newState, 'trayId').toJS()).toEqual(['bar'])
    })

    test('should handle no selected data', () => {
      const existingState = state({oldId: Set.of('foo')})
      const action = initalised({})
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'oldId').toJS()).toEqual(['foo'])
    })
  })

  describe(IMPORT_SUCCESS, () => {

    test('should set the selected data', () => {
      const existingState = state({oldId: Set.of('foo')})
      const action = importSuccess({selected: {trayId: ['bar']}})
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'oldId')).toBeUndefined()
      expect(getSelectedProjects(newState, 'trayId').toJS()).toEqual(['bar'])
    })
  })

  describe(TRAY_ADDED, () => {

    test('should add the tray id with an empty set of selected projects', () => {
      const existingState = state({})
      const action = trayAdded('trayId', '', '')
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'trayId').toJS()).toHaveLength(0)
    })
  })

  describe(REMOVE_TRAY, () => {

    test('should remove the tray id', () => {
      const existingState = state({trayId: Set()})
      const action = removeTray('trayId')
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'trayId')).toBeUndefined()
    })
  })

  describe(SELECT_PROJECT, () => {

    test('should add the project web url if selected', () => {
      const existingState = state({trayId: Set.of('a', 'b', 'c')})
      const action = selectProject('trayId', 'd', true)
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'trayId').toJS()).toEqual(['a', 'b', 'c', 'd'])
    })

    test('should remove the project web url if not selected', () => {
      const existingState = state({trayId: Set.of('a', 'b', 'c')})
      const action = selectProject('trayId', 'b', false)
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'trayId').toJS()).toEqual(['a', 'c'])
    })
  })

  describe(PROJECTS_FETCHED, () => {

    test('should remove selected projects that were not fetched', () => {
      const existingState = state({trayId: Set.of('a', 'b', 'c')})
      const action = projectsFetched('trayId', fromJS([{projectId: 'b'}]))
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'trayId').toJS()).toEqual(['b'])
    })

    test('should add new projects if select new is true', () => {
      const existingState = state({trayId: Set()})
      const fetchedProjects = fromJS([{projectId: 'a', isNew: true}, {projectId: 'b'}, {projectId: 'c'}])
      const action = projectsFetched('trayId', fetchedProjects, true)
      const newState = reducer(existingState, action)
      expect(getSelectedProjects(newState, 'trayId').toJS()).toEqual(['a'])
    })
  })
})
