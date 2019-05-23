import {PROJECTS_ROOT, ProjectsState, reduce} from '../../../src/client/reducers/ProjectsReducer'
import {Actions} from '../../../src/client/actions/Actions'
import {initalised} from '../../../src/client/actions/NevergreenActionCreators'
import {getProjects} from '../../../src/client/reducers/Selectors'
import {importSuccess} from '../../../src/client/actions/ImportActionCreators'
import {projectsFetched, removeTray, trayAdded} from '../../../src/client/actions/TrackingActionCreators'
import {buildProject, buildState, testReducer} from '../testHelpers'
import {RecursivePartial} from '../../../src/client/common/Types'

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

  describe(Actions.INITIALISED, () => {

    test('should overwrite any existing data with the action data', () => {
      const newProject = buildProject({projectId: 'projectId'})
      const existingState = state({oldTrayId: {oldProjectId: buildProject({projectId: 'oldProjectId'})}})
      const action = initalised({[PROJECTS_ROOT]: {trayId: {projectId: newProject}}})
      const newState = reducer(existingState, action)
      expect(getProjects(newState, 'oldTrayId')).toEqual([])
      expect(getProjects(newState, 'trayId')).toEqual([newProject])
    })

    test('should handle no projects data', () => {
      const project = buildProject({projectId: 'projectId'})
      const existingState = state({trayId: {projectId: project}})
      const action = initalised({})
      const newState = reducer(existingState, action)
      expect(getProjects(newState, 'trayId')).toEqual([project])
    })
  })

  describe(Actions.IMPORT_SUCCESS, () => {

    test('should overwrite any existing data with the action data', () => {
      const newProject = buildProject({projectId: 'projectId'})
      const existingState = state({oldTrayId: {oldProjectId: buildProject({projectId: 'oldProjectId'})}})
      const action = importSuccess({[PROJECTS_ROOT]: {trayId: {projectId: newProject}}})
      const newState = reducer(existingState, action)
      expect(getProjects(newState, 'oldTrayId')).toEqual([])
      expect(getProjects(newState, 'trayId')).toEqual([newProject])
    })

    test('should handle no projects data', () => {
      const project = buildProject({projectId: 'projectId'})
      const existingState = state({trayId: {projectId: project}})
      const action = importSuccess({})
      const newState = reducer(existingState, action)
      expect(getProjects(newState, 'trayId')).toEqual([project])
    })
  })

  describe(Actions.TRAY_ADDED, () => {

    test('should add a tray id property', () => {
      const existingState = state({})
      const action = trayAdded('trayId', '', '')
      const newState = reducer(existingState, action)
      expect(getProjects(newState, 'trayId')).toEqual([])
    })
  })

  describe(Actions.REMOVE_TRAY, () => {

    test('should delete the tray id property', () => {
      const existingState = state({trayId: {projectId: buildProject()}})
      const action = removeTray('trayId')
      const newState = reducer(existingState, action)
      expect(getProjects(newState, 'trayId')).toEqual([])
    })
  })

  describe(Actions.PROJECTS_FETCHED, () => {

    test('should filter removed projects', () => {
      const existingState = state({trayId: {projectId: buildProject({projectId: 'projectId', removed: true})}})
      const action = projectsFetched('trayId', [], false)
      const newState = reducer(existingState, action)
      expect(getProjects(newState, 'trayId')).toEqual([])
    })

    test('should set existing (non filtered) projects as removed if they haven\'t been fetched again', () => {
      const existingState = state({trayId: {projectId: buildProject({projectId: 'projectId', removed: false})}})
      const action = projectsFetched('trayId', [], false)
      const newState = reducer(existingState, action)
      expect(getProjects(newState, 'trayId')).toEqual([expect.objectContaining({removed: true})])
    })

    test('should mark existing projects that have been fetched again as not removed', () => {
      const existingState = state({trayId: {projectId: buildProject({projectId: 'projectId'})}})
      const action = projectsFetched('trayId', [buildProject({projectId: 'projectId'})], false)
      const newState = reducer(existingState, action)
      expect(getProjects(newState, 'trayId')).toEqual([expect.objectContaining({removed: false})])
    })
  })
})
