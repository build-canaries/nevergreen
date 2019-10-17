import {getProjectsForTray, PROJECTS_ROOT, ProjectsState, reduce} from '../../../src/client/tracking/ProjectsReducer'
import {Actions} from '../../../src/client/Actions'
import {projectsFetched, trayAdded, trayRemoved} from '../../../src/client/tracking/TrackingActionCreators'
import {buildProject, buildState, testReducer} from '../testHelpers'
import {RecursivePartial} from '../../../src/client/common/Types'
import {AuthTypes} from '../../../src/client/domain/Tray'
import {configurationImported} from '../../../src/client/backup/BackupActionCreators'

const reducer = testReducer({
  [PROJECTS_ROOT]: reduce
})

function state(existing?: RecursivePartial<ProjectsState>) {
  return buildState({[PROJECTS_ROOT]: existing})
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state()
  const newState = reducer(existingState, {type: 'not-a-real-action'})
  expect(newState).toEqual(existingState)
})

describe(Actions.CONFIGURATION_IMPORTED, () => {

  it('should overwrite any existing data with the action data', () => {
    const newProject = buildProject({projectId: 'projectId'})
    const existingState = state({
      oldTrayId: [buildProject({projectId: 'oldProjectId'})]
    })
    const action = configurationImported({[PROJECTS_ROOT]: {trayId: [newProject]}})

    const newState = reducer(existingState, action)

    expect(getProjectsForTray('oldTrayId')(newState)).toBeUndefined()
    expect(getProjectsForTray('trayId')(newState)).toEqual([newProject])
  })

  it('should handle no projects data', () => {
    const project = buildProject({projectId: 'projectId'})
    const existingState = state({trayId: [project]})
    const action = configurationImported({})
    const newState = reducer(existingState, action)
    expect(getProjectsForTray('trayId')(newState)).toEqual([project])
  })
})

describe(Actions.TRAY_ADDED, () => {

  it('should add a tray id property', () => {
    const existingState = state({})
    const action = trayAdded('trayId', '', AuthTypes.none, '', '', '')
    const newState = reducer(existingState, action)
    expect(getProjectsForTray('trayId')(newState)).toEqual([])
  })
})

describe(Actions.TRAY_REMOVED, () => {

  it('should delete the tray id property', () => {
    const existingState = state({trayId: [buildProject()]})
    const action = trayRemoved('trayId')
    const newState = reducer(existingState, action)
    expect(getProjectsForTray('trayId')(newState)).toBeUndefined()
  })
})

describe(Actions.PROJECTS_FETCHED, () => {

  it('should delete projects not fetched that were previously marked as removed', () => {
    const existingState = state({
      trayId: [
        buildProject({projectId: 'projectId1', removed: true}),
        buildProject({projectId: 'projectId2', removed: true}),
        buildProject({projectId: 'projectId3', removed: true})
      ]
    })
    const action = projectsFetched('trayId', [], false)

    const newState = reducer(existingState, action)

    expect(getProjectsForTray('trayId')(newState)).toEqual([])
  })

  it('should mark existing projects as removed if they haven\'t been fetched again', () => {
    const existingState = state({
      trayId: [
        buildProject({projectId: 'projectId', removed: false})
      ]
    })
    const action = projectsFetched('trayId', [], false)

    const newState = reducer(existingState, action)

    expect(getProjectsForTray('trayId')(newState)).toEqual([
      expect.objectContaining({projectId: 'projectId', removed: true})
    ])
  })

  it('should mark all existing projects as not new', () => {
    const existingState = state({
      trayId: [
        buildProject({projectId: 'projectId', isNew: true})
      ]
    })
    const action = projectsFetched('trayId', [], false)

    const newState = reducer(existingState, action)

    expect(getProjectsForTray('trayId')(newState)).toEqual([
      expect.objectContaining({projectId: 'projectId', isNew: false})
    ])
  })

  it('should mark existing projects that have been fetched again as not removed', () => {
    const existingState = state({
      trayId: [
        buildProject({projectId: 'projectId'})
      ]
    })
    const action = projectsFetched(
      'trayId',
      [
        buildProject({projectId: 'projectId'})
      ],
      false)

    const newState = reducer(existingState, action)

    expect(getProjectsForTray('trayId')(newState)).toEqual([
      expect.objectContaining({projectId: 'projectId', removed: false})
    ])
  })

  it('should correctly store existing and newly fetched projects', () => {
    const existingState = state({
      trayId: [
        buildProject({projectId: 'projectId1'})
      ]
    })
    const action = projectsFetched(
      'trayId',
      [
        buildProject({projectId: 'projectId2'})
      ],
      false)

    const newState = reducer(existingState, action)

    expect(getProjectsForTray('trayId')(newState)).toEqual([
      expect.objectContaining({projectId: 'projectId2'}),
      expect.objectContaining({projectId: 'projectId1'})
    ])
  })
})
