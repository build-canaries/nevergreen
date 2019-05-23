import {reduce, TRAYS_ROOT, TraysState} from '../../../src/client/reducers/TraysReducer'
import {Actions} from '../../../src/client/actions/Actions'
import {initalised, navigated} from '../../../src/client/actions/NevergreenActionCreators'
import {importSuccess} from '../../../src/client/actions/ImportActionCreators'
import {
  getTray,
  getTrayErrors,
  getTrayHighlight,
  getTrayIncludeNew,
  getTrayLoaded,
  getTrayName,
  getTrayPassword,
  getTrayRequiresRefresh,
  getTrayServerType,
  getTrayTimestamp,
  getTrayUrl,
  getTrayUsername
} from '../../../src/client/reducers/Selectors'
import {
  highlightTray,
  projectsFetched,
  projectsFetchError,
  projectsFetching,
  removeTray,
  setIncludeNew,
  setServerType,
  setTrayName,
  setTrayUrl,
  setTrayUsername,
  trayAdded
} from '../../../src/client/actions/TrackingActionCreators'
import {
  encryptingPassword,
  passwordEncrypted,
  passwordEncryptError
} from '../../../src/client/actions/PasswordActionCreators'
import * as DateTime from '../../../src/client/common/DateTime'
import {buildProject, buildState, buildTray, testReducer} from '../testHelpers'
import {RecursivePartial} from '../../../src/client/common/Types'
import {fakeRequest} from '../../../src/client/gateways/Gateway'

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

  describe(Actions.INITIALISED, () => {

    test('should set the trays data, setting loaded to true on each tray', () => {
      const tray = buildTray({trayId: 'trayId'})
      const existingState = state({someId: {}})
      const action = initalised({[TRAYS_ROOT]: {trayId: tray}})
      const newState = reducer(existingState, action)
      expect(getTray(newState, 'someId')).toBeUndefined()
      expect(getTray(newState, 'trayId')).toEqual({...tray, loaded: true})
    })

    test('should handle no trays data', () => {
      const existingState = state({})
      const action = initalised({})
      const newState = reducer(existingState, action)
      expect(newState).toEqual(existingState)
    })
  })

  describe(Actions.IMPORT_SUCCESS, () => {

    test('should set the trays data, setting loaded to true on each tray', () => {
      const tray = buildTray({trayId: 'trayId'})
      const existingState = state({someId: {}})
      const action = importSuccess({[TRAYS_ROOT]: {trayId: tray}})
      const newState = reducer(existingState, action)
      expect(getTray(newState, 'someId')).toBeUndefined()
      expect(getTray(newState, 'trayId')).toEqual({...tray, loaded: true})
    })

    test('should handle no trays data', () => {
      const existingState = state({})
      const action = importSuccess({})
      const newState = reducer(existingState, action)
      expect(newState).toEqual(existingState)
    })
  })

  describe(Actions.TRAY_ADDED, () => {

    test('should set the tray data', () => {
      const existingState = state({})
      const action = trayAdded('trayId', '', '')
      const newState = reducer(existingState, action)
      expect(getTray(newState, 'trayId')).toHaveProperty('trayId', 'trayId')
    })
  })

  describe(Actions.HIGHLIGHT_TRAY, () => {

    test('should set the highlight flag to true', () => {
      const existingState = state({trayId: buildTray({highlight: false})})
      const action = highlightTray('trayId')
      const newState = reducer(existingState, action)
      expect(getTrayHighlight(newState, 'trayId')).toBeTruthy()
    })
  })

  describe(Actions.NAVIGATED, () => {

    test('should set the highlight flag to false for all trays', () => {
      const existingState = state({trayId: buildTray({highlight: true})})
      const action = navigated()
      const newState = reducer(existingState, action)
      expect(getTrayHighlight(newState, 'trayId')).toBeFalsy()
    })
  })

  describe(Actions.REMOVE_TRAY, () => {

    test('should set the tray data', () => {
      const existingState = state({trayId: buildTray()})
      const action = removeTray('trayId')
      const newState = reducer(existingState, action)
      expect(getTray(newState, 'trayId')).toBeUndefined()
    })
  })

  describe(Actions.ENCRYPTING_PASSWORD, () => {

    test('should set as not loaded', () => {
      const existingState = state({trayId: {loaded: true}})
      const action = encryptingPassword('trayId', '', fakeRequest('irrelevant'))
      const newState = reducer(existingState, action)
      expect(getTrayLoaded(newState, 'trayId')).toBeFalsy()
    })
  })

  describe(Actions.PROJECTS_FETCHING, () => {

    test('should set as not loaded', () => {
      const existingState = state({trayId: buildTray({loaded: true})})
      const action = projectsFetching('trayId', fakeRequest('irrelevant'))
      const newState = reducer(existingState, action)
      expect(getTrayLoaded(newState, 'trayId')).toBeFalsy()
    })

    test('should remove any errors', () => {
      const existingState = state({trayId: buildTray({errors: ['some-error']})})
      const action = projectsFetching('trayId', fakeRequest('irrelevant'))
      const newState = reducer(existingState, action)
      expect(getTrayErrors(newState, 'trayId')).toEqual([])
    })

    test('should unset requires refresh', () => {
      const existingState = state({trayId: buildTray({requiresRefresh: true})})
      const action = projectsFetching('trayId', fakeRequest('irrelevant'))
      const newState = reducer(existingState, action)
      expect(getTrayRequiresRefresh(newState, 'trayId')).toBeFalsy()
    })
  })

  describe(Actions.PASSWORD_ENCRYPTED, () => {

    test('should set the password', () => {
      const existingState = state({trayId: buildTray()})
      const action = passwordEncrypted('trayId', 'some-password')
      const newState = reducer(existingState, action)
      expect(getTrayPassword(newState, 'trayId')).toEqual('some-password')
    })

    test('should set loaded', () => {
      const existingState = state({trayId: buildTray({loaded: false})})
      const action = passwordEncrypted('trayId', 'some-password')
      const newState = reducer(existingState, action)
      expect(getTrayLoaded(newState, 'trayId')).toBeTruthy()
    })

    test('should remove any errors', () => {
      const existingState = state({trayId: buildTray({errors: ['some-error']})})
      const action = passwordEncrypted('trayId', 'some-password')
      const newState = reducer(existingState, action)
      expect(getTrayErrors(newState, 'trayId')).toEqual([])
    })

    test('should set requires refresh', () => {
      const existingState = state({trayId: buildTray({requiresRefresh: false})})
      const action = passwordEncrypted('trayId', '')
      const newState = reducer(existingState, action)
      expect(getTrayRequiresRefresh(newState, 'trayId')).toBeTruthy()
    })
  })

  describe(Actions.PROJECTS_FETCHED, () => {

    test('should set loaded', () => {
      const existingState = state({trayId: buildTray({loaded: false})})
      const action = projectsFetched('trayId', [], false)
      const newState = reducer(existingState, action)
      expect(getTrayLoaded(newState, 'trayId')).toBeTruthy()
    })

    test('should set timestamp', () => {
      jest.spyOn(DateTime, 'now').mockReturnValue('some-timestamp')
      const existingState = state({trayId: buildTray()})
      const action = projectsFetched('trayId', [], false)
      const newState = reducer(existingState, action)
      expect(getTrayTimestamp(newState, 'trayId')).toEqual('some-timestamp')
    })

    test('should set server type', () => {
      const existingState = state({trayId: buildTray()})
      const action = projectsFetched('trayId', [buildProject({serverType: 'some-type'})], false)
      const newState = reducer(existingState, action)
      expect(getTrayServerType(newState, 'trayId')).toEqual('some-type')
    })

    test('should remove any errors', () => {
      const existingState = state({trayId: buildTray({errors: ['some-error']})})
      const action = projectsFetched('trayId', [], false)
      const newState = reducer(existingState, action)
      expect(getTrayErrors(newState, 'trayId')).toEqual([])
    })
  })

  describe(Actions.PASSWORD_ENCRYPT_ERROR, () => {

    test('should set loaded', () => {
      const existingState = state({trayId: buildTray({loaded: false})})
      const action = passwordEncryptError('trayId', ['some-error'])
      const newState = reducer(existingState, action)
      expect(getTrayLoaded(newState, 'trayId')).toBeTruthy()
    })

    test('should set errors', () => {
      const existingState = state({trayId: buildTray()})
      const action = passwordEncryptError('trayId', ['some-error'])
      const newState = reducer(existingState, action)
      expect(getTrayErrors(newState, 'trayId')).toEqual(['some-error'])
    })
  })

  describe(Actions.PROJECTS_FETCH_ERROR, () => {

    test('should set loaded', () => {
      const existingState = state({trayId: buildTray({loaded: false})})
      const action = projectsFetchError('trayId', [])
      const newState = reducer(existingState, action)
      expect(getTrayLoaded(newState, 'trayId')).toBeTruthy()
    })

    test('should set errors', () => {
      const existingState = state({trayId: buildTray()})
      const action = projectsFetchError('trayId', ['some-error'])
      const newState = reducer(existingState, action)
      expect(getTrayErrors(newState, 'trayId')).toEqual(['some-error'])
    })
  })

  describe(Actions.SET_TRAY_NAME, () => {

    test('should set the name', () => {
      const existingState = state({trayId: buildTray({name: 'some-name'})})
      const action = setTrayName('trayId', 'some-new-name')
      const newState = reducer(existingState, action)
      expect(getTrayName(newState, 'trayId')).toEqual('some-new-name')
    })
  })

  describe(Actions.SET_SERVER_TYPE, () => {

    test('should set the server type', () => {
      const existingState = state({trayId: buildTray({serverType: 'some-type'})})
      const action = setServerType('trayId', 'some-new-type')
      const newState = reducer(existingState, action)
      expect(getTrayServerType(newState, 'trayId')).toEqual('some-new-type')
    })
  })

  describe(Actions.SET_TRAY_USERNAME, () => {

    test('should set the username if its different', () => {
      const existingState = state({trayId: buildTray({username: 'some-username'})})
      const action = setTrayUsername('trayId', 'some-new-username')
      const newState = reducer(existingState, action)
      expect(getTrayUsername(newState, 'trayId')).toEqual('some-new-username')
    })

    test('should set requires refresh if the username is different', () => {
      const existingState = state({
        trayId: buildTray({
          trayId: 'trayId',
          username: 'some-username',
          requiresRefresh: false
        })
      })
      const action = setTrayUsername('trayId', 'some-new-username')
      const newState = reducer(existingState, action)
      expect(getTrayRequiresRefresh(newState, 'trayId')).toBeTruthy()
    })

    test('should not set requires refresh if the username is the same', () => {
      const existingState = state({
        trayId: buildTray({
          trayId: 'trayId',
          username: 'some-username',
          requiresRefresh: false
        })
      })
      const action = setTrayUsername('trayId', 'some-username')
      const newState = reducer(existingState, action)
      expect(getTrayRequiresRefresh(newState, 'trayId')).toBeFalsy()
    })
  })

  describe(Actions.SET_TRAY_URL, () => {

    test('should set the url if its different', () => {
      const existingState = state({trayId: buildTray({trayId: 'trayId', url: 'some-url'})})
      const action = setTrayUrl('trayId', 'some-new-url')
      const newState = reducer(existingState, action)
      expect(getTrayUrl(newState, 'trayId')).toEqual('some-new-url')
    })

    test('should set requires refresh if the URL is different', () => {
      const existingState = state({trayId: buildTray({trayId: 'trayId', url: 'some-url', requiresRefresh: false})})
      const action = setTrayUrl('trayId', 'some-new-url')
      const newState = reducer(existingState, action)
      expect(getTrayRequiresRefresh(newState, 'trayId')).toBeTruthy()
    })

    test('should not set requires refresh if the URL is the same', () => {
      const existingState = state({trayId: buildTray({trayId: 'trayId', url: 'some-url', requiresRefresh: false})})
      const action = setTrayUrl('trayId', 'some-url')
      const newState = reducer(existingState, action)
      expect(getTrayRequiresRefresh(newState, 'trayId')).toBeFalsy()
    })
  })

  describe(Actions.SET_INCLUDE_NEW, () => {

    test('should set include new', () => {
      const existingState = state({trayId: buildTray({trayId: 'trayId', includeNew: false})})
      const action = setIncludeNew('trayId', true)
      const newState = reducer(existingState, action)
      expect(getTrayIncludeNew(newState, 'trayId')).toBeTruthy()
    })
  })
})
