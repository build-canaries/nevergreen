import {reduce, TRAYS_ROOT} from '../../../src/client/reducers/TraysReducer'
import {
  ENCRYPTING_PASSWORD,
  HIGHLIGHT_TRAY,
  IMPORT_SUCCESS,
  INITIALISED,
  NAVIGATED,
  PASSWORD_ENCRYPT_ERROR,
  PASSWORD_ENCRYPTED,
  PROJECTS_FETCH_ERROR,
  PROJECTS_FETCHED,
  PROJECTS_FETCHING,
  REMOVE_TRAY,
  SET_INCLUDE_NEW,
  SET_SERVER_TYPE,
  SET_TRAY_NAME,
  SET_TRAY_URL,
  SET_TRAY_USERNAME,
  TRAY_ADDED
} from '../../../src/client/actions/Actions'
import {fromJS, List} from 'immutable'
import {Tray} from '../../../src/client/domain/Tray'
import {combineReducers} from 'redux-immutable'
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
import {Project} from '../../../src/client/domain/Project'
import * as DateTime from '../../../src/client/common/DateTime'

describe('TraysReducer', () => {

  const reducer = combineReducers({
    [TRAYS_ROOT]: reduce
  })

  function state(existing) {
    return fromJS({[TRAYS_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state({foo: 'bar'})
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INITIALISED, () => {

    test('should set the trays data', () => {
      const existingState = state({someId: {}})
      const action = initalised({[TRAYS_ROOT]: {trayId: {}}})
      const newState = reducer(existingState, action)
      expect(getTray(newState, 'someId')).toBeUndefined()
      expect(getTray(newState, 'trayId')).toBeInstanceOf(Tray)
    })

    test('should set the loaded property on added trays', () => {
      const existingState = state({})
      const action = initalised({[TRAYS_ROOT]: {trayId: {}}})
      const newState = reducer(existingState, action)
      expect(getTrayLoaded(newState, 'trayId')).toBeTruthy()
    })

    test('should handle no trays data', () => {
      const existingState = state({})
      const action = initalised({})
      const newState = reducer(existingState, action)
      expect(newState.toJS()).toEqual({trays: {}})
    })
  })

  describe(IMPORT_SUCCESS, () => {

    test('should set the trays data', () => {
      const existingState = state({someId: {}})
      const action = importSuccess({[TRAYS_ROOT]: {trayId: {}}})
      const newState = reducer(existingState, action)
      expect(getTray(newState, 'someId')).toBeUndefined()
      expect(getTray(newState, 'trayId')).toBeInstanceOf(Tray)
    })

    test('should set the loaded property on added trays', () => {
      const existingState = state({})
      const action = importSuccess({[TRAYS_ROOT]: {trayId: {}}})
      const newState = reducer(existingState, action)
      expect(getTrayLoaded(newState, 'trayId')).toBeTruthy()
    })
  })

  describe(TRAY_ADDED, () => {

    test('should set the tray data', () => {
      const existingState = state({})
      const action = trayAdded('trayId', '', '')
      const newState = reducer(existingState, action)
      expect(getTray(newState, 'trayId')).toBeInstanceOf(Tray)
    })
  })

  describe(HIGHLIGHT_TRAY, () => {

    test('should set the highlight flag to true', () => {
      const existingState = state({trayId: new Tray({highlight: false})})
      const action = highlightTray('trayId')
      const newState = reducer(existingState, action)
      expect(getTrayHighlight(newState, 'trayId')).toBeTruthy()
    })
  })

  describe(NAVIGATED, () => {

    test('should set the highlight flag to false for all trays', () => {
      const existingState = state({trayId: new Tray({highlight: true})})
      const action = navigated()
      const newState = reducer(existingState, action)
      expect(getTrayHighlight(newState, 'trayId')).toBeFalsy()
    })
  })

  describe(REMOVE_TRAY, () => {

    test('should set the tray data', () => {
      const existingState = state({trayId: new Tray()})
      const action = removeTray('trayId')
      const newState = reducer(existingState, action)
      expect(getTray(newState, 'trayId')).toBeUndefined()
    })
  })

  describe(ENCRYPTING_PASSWORD, () => {

    test('should set as not loaded', () => {
      const existingState = state({trayId: {loaded: true}})
      const action = encryptingPassword('trayId', '')
      const newState = reducer(existingState, action)
      expect(getTrayLoaded(newState, 'trayId')).toBeFalsy()
    })
  })

  describe(PROJECTS_FETCHING, () => {

    test('should set as not loaded', () => {
      const existingState = state({trayId: new Tray({loaded: true})})
      const action = projectsFetching('trayId')
      const newState = reducer(existingState, action)
      expect(getTrayLoaded(newState, 'trayId')).toBeFalsy()
    })

    test('should remove any errors', () => {
      const existingState = state({trayId: new Tray({errors: 'some-error'})})
      const action = projectsFetching('trayId')
      const newState = reducer(existingState, action)
      expect(getTrayErrors(newState, 'trayId')).toBeNull()
    })

    test('should unset requires refresh', () => {
      const existingState = state({trayId: new Tray({requiresRefresh: true})})
      const action = projectsFetching('trayId')
      const newState = reducer(existingState, action)
      expect(getTrayRequiresRefresh(newState, 'trayId')).toBeFalsy()
    })
  })

  describe(PASSWORD_ENCRYPTED, () => {

    test('should set the password', () => {
      const existingState = state({trayId: new Tray()})
      const action = passwordEncrypted('trayId', 'some-password')
      const newState = reducer(existingState, action)
      expect(getTrayPassword(newState, 'trayId')).toEqual('some-password')
    })

    test('should set loaded', () => {
      const existingState = state({trayId: new Tray({loaded: false})})
      const action = passwordEncrypted('trayId', 'some-password')
      const newState = reducer(existingState, action)
      expect(getTrayLoaded(newState, 'trayId')).toBeTruthy()
    })

    test('should remove any errors', () => {
      const existingState = state({trayId: new Tray({errors: List.of('some-error')})})
      const action = passwordEncrypted('trayId', 'some-password')
      const newState = reducer(existingState, action)
      expect(getTrayErrors(newState, 'trayId')).toBeNull()
    })

    test('should set requires refresh', () => {
      const existingState = state({trayId: new Tray({requiresRefresh: false})})
      const action = passwordEncrypted('trayId', '')
      const newState = reducer(existingState, action)
      expect(getTrayRequiresRefresh(newState, 'trayId')).toBeTruthy()
    })
  })

  describe(PROJECTS_FETCHED, () => {

    test('should set loaded', () => {
      const existingState = state({trayId: new Tray({loaded: false})})
      const action = projectsFetched('trayId', List(), false)
      const newState = reducer(existingState, action)
      expect(getTrayLoaded(newState, 'trayId')).toBeTruthy()
    })

    test('should set timestamp', () => {
      DateTime.now = jest.fn().mockReturnValue('some-timestamp')
      const existingState = state({trayId: new Tray()})
      const action = projectsFetched('trayId', List(), false)
      const newState = reducer(existingState, action)
      expect(getTrayTimestamp(newState, 'trayId')).toEqual('some-timestamp')
    })

    test('should set server type', () => {
      const existingState = state({trayId: new Tray()})
      const action = projectsFetched('trayId', List.of(new Project({serverType: 'some-type'})), false)
      const newState = reducer(existingState, action)
      expect(getTrayServerType(newState, 'trayId')).toEqual('some-type')
    })

    test('should remove any errors', () => {
      const existingState = state({trayId: new Tray({errors: List.of('some-error')})})
      const action = projectsFetched('trayId', List(), false)
      const newState = reducer(existingState, action)
      expect(getTrayErrors(newState, 'trayId')).toBeNull()
    })
  })

  describe(PASSWORD_ENCRYPT_ERROR, () => {

    test('should set loaded', () => {
      const existingState = state({trayId: new Tray({loaded: false})})
      const action = passwordEncryptError('trayId', ['some-error'])
      const newState = reducer(existingState, action)
      expect(getTrayLoaded(newState, 'trayId')).toBeTruthy()
    })

    test('should set errors', () => {
      const existingState = state({trayId: new Tray()})
      const action = passwordEncryptError('trayId', ['some-error'])
      const newState = reducer(existingState, action)
      expect(getTrayErrors(newState, 'trayId').toJS()).toEqual(['some-error'])
    })
  })

  describe(PROJECTS_FETCH_ERROR, () => {

    test('should set loaded', () => {
      const existingState = state({trayId: new Tray({loaded: false})})
      const action = projectsFetchError('trayId')
      const newState = reducer(existingState, action)
      expect(getTrayLoaded(newState, 'trayId')).toBeTruthy()
    })

    test('should set errors', () => {
      const existingState = state({trayId: new Tray()})
      const action = projectsFetchError('trayId', ['some-error'])
      const newState = reducer(existingState, action)
      expect(getTrayErrors(newState, 'trayId').toJS()).toEqual(['some-error'])
    })
  })

  describe(SET_TRAY_NAME, () => {

    test('should set the name', () => {
      const existingState = state({trayId: new Tray({name: 'some-name'})})
      const action = setTrayName('trayId', 'some-new-name')
      const newState = reducer(existingState, action)
      expect(getTrayName(newState, 'trayId')).toEqual('some-new-name')
    })
  })

  describe(SET_SERVER_TYPE, () => {

    test('should set the server type', () => {
      const existingState = state({trayId: new Tray({serverType: 'some-type'})})
      const action = setServerType('trayId', 'some-new-type')
      const newState = reducer(existingState, action)
      expect(getTrayServerType(newState, 'trayId')).toEqual('some-new-type')
    })
  })

  describe(SET_TRAY_USERNAME, () => {

    test('should set the username if its different', () => {
      const existingState = state({trayId: new Tray({username: 'some-username'})})
      const action = setTrayUsername('trayId', 'some-new-username')
      const newState = reducer(existingState, action)
      expect(getTrayUsername(newState, 'trayId')).toEqual('some-new-username')
    })

    test('should set requires refresh if the username is different', () => {
      const existingState = state({
        trayId: new Tray({
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
        trayId: new Tray({
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

  describe(SET_TRAY_URL, () => {

    test('should set the url if its different', () => {
      const existingState = state({trayId: new Tray({trayId: 'trayId', url: 'some-url'})})
      const action = setTrayUrl('trayId', 'some-new-url')
      const newState = reducer(existingState, action)
      expect(getTrayUrl(newState, 'trayId')).toEqual('some-new-url')
    })

    test('should set requires refresh if the URL is different', () => {
      const existingState = state({trayId: new Tray({trayId: 'trayId', url: 'some-url', requiresRefresh: false})})
      const action = setTrayUrl('trayId', 'some-new-url')
      const newState = reducer(existingState, action)
      expect(getTrayRequiresRefresh(newState, 'trayId')).toBeTruthy()
    })

    test('should not set requires refresh if the URL is the same', () => {
      const existingState = state({trayId: new Tray({trayId: 'trayId', url: 'some-url', requiresRefresh: false})})
      const action = setTrayUrl('trayId', 'some-url')
      const newState = reducer(existingState, action)
      expect(getTrayRequiresRefresh(newState, 'trayId')).toBeFalsy()
    })
  })

  describe(SET_INCLUDE_NEW, () => {

    test('should set include new', () => {
      const existingState = state({trayId: new Tray({trayId: 'trayId', includeNew: false})})
      const action = setIncludeNew('trayId', true)
      const newState = reducer(existingState, action)
      expect(getTrayIncludeNew(newState, 'trayId')).toBeTruthy()
    })
  })
})
