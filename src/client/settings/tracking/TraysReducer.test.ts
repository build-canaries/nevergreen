import {getTrays, reduce, TRAYS_ROOT, TraysState} from './TraysReducer'
import {Actions} from '../../Actions'
import {projectsFetched, trayAdded, trayRemoved, trayUpdated} from './TrackingActionCreators'
import * as DateTime from '../../common/DateTime'
import {buildProject, buildState, buildTray, testReducer} from '../../testHelpers'
import {RecursivePartial} from '../../common/Types'
import {AuthTypes} from '../../domain/Tray'
import {configurationImported} from '../backup/BackupActionCreators'

const reducer = testReducer({
  [TRAYS_ROOT]: reduce
})

function state(existing?: RecursivePartial<TraysState>) {
  return buildState({[TRAYS_ROOT]: existing})
}

it('should return the state unmodified for an unknown action', () => {
  const existingState = state()
  const newState = reducer(existingState, {type: 'not-a-real-action'})
  expect(newState).toEqual(existingState)
})

describe(Actions.CONFIGURATION_IMPORTED, () => {

  it('should set the trays if it is included in the import', () => {
    const tray = buildTray({trayId: 'trayId'})
    const existingState = state({someId: {}})
    const action = configurationImported({[TRAYS_ROOT]: {trayId: tray}})

    const newState = reducer(existingState, action)

    expect(getTrays(newState)).toEqual([tray])
  })

  it('should set any required missing values to defaults', () => {
    const existingState = state({someId: {}})
    const trayId = 'trayId'
    const completeTray = buildTray({trayId})
    const partiallyImportedTray = {
      trayId,
      url: completeTray.url,
      name: completeTray.name // name isn't required but the default name is random, so setting makes the test simpler
    }
    const action = configurationImported({[TRAYS_ROOT]: {trayId: partiallyImportedTray}})

    const newState = reducer(existingState, action)

    expect(getTrays(newState)).toEqual([completeTray])
  })

  it('should handle no trays data', () => {
    const existingState = state({})
    const action = configurationImported({})
    const newState = reducer(existingState, action)
    expect(newState).toEqual(existingState)
  })
})

describe(Actions.TRAY_ADDED, () => {

  it('should set the tray data', () => {
    const existingState = state({})
    const action = trayAdded('trayId', '', AuthTypes.none, '', '', '')
    const newState = reducer(existingState, action)
    expect(getTrays(newState)[0]).toHaveProperty('trayId', 'trayId')
  })
})

describe(Actions.TRAY_UPDATED, () => {

  it('should set the given tray data', () => {
    const existingState = state({trayId: buildTray()})
    const action = trayUpdated('trayId', {name: 'some-name'})
    const newState = reducer(existingState, action)
    expect(getTrays(newState)[0].name).toEqual('some-name')
  })
})

describe(Actions.TRAY_REMOVED, () => {

  it('should set the tray data', () => {
    const existingState = state({trayId: buildTray()})
    const action = trayRemoved('trayId')
    const newState = reducer(existingState, action)
    expect(getTrays(newState)).toEqual([])
  })
})

describe(Actions.PROJECTS_FETCHED, () => {

  it('should set timestamp', () => {
    jest.spyOn(DateTime, 'now').mockReturnValue('some-timestamp')
    const existingState = state({trayId: buildTray()})
    const action = projectsFetched('trayId', [], false)
    const newState = reducer(existingState, action)
    expect(getTrays(newState)[0].timestamp).toEqual('some-timestamp')
  })

  it('should set server type', () => {
    const existingState = state({trayId: buildTray()})
    const action = projectsFetched('trayId', [buildProject({serverType: 'some-type'})], false)
    const newState = reducer(existingState, action)
    expect(getTrays(newState)[0].serverType).toEqual('some-type')
  })
})
