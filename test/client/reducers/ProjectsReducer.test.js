import {PROJECTS_ROOT, reduce} from '../../../src/client/reducers/ProjectsReducer'
import {
  IMPORT_SUCCESS,
  INITIALISED,
  PROJECTS_FETCHED,
  REMOVE_TRAY,
  TRAY_ADDED
} from '../../../src/client/actions/Actions'
import {fromJS, List} from 'immutable'
import {Project} from '../../../src/client/domain/Project'
import {combineReducers} from 'redux-immutable'
import {initalised} from '../../../src/client/actions/NevergreenActionCreators'
import {getProjects} from '../../../src/client/reducers/Selectors'
import {importSuccess} from '../../../src/client/actions/ImportActionCreators'
import {projectsFetched, removeTray, trayAdded} from '../../../src/client/actions/TrackingActionCreators'

describe('ProjectsReducer', () => {

  const reducer = combineReducers({
    [PROJECTS_ROOT]: reduce
  })

  function state(existing) {
    return fromJS({[PROJECTS_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state({foo: 'bar'})
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INITIALISED, () => {

    test('should set the projects data', () => {
      const existingState = state({id: {x: new Project()}})
      const action = initalised({[PROJECTS_ROOT]: {trayId: {projectId: {}}}})
      const newState = reducer(existingState, action)
      expect(getProjects(newState, 'id')).toBeUndefined()
      expect(getProjects(newState, 'trayId').toJS()).toHaveLength(1)
    })

    test('should handle no projects data', () => {
      const existingState = state({id: {x: new Project()}})
      const action = initalised({})
      const newState = reducer(existingState, action)
      expect(getProjects(newState, 'id').toJS()).toHaveLength(1)
    })
  })

  describe(IMPORT_SUCCESS, () => {

    test('should set the projects data', () => {
      const existingState = state({id: {x: new Project()}})
      const action = importSuccess({[PROJECTS_ROOT]: {trayId: {projectId: {}}}})
      const newState = reducer(existingState, action)
      expect(getProjects(newState, 'id')).toBeUndefined()
      expect(getProjects(newState, 'trayId').toJS()).toHaveLength(1)
    })
  })

  describe(TRAY_ADDED, () => {

    test('should add a tray id property', () => {
      const existingState = state({})
      const action = trayAdded('trayId', '', '')
      const newState = reducer(existingState, action)
      expect(getProjects(newState, 'trayId').toJS()).toHaveLength(0)
    })
  })

  describe(REMOVE_TRAY, () => {

    test('should delete the tray id property', () => {
      const existingState = state({trayId: {projectId: new Project()}})
      const action = removeTray('trayId')
      const newState = reducer(existingState, action)
      expect(getProjects(newState, 'trayId')).toBeUndefined()
    })
  })

  describe(PROJECTS_FETCHED, () => {

    test('should filter removed projects', () => {
      const existingState = state({trayId: {projectId: new Project({removed: true})}})
      const action = projectsFetched('trayId', List(), false)
      const newState = reducer(existingState, action)
      expect(getProjects(newState, 'trayId').toJS()).toHaveLength(0)
    })

    test('should set existing (non filtered) projects as removed if they haven\'t been fetched again', () => {
      const existingState = state({trayId: {projectId: new Project({removed: false})}})
      const action = projectsFetched('trayId', List(), false)
      const newState = reducer(existingState, action)
      expect(getProjects(newState, 'trayId').toJS()[0]).toHaveProperty('removed', true)
    })

    test('should mark existing projects that have been fetched again as not removed', () => {
      const existingState = state({trayId: {projectId: new Project()}})
      const action = projectsFetched('trayId', List([new Project({projectId: 'projectId'})]), false)
      const newState = reducer(existingState, action)
      expect(getProjects(newState, 'trayId').toJS()[0]).toHaveProperty('removed', false)
    })
  })
})
