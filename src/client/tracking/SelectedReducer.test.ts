import {getSelectedProjectsForTray, reduce, SELECTED_ROOT, SelectedState} from './SelectedReducer'
import {Actions} from '../Actions'
import {projectSelected, projectsFetched, trayAdded, trayRemoved} from './TrackingActionCreators'
import {buildProject, buildState, testReducer} from '../testHelpers'
import {RecursivePartial} from '../common/Types'
import {AuthTypes} from '../domain/Tray'
import {configurationImported} from '../settings/backup/BackupActionCreators'

const reducer = testReducer({
  [SELECTED_ROOT]: reduce
})

function state(existing?: RecursivePartial<SelectedState>) {
  return buildState({[SELECTED_ROOT]: existing})
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state({foo: []})
  const newState = reducer(existingState, {type: 'not-a-real-action'})
  expect(newState).toEqual(existingState)
})

describe(Actions.CONFIGURATION_IMPORTED, () => {

  it('should set the selected data', () => {
    const existingState = state({oldId: ['foo']})
    const action = configurationImported({selected: {trayId: ['bar']}})
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForTray('oldId')(newState)).toBeUndefined()
    expect(getSelectedProjectsForTray('trayId')(newState)).toEqual(['bar'])
  })

  it('should handle no selected data', () => {
    const existingState = state({oldId: ['foo']})
    const action = configurationImported({})
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForTray('oldId')(newState)).toEqual(['foo'])
  })
})

describe(Actions.TRAY_ADDED, () => {

  it('should add the tray id with an empty set of selected projects', () => {
    const existingState = state({})
    const action = trayAdded('trayId', '', AuthTypes.none, '', '', '')
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForTray('trayId')(newState)).toHaveLength(0)
  })
})

describe(Actions.TRAY_REMOVED, () => {

  it('should remove the tray id', () => {
    const existingState = state({trayId: []})
    const action = trayRemoved('trayId')
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForTray('trayId')(newState)).toBeUndefined()
  })
})

describe(Actions.PROJECT_SELECTED, () => {

  it('should add the project if selected', () => {
    const existingState = state({trayId: ['a', 'b', 'c']})
    const action = projectSelected('trayId', 'd', true)
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForTray('trayId')(newState)).toEqual(['a', 'b', 'c', 'd'])
  })

  it('should remove the project if not selected', () => {
    const existingState = state({trayId: ['a', 'b', 'c']})
    const action = projectSelected('trayId', 'b', false)
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForTray('trayId')(newState)).toEqual(['a', 'c'])
  })
})

describe(Actions.PROJECTS_FETCHED, () => {

  it('should remove selected projects that were not fetched', () => {
    const existingState = state({trayId: ['a', 'b', 'c']})
    const action = projectsFetched('trayId', [buildProject({projectId: 'b'})], false)
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForTray('trayId')(newState)).toEqual(['b'])
  })

  it('should add new projects if select new is true', () => {
    const existingState = state({trayId: []})
    const fetchedProjects = [
      buildProject({projectId: 'a', isNew: true}),
      buildProject({projectId: 'b', isNew: false}),
      buildProject({projectId: 'c', isNew: false})
    ]
    const action = projectsFetched('trayId', fetchedProjects, true)
    const newState = reducer(existingState, action)
    expect(getSelectedProjectsForTray('trayId')(newState)).toEqual(['a'])
  })
})
