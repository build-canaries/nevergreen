import {
  getTray,
  getTrayAccessToken,
  getTrayAuthType,
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
  getTrayUsername,
  reduce,
  TRAYS_ROOT,
  TraysState
} from '../../../src/client/tracking/TraysReducer'
import {Actions} from '../../../src/client/Actions'
import {navigated, setConfiguration} from '../../../src/client/NevergreenActionCreators'
import {
  highlightTray,
  projectsFetched,
  projectsFetchError,
  projectsFetching,
  removeTray,
  setAuthType,
  setIncludeNew,
  setServerType,
  setTrayName,
  setTrayUrl,
  setTrayUsername,
  trayAdded
} from '../../../src/client/tracking/TrackingActionCreators'
import {
  encryptingPassword,
  passwordEncrypted,
  passwordEncryptError
} from '../../../src/client/tracking/PasswordActionCreators'
import {
  encryptingToken,
  tokenEncrypted,
  tokenEncryptError
} from '../../../src/client/tracking/AccessTokenActionCreators'
import * as DateTime from '../../../src/client/common/DateTime'
import {buildProject, buildState, buildTray, testReducer} from '../testHelpers'
import {RecursivePartial} from '../../../src/client/common/Types'
import {fakeRequest} from '../../../src/client/gateways/Gateway'
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
      expect(getTray('someId')(newState)).toBeUndefined()
      expect(getTray('trayId')(newState)).toEqual({...tray, loaded: true})
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
      const action = trayAdded('trayId', '', {type: AuthTypes.none})
      const newState = reducer(existingState, action)
      expect(getTray('trayId')(newState)).toHaveProperty('trayId', 'trayId')
    })
  })

  describe(Actions.HIGHLIGHT_TRAY, () => {

    test('should set the highlight flag to true', () => {
      const existingState = state({trayId: buildTray({highlight: false})})
      const action = highlightTray('trayId')
      const newState = reducer(existingState, action)
      expect(getTrayHighlight('trayId')(newState)).toBeTruthy()
    })
  })

  describe(Actions.NAVIGATED, () => {

    test('should set the highlight flag to false for all trays', () => {
      const existingState = state({trayId: buildTray({highlight: true})})
      const action = navigated()
      const newState = reducer(existingState, action)
      expect(getTrayHighlight('trayId')(newState)).toBeFalsy()
    })
  })

  describe(Actions.REMOVE_TRAY, () => {

    test('should set the tray data', () => {
      const existingState = state({trayId: buildTray()})
      const action = removeTray('trayId')
      const newState = reducer(existingState, action)
      expect(getTray('trayId')(newState)).toBeUndefined()
    })
  })

  describe(Actions.ENCRYPTING_PASSWORD, () => {

    test('should set as not loaded', () => {
      const existingState = state({trayId: {loaded: true}})
      const action = encryptingPassword('trayId', '', fakeRequest('irrelevant'))
      const newState = reducer(existingState, action)
      expect(getTrayLoaded('trayId')(newState)).toBeFalsy()
    })
  })

  describe(Actions.ENCRYPTING_TOKEN, () => {

    test('should set as not loaded', () => {
      const existingState = state({trayId: {loaded: true}})
      const action = encryptingToken('trayId', '', fakeRequest('irrelevant'))
      const newState = reducer(existingState, action)
      expect(getTrayLoaded('trayId')(newState)).toBeFalsy()
    })
  })

  describe(Actions.PROJECTS_FETCHING, () => {

    test('should set as not loaded', () => {
      const existingState = state({trayId: buildTray({loaded: true})})
      const action = projectsFetching('trayId', fakeRequest('irrelevant'))
      const newState = reducer(existingState, action)
      expect(getTrayLoaded('trayId')(newState)).toBeFalsy()
    })

    test('should remove any errors', () => {
      const existingState = state({trayId: buildTray({errors: ['some-error']})})
      const action = projectsFetching('trayId', fakeRequest('irrelevant'))
      const newState = reducer(existingState, action)
      expect(getTrayErrors('trayId')(newState)).toEqual([])
    })

    test('should unset requires refresh', () => {
      const existingState = state({trayId: buildTray({requiresRefresh: true})})
      const action = projectsFetching('trayId', fakeRequest('irrelevant'))
      const newState = reducer(existingState, action)
      expect(getTrayRequiresRefresh('trayId')(newState)).toBeFalsy()
    })
  })

  describe(Actions.PASSWORD_ENCRYPTED, () => {

    test('should set the password', () => {
      const existingState = state({trayId: buildTray()})
      const action = passwordEncrypted('trayId', 'some-password')
      const newState = reducer(existingState, action)
      expect(getTrayPassword('trayId')(newState)).toEqual('some-password')
    })

    test('should set loaded', () => {
      const existingState = state({trayId: buildTray({loaded: false})})
      const action = passwordEncrypted('trayId', 'some-password')
      const newState = reducer(existingState, action)
      expect(getTrayLoaded('trayId')(newState)).toBeTruthy()
    })

    test('should remove any errors', () => {
      const existingState = state({trayId: buildTray({errors: ['some-error']})})
      const action = passwordEncrypted('trayId', 'some-password')
      const newState = reducer(existingState, action)
      expect(getTrayErrors('trayId')(newState)).toEqual([])
    })

    test('should set requires refresh', () => {
      const existingState = state({trayId: buildTray({requiresRefresh: false})})
      const action = passwordEncrypted('trayId', '')
      const newState = reducer(existingState, action)
      expect(getTrayRequiresRefresh('trayId')(newState)).toBeTruthy()
    })
  })

  describe(Actions.TOKEN_ENCRYPTED, () => {

    test('should set the accessToken', () => {
      const existingState = state({trayId: buildTray()})
      const action = tokenEncrypted('trayId', 'some-dummy-token')
      const newState = reducer(existingState, action)
      expect(getTrayAccessToken('trayId')(newState)).toEqual('some-dummy-token')
    })

    test('should set loaded', () => {
      const existingState = state({trayId: buildTray({loaded: false})})
      const action = tokenEncrypted('trayId', 'some-password')
      const newState = reducer(existingState, action)
      expect(getTrayLoaded('trayId')(newState)).toBeTruthy()
    })

    test('should remove any errors', () => {
      const existingState = state({trayId: buildTray({errors: ['some-error']})})
      const action = tokenEncrypted('trayId', 'some-password')
      const newState = reducer(existingState, action)
      expect(getTrayErrors('trayId')(newState)).toEqual([])
    })

    test('should set requires refresh', () => {
      const existingState = state({trayId: buildTray({requiresRefresh: false})})
      const action = tokenEncrypted('trayId', '')
      const newState = reducer(existingState, action)
      expect(getTrayRequiresRefresh('trayId')(newState)).toBeTruthy()
    })
  })

  describe(Actions.PROJECTS_FETCHED, () => {

    test('should set loaded', () => {
      const existingState = state({trayId: buildTray({loaded: false})})
      const action = projectsFetched('trayId', [], false)
      const newState = reducer(existingState, action)
      expect(getTrayLoaded('trayId')(newState)).toBeTruthy()
    })

    test('should set timestamp', () => {
      jest.spyOn(DateTime, 'now').mockReturnValue('some-timestamp')
      const existingState = state({trayId: buildTray()})
      const action = projectsFetched('trayId', [], false)
      const newState = reducer(existingState, action)
      expect(getTrayTimestamp('trayId')(newState)).toEqual('some-timestamp')
    })

    test('should set server type', () => {
      const existingState = state({trayId: buildTray()})
      const action = projectsFetched('trayId', [buildProject({serverType: 'some-type'})], false)
      const newState = reducer(existingState, action)
      expect(getTrayServerType('trayId')(newState)).toEqual('some-type')
    })

    test('should remove any errors', () => {
      const existingState = state({trayId: buildTray({errors: ['some-error']})})
      const action = projectsFetched('trayId', [], false)
      const newState = reducer(existingState, action)
      expect(getTrayErrors('trayId')(newState)).toEqual([])
    })
  })

  describe(Actions.PASSWORD_ENCRYPT_ERROR, () => {

    test('should set loaded', () => {
      const existingState = state({trayId: buildTray({loaded: false})})
      const action = passwordEncryptError('trayId', ['some-error'])
      const newState = reducer(existingState, action)
      expect(getTrayLoaded('trayId')(newState)).toBeTruthy()
    })

    test('should set errors', () => {
      const existingState = state({trayId: buildTray()})
      const action = passwordEncryptError('trayId', ['some-error'])
      const newState = reducer(existingState, action)
      expect(getTrayErrors('trayId')(newState)).toEqual(['some-error'])
    })
  })

  describe(Actions.TOKEN_ENCRYPT_ERROR, () => {

    test('should set loaded', () => {
      const existingState = state({trayId: buildTray({loaded: false})})
      const action = tokenEncryptError('trayId', ['some-error'])
      const newState = reducer(existingState, action)
      expect(getTrayLoaded('trayId')(newState)).toBeTruthy()
    })

    test('should set errors', () => {
      const existingState = state({trayId: buildTray()})
      const action = tokenEncryptError('trayId', ['some-error'])
      const newState = reducer(existingState, action)
      expect(getTrayErrors('trayId')(newState)).toEqual(['some-error'])
    })
  })

  describe(Actions.PROJECTS_FETCH_ERROR, () => {

    test('should set loaded', () => {
      const existingState = state({trayId: buildTray({loaded: false})})
      const action = projectsFetchError('trayId', [])
      const newState = reducer(existingState, action)
      expect(getTrayLoaded('trayId')(newState)).toBeTruthy()
    })

    test('should set errors', () => {
      const existingState = state({trayId: buildTray()})
      const action = projectsFetchError('trayId', ['some-error'])
      const newState = reducer(existingState, action)
      expect(getTrayErrors('trayId')(newState)).toEqual(['some-error'])
    })
  })

  describe(Actions.SET_TRAY_NAME, () => {

    test('should set the name', () => {
      const existingState = state({trayId: buildTray({name: 'some-name'})})
      const action = setTrayName('trayId', 'some-new-name')
      const newState = reducer(existingState, action)
      expect(getTrayName('trayId')(newState)).toEqual('some-new-name')
    })
  })

  describe(Actions.SET_SERVER_TYPE, () => {

    test('should set the server type', () => {
      const existingState = state({trayId: buildTray({serverType: 'some-type'})})
      const action = setServerType('trayId', 'some-new-type')
      const newState = reducer(existingState, action)
      expect(getTrayServerType('trayId')(newState)).toEqual('some-new-type')
    })
  })

  describe(Actions.SET_TRAY_AUTH_TYPE, () => {

    test('should set the auth type', () => {
      const existingState = state({trayId: buildTray({authType: AuthTypes.none})})
      const action = setAuthType('trayId', AuthTypes.basic)
      const newState = reducer(existingState, action)
      expect(getTrayAuthType('trayId')(newState)).toEqual(AuthTypes.basic)
    })

    test('should set requires refresh if the auth type is different', () => {
      const existingState = state({trayId: buildTray({authType: AuthTypes.none})})
      const action = setAuthType('trayId', AuthTypes.basic)
      const newState = reducer(existingState, action)
      expect(getTrayRequiresRefresh('trayId')(newState)).toBeTruthy()
    })
  })

  describe(Actions.SET_TRAY_USERNAME, () => {

    test('should set the username if its different', () => {
      const existingState = state({trayId: buildTray({username: 'some-username'})})
      const action = setTrayUsername('trayId', 'some-new-username')
      const newState = reducer(existingState, action)
      expect(getTrayUsername('trayId')(newState)).toEqual('some-new-username')
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
      expect(getTrayRequiresRefresh('trayId')(newState)).toBeTruthy()
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
      expect(getTrayRequiresRefresh('trayId')(newState)).toBeFalsy()
    })
  })

  describe(Actions.SET_TRAY_URL, () => {

    test('should set the url if its different', () => {
      const existingState = state({trayId: buildTray({trayId: 'trayId', url: 'some-url'})})
      const action = setTrayUrl('trayId', 'some-new-url')
      const newState = reducer(existingState, action)
      expect(getTrayUrl('trayId')(newState)).toEqual('some-new-url')
    })

    test('should set requires refresh if the URL is different', () => {
      const existingState = state({trayId: buildTray({trayId: 'trayId', url: 'some-url', requiresRefresh: false})})
      const action = setTrayUrl('trayId', 'some-new-url')
      const newState = reducer(existingState, action)
      expect(getTrayRequiresRefresh('trayId')(newState)).toBeTruthy()
    })

    test('should not set requires refresh if the URL is the same', () => {
      const existingState = state({trayId: buildTray({trayId: 'trayId', url: 'some-url', requiresRefresh: false})})
      const action = setTrayUrl('trayId', 'some-url')
      const newState = reducer(existingState, action)
      expect(getTrayRequiresRefresh('trayId')(newState)).toBeFalsy()
    })
  })

  describe(Actions.SET_INCLUDE_NEW, () => {

    test('should set include new', () => {
      const existingState = state({trayId: buildTray({trayId: 'trayId', includeNew: false})})
      const action = setIncludeNew('trayId', true)
      const newState = reducer(existingState, action)
      expect(getTrayIncludeNew('trayId')(newState)).toBeTruthy()
    })
  })
})
