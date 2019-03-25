import {PROJECTS_ROOT, reduce} from '../../../src/client/reducers/ProjectsReducer'
import {
  IMPORT_SUCCESS,
  INITIALISED,
  PROJECTS_FETCHED,
  REMOVE_TRAY,
  TRAY_ADDED
} from '../../../src/client/actions/Actions'
import {fromJS, List, Map} from 'immutable'
import {Project} from '../../../src/client/domain/Project'

describe('ProjectsReducer', () => {

  test('should return the state unmodified for an unknown action', () => {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INITIALISED, () => {

    test('should set the projects data', () => {
      const existingState = Map({id: 'x'})
      const action = {type: INITIALISED, data: fromJS({[PROJECTS_ROOT]: {trayId: {projectId: {}}}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).not.toHaveProperty('id')
      expect(newState.toJS()).toHaveProperty('trayId.projectId')
    })

    test('should handle no projects data', () => {
      const existingState = Map()
      const action = {type: INITIALISED, data: Map()}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toEqual({})
    })
  })

  describe(IMPORT_SUCCESS, () => {

    test('should set the projects data', () => {
      const existingState = Map({id: 'x'})
      const action = {type: IMPORT_SUCCESS, data: fromJS({[PROJECTS_ROOT]: {trayId: {projectId: {}}}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).not.toHaveProperty('id')
      expect(newState.toJS()).toHaveProperty('trayId')
    })
  })

  describe(TRAY_ADDED, () => {

    test('should add a tray id property', () => {
      const existingState = fromJS()
      const action = {type: TRAY_ADDED, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId', {})
    })
  })

  describe(REMOVE_TRAY, () => {

    test('should delete the tray id property', () => {
      const existingState = fromJS({trayId: {}})
      const action = {type: REMOVE_TRAY, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).not.toHaveProperty('trayId')
    })
  })

  describe(PROJECTS_FETCHED, () => {

    test('should filter removed projects', () => {
      const existingState = fromJS({trayId: {projectId: new Project({removed: true})}})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', data: List()}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId', {})
    })

    test('should set existing (non filtered) projects as removed if they haven\'t been fetched again', () => {
      const existingState = fromJS({trayId: {projectId: new Project({removed: false})}})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', data: List()}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.projectId.removed', true)
    })

    test('should mark existing projects that have been fetched again as not removed', () => {
      const existingState = fromJS({trayId: {projectId: new Project()}})
      const action = {
        type: PROJECTS_FETCHED,
        trayId: 'trayId',
        data: fromJS([new Project({projectId: 'projectId'})])
      }
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.projectId.removed', false)
    })
  })
})
