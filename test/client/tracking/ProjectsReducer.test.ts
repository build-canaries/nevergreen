import {getProjectsForTray, PROJECTS_ROOT, ProjectsState, reduce} from '../../../src/client/tracking/ProjectsReducer'
import {Actions} from '../../../src/client/Actions'
import {projectsFetched, trayAdded, trayRemoved} from '../../../src/client/tracking/TrackingActionCreators'
import {buildProject, buildState, testReducer} from '../testHelpers'
import {RecursivePartial} from '../../../src/client/common/Types'
import {AuthTypes} from '../../../src/client/domain/Tray'
import {configurationImported} from '../../../src/client/backup/BackupActionCreators'

describe('ProjectsReducer', () => {

  const reducer = testReducer({
    [PROJECTS_ROOT]: reduce
  })

  function state(existing?: RecursivePartial<ProjectsState>) {
    return buildState({[PROJECTS_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state()
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(Actions.CONFIGURATION_IMPORTED, () => {

    test('should overwrite any existing data with the action data', () => {
      const newProject = buildProject({projectId: 'projectId'})
      const existingState = state({oldTrayId: {oldProjectId: buildProject({projectId: 'oldProjectId'})}})
      const action = configurationImported({[PROJECTS_ROOT]: {trayId: {projectId: newProject}}})
      const newState = reducer(existingState, action)
      expect(getProjectsForTray('oldTrayId')(newState)).toEqual([])
      expect(getProjectsForTray('trayId')(newState)).toEqual([newProject])
    })

    test('should handle no projects data', () => {
      const project = buildProject({projectId: 'projectId'})
      const existingState = state({trayId: {projectId: project}})
      const action = configurationImported({})
      const newState = reducer(existingState, action)
      expect(getProjectsForTray('trayId')(newState)).toEqual([project])
    })
  })

  describe(Actions.TRAY_ADDED, () => {

    test('should add a tray id property', () => {
      const existingState = state({})
      const action = trayAdded('trayId', '', AuthTypes.none, '', '', '')
      const newState = reducer(existingState, action)
      expect(getProjectsForTray('trayId')(newState)).toEqual([])
    })
  })

  describe(Actions.TRAY_REMOVED, () => {

    test('should delete the tray id property', () => {
      const existingState = state({trayId: {projectId: buildProject()}})
      const action = trayRemoved('trayId')
      const newState = reducer(existingState, action)
      expect(getProjectsForTray('trayId')(newState)).toEqual([])
    })
  })

  describe(Actions.PROJECTS_FETCHED, () => {

    test('should filter removed projects', () => {
      const existingState = state({trayId: {projectId: buildProject({projectId: 'projectId', removed: true})}})
      const action = projectsFetched('trayId', [], false)
      const newState = reducer(existingState, action)
      expect(getProjectsForTray('trayId')(newState)).toEqual([])
    })

    test('should set existing (non filtered) projects as removed if they haven\'t been fetched again', () => {
      const existingState = state({trayId: {projectId: buildProject({projectId: 'projectId', removed: false})}})
      const action = projectsFetched('trayId', [], false)
      const newState = reducer(existingState, action)
      expect(getProjectsForTray('trayId')(newState)).toEqual([expect.objectContaining({removed: true})])
    })

    test('should set existing (non filtered) projects as not new', () => {
      const existingState = state({trayId: {projectId: buildProject({projectId: 'projectId', isNew: true})}})
      const action = projectsFetched('trayId', [], false)
      const newState = reducer(existingState, action)
      expect(getProjectsForTray('trayId')(newState)).toEqual([expect.objectContaining({isNew: false})])
    })

    test('should mark existing projects that have been fetched again as not removed', () => {
      const existingState = state({trayId: {projectId: buildProject({projectId: 'projectId'})}})
      const action = projectsFetched('trayId', [buildProject({projectId: 'projectId'})], false)
      const newState = reducer(existingState, action)
      expect(getProjectsForTray('trayId')(newState)).toEqual([expect.objectContaining({removed: false})])
    })
  })
})
