import {getTrays, reduce, TRAYS_ROOT, TraysState} from '../../../src/client/tracking/TraysReducer'
import {Actions} from '../../../src/client/Actions'
import {setConfiguration} from '../../../src/client/NevergreenActionCreators'
import {
  projectsFetched,
  trayRemoved,
  trayAdded,
  trayUpdated
} from '../../../src/client/tracking/TrackingActionCreators'
import * as DateTime from '../../../src/client/common/DateTime'
import {buildProject, buildState, buildTray, testReducer} from '../testHelpers'
import {RecursivePartial} from '../../../src/client/common/Types'
import {AuthTypes} from '../../../src/client/domain/Tray'

describe('TraysReducer', () => {

  const reducer = testReducer({
    [TRAYS_ROOT]: reduce
  })

  function state(existing?: RecursivePartial<TraysState>) {
    return buildState({[TRAYS_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state()
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(Actions.SET_CONFIGURATION, () => {

    test('should set the trays data, setting loaded to true on each tray', () => {
      const tray = buildTray({trayId: 'trayId'})
      const existingState = state({someId: {}})
      const action = setConfiguration({[TRAYS_ROOT]: {trayId: tray}})
      const newState = reducer(existingState, action)
      expect(getTrays(newState)).toEqual([tray])
    })

    test('should handle no trays data', () => {
      const existingState = state({})
      const action = setConfiguration({})
      const newState = reducer(existingState, action)
      expect(newState).toEqual(existingState)
    })
  })

  describe(Actions.TRAY_ADDED, () => {

    test('should set the tray data', () => {
      const existingState = state({})
      const action = trayAdded('trayId', '', AuthTypes.none, '', '', '')
      const newState = reducer(existingState, action)
      expect(getTrays(newState)[0]).toHaveProperty('trayId', 'trayId')
    })
  })

  describe(Actions.TRAY_UPDATED, () => {

    test('should set the given tray data', () => {
      const existingState = state({trayId: buildTray()})
      const action = trayUpdated('trayId', {name: 'some-name'})
      const newState = reducer(existingState, action)
      expect(getTrays(newState)[0].name).toEqual('some-name')
    })
  })

  describe(Actions.TRAY_REMOVED, () => {

    test('should set the tray data', () => {
      const existingState = state({trayId: buildTray()})
      const action = trayRemoved('trayId')
      const newState = reducer(existingState, action)
      expect(getTrays(newState)).toEqual([])
    })
  })

  describe(Actions.PROJECTS_FETCHED, () => {

    test('should set timestamp', () => {
      jest.spyOn(DateTime, 'now').mockReturnValue('some-timestamp')
      const existingState = state({trayId: buildTray()})
      const action = projectsFetched('trayId', [], false)
      const newState = reducer(existingState, action)
      expect(getTrays(newState)[0].timestamp).toEqual('some-timestamp')
    })

    test('should set server type', () => {
      const existingState = state({trayId: buildTray()})
      const action = projectsFetched('trayId', [buildProject({serverType: 'some-type'})], false)
      const newState = reducer(existingState, action)
      expect(getTrays(newState)[0].serverType).toEqual('some-type')
    })
  })
})
