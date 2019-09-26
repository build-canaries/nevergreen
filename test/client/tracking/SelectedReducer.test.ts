import {
  getSelectedProjectsForTray,
  reduce,
  SELECTED_ROOT,
  SelectedState
} from '../../../src/client/tracking/SelectedReducer'
import {Actions} from '../../../src/client/Actions'
import {setConfiguration} from '../../../src/client/NevergreenActionCreators'
import {
  projectsFetched,
  trayRemoved,
  projectSelected,
  trayAdded
} from '../../../src/client/tracking/TrackingActionCreators'
import {buildProject, buildState, testReducer} from '../testHelpers'
import {RecursivePartial} from '../../../src/client/common/Types'
import {AuthTypes} from '../../../src/client/domain/Tray'

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

  describe(Actions.SET_CONFIGURATION, () => {

    test('should set the selected data', () => {
      const existingState = state({oldId: ['foo']})
      const action = setConfiguration({selected: {trayId: ['bar']}})
      const newState = reducer(existingState, action)
      expect(getSelectedProjectsForTray('oldId')(newState)).toBeUndefined()
      expect(getSelectedProjectsForTray('trayId')(newState)).toEqual(['bar'])
    })

    test('should handle no selected data', () => {
      const existingState = state({oldId: ['foo']})
      const action = setConfiguration({})
      const newState = reducer(existingState, action)
      expect(getSelectedProjectsForTray('oldId')(newState)).toEqual(['foo'])
    })
  })

  describe(Actions.TRAY_ADDED, () => {

    test('should add the tray id with an empty set of selected projects', () => {
      const existingState = state({})
      const action = trayAdded('trayId', '', AuthTypes.none, '', '', '')
      const newState = reducer(existingState, action)
      expect(getSelectedProjectsForTray('trayId')(newState)).toHaveLength(0)
    })
  })

  describe(Actions.TRAY_REMOVED, () => {

    test('should remove the tray id', () => {
      const existingState = state({trayId: []})
      const action = trayRemoved('trayId')
      const newState = reducer(existingState, action)
      expect(getSelectedProjectsForTray('trayId')(newState)).toBeUndefined()
    })
  })

  describe(Actions.PROJECT_SELECTED, () => {

    test('should add the project if selected', () => {
      const existingState = state({trayId: ['a', 'b', 'c']})
      const action = projectSelected('trayId', 'd', true)
      const newState = reducer(existingState, action)
      expect(getSelectedProjectsForTray('trayId')(newState)).toEqual(['a', 'b', 'c', 'd'])
    })

    test('should remove the project if not selected', () => {
      const existingState = state({trayId: ['a', 'b', 'c']})
      const action = projectSelected('trayId', 'b', false)
      const newState = reducer(existingState, action)
      expect(getSelectedProjectsForTray('trayId')(newState)).toEqual(['a', 'c'])
    })
  })

  describe(Actions.PROJECTS_FETCHED, () => {

    test('should remove selected projects that were not fetched', () => {
      const existingState = state({trayId: ['a', 'b', 'c']})
      const action = projectsFetched('trayId', [buildProject({projectId: 'b'})], false)
      const newState = reducer(existingState, action)
      expect(getSelectedProjectsForTray('trayId')(newState)).toEqual(['b'])
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
      expect(getSelectedProjectsForTray('trayId')(newState)).toEqual(['a'])
    })
  })
})
