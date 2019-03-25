import {reduce} from '../../../src/client/reducers/SelectedReducer'
import {
  IMPORT_SUCCESS,
  INITIALISED,
  PROJECTS_FETCHED,
  REMOVE_TRAY,
  SELECT_PROJECT,
  TRAY_ADDED
} from '../../../src/client/actions/Actions'
import {fromJS, Map, Set} from 'immutable'

describe('SelectedReducer', () => {

  test('should return the state unmodified for an unknown action', () => {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INITIALISED, () => {

    test('should set the selected data', () => {
      const existingState = Map({oldId: ['foo']})
      const action = {type: INITIALISED, data: fromJS({selected: {trayId: ['bar']}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).not.toHaveProperty('oldId')
      expect(newState.toJS()).toHaveProperty('trayId', ['bar'])
    })

    test('should handle no selected data', () => {
      const existingState = Map({oldId: ['foo']})
      const action = {type: INITIALISED, data: Map()}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('oldId')
    })
  })

  describe(IMPORT_SUCCESS, () => {

    test('should set the selected data', () => {
      const existingState = Map({oldId: ['foo']})
      const action = {type: IMPORT_SUCCESS, data: fromJS({selected: {trayId: ['bar']}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).not.toHaveProperty('oldId')
      expect(newState.toJS()).toHaveProperty('trayId', ['bar'])
    })
  })

  describe(TRAY_ADDED, () => {

    test('should add the tray id with an empty set of selected projects', () => {
      const existingState = Map()
      const action = {type: TRAY_ADDED, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId')
    })
  })

  describe(REMOVE_TRAY, () => {

    test('should remove the tray id', () => {
      const existingState = Map({trayId: Set()})
      const action = {type: REMOVE_TRAY, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).not.toHaveProperty('trayId')
    })
  })

  describe(SELECT_PROJECT, () => {

    test('should add the project web url if selected', () => {
      const existingState = Map({trayId: Set.of('a', 'b', 'c')})
      const action = {type: SELECT_PROJECT, trayId: 'trayId', projectId: 'd', selected: true}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId', ['a', 'b', 'c', 'd'])
    })

    test('should remove the project web url if not selected', () => {
      const existingState = Map({trayId: Set.of('a', 'b', 'c')})
      const action = {type: SELECT_PROJECT, trayId: 'trayId', projectId: 'b', selected: false}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId', ['a', 'c'])
    })
  })

  describe(PROJECTS_FETCHED, () => {

    test('should remove selected projects that were not fetched', () => {
      const existingState = Map({trayId: Set.of('a', 'b', 'c')})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', data: fromJS([{projectId: 'b'}])}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId', ['b'])
    })

    test('should add new projects if select new is true', () => {
      const existingState = Map({trayId: Set()})
      const fetchedProjects = fromJS([{projectId: 'a', isNew: true}, {projectId: 'b'}, {projectId: 'c'}])
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', includeNew: true, data: fetchedProjects}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId', ['a'])
    })
  })
})
