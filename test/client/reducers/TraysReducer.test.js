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
import {fromJS, List, Map} from 'immutable'
import {Tray} from '../../../src/client/domain/Tray'

describe('TraysReducer', () => {

  test('should return the state unmodified for an unknown action', () => {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INITIALISED, () => {

    test('should set the trays data', () => {
      const existingState = Map({someId: {}})
      const action = {type: INITIALISED, data: fromJS({[TRAYS_ROOT]: {trayId: {}}})}
      const newState = reduce(existingState, action)
      expect(newState).not.toHaveProperty('someId')
      expect(newState.get('trayId')).toBeInstanceOf(Tray)
    })

    test('should set the loaded property on added trays', () => {
      const existingState = Map()
      const action = {type: INITIALISED, data: fromJS({[TRAYS_ROOT]: {trayId: {}}})}
      const newState = reduce(existingState, action)
      expect(newState.get('trayId')).toHaveProperty('loaded', true)
    })

    test('should handle no trays data', () => {
      const existingState = Map()
      const action = {type: INITIALISED, data: Map()}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toEqual({})
    })
  })

  describe(IMPORT_SUCCESS, () => {

    test('should set the trays data', () => {
      const existingState = Map({someId: {}})
      const action = {type: IMPORT_SUCCESS, data: fromJS({[TRAYS_ROOT]: {trayId: {}}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).not.toHaveProperty('someId')
      expect(newState.toJS()).toHaveProperty('trayId')
    })

    test('should set the loaded property on added trays', () => {
      const existingState = Map()
      const action = {type: IMPORT_SUCCESS, data: fromJS({[TRAYS_ROOT]: {trayId: {}}})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.loaded', true)
    })
  })

  describe(TRAY_ADDED, () => {

    test('should set the tray data', () => {
      const existingState = Map()
      const action = {type: TRAY_ADDED, trayId: 'trayId', data: fromJS({foo: 'bar'})}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.foo', 'bar')
    })
  })

  describe(HIGHLIGHT_TRAY, () => {

    test('should set the highlight flag to true', () => {
      const existingState = fromJS({trayId: new Tray({highlight: false})})
      const action = {type: HIGHLIGHT_TRAY, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.highlight', true)
    })
  })

  describe(NAVIGATED, () => {

    test('should set the highlight flag to false for all trays', () => {
      const existingState = fromJS({trayId: new Tray({highlight: true})})
      const action = {type: NAVIGATED}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.highlight', false)
    })
  })

  describe(REMOVE_TRAY, () => {

    test('should set the tray data', () => {
      const existingState = Map({trayId: new Tray()})
      const action = {type: REMOVE_TRAY, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).not.toHaveProperty('trayId')
    })
  })

  describe(ENCRYPTING_PASSWORD, () => {

    test('should set as not loaded', () => {
      const existingState = fromJS({trayId: {loaded: true}})
      const action = {type: ENCRYPTING_PASSWORD, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.loaded', false)
    })
  })

  describe(PROJECTS_FETCHING, () => {

    test('should set as not loaded', () => {
      const existingState = fromJS({trayId: new Tray({loaded: true})})
      const action = {type: PROJECTS_FETCHING, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.loaded', false)
    })

    test('should remove any errors', () => {
      const existingState = fromJS({trayId: new Tray({errors: 'some-error'})})
      const action = {type: PROJECTS_FETCHING, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.errors', null)
    })

    test('should unset requires refresh', () => {
      const existingState = fromJS({trayId: new Tray({requiresRefresh: true})})
      const action = {type: PROJECTS_FETCHING, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.requiresRefresh', false)
    })
  })

  describe(PASSWORD_ENCRYPTED, () => {

    test('should set the password', () => {
      const existingState = Map({trayId: new Tray()})
      const action = {type: PASSWORD_ENCRYPTED, trayId: 'trayId', password: 'some-password'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.password', 'some-password')
    })

    test('should set loaded', () => {
      const existingState = Map({trayId: new Tray({loaded: false})})
      const action = {type: PASSWORD_ENCRYPTED, trayId: 'trayId', password: 'some-password'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.loaded', true)
    })

    test('should remove any errors', () => {
      const existingState = Map({trayId: new Tray({errors: List.of('some-error')})})
      const action = {type: PASSWORD_ENCRYPTED, trayId: 'trayId', password: 'some-password'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.errors', null)
    })

    test('should set requires refresh', () => {
      const existingState = Map({trayId: new Tray({requiresRefresh: false})})
      const action = {type: PASSWORD_ENCRYPTED, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.requiresRefresh', true)
    })
  })

  describe(PROJECTS_FETCHED, () => {

    test('should set loaded', () => {
      const existingState = Map({trayId: new Tray({loaded: false})})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.loaded', true)
    })

    test('should set timestamp', () => {
      const existingState = Map({trayId: new Tray()})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', timestamp: 'some-timestamp'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.timestamp', 'some-timestamp')
    })

    test('should set server type', () => {
      const existingState = Map({trayId: new Tray()})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', serverType: 'some-type'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.serverType', 'some-type')
    })

    test('should remove any errors', () => {
      const existingState = Map({trayId: new Tray({errors: List.of('some-error')})})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).not.toHaveProperty('errors')
    })
  })

  describe(PASSWORD_ENCRYPT_ERROR, () => {

    test('should set loaded', () => {
      const existingState = Map({trayId: new Tray({loaded: false})})
      const action = {type: PASSWORD_ENCRYPT_ERROR, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.loaded', true)
    })

    test('should set errors', () => {
      const existingState = Map({trayId: new Tray()})
      const action = {type: PASSWORD_ENCRYPT_ERROR, trayId: 'trayId', errors: List(['some-error'])}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.errors', ['some-error'])
    })
  })

  describe(PROJECTS_FETCH_ERROR, () => {

    test('should set loaded', () => {
      const existingState = Map({trayId: new Tray({loaded: false})})
      const action = {type: PROJECTS_FETCH_ERROR, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.loaded', true)
    })

    test('should set errors', () => {
      const existingState = Map({trayId: new Tray()})
      const action = {type: PROJECTS_FETCH_ERROR, trayId: 'trayId', errors: List(['some-error'])}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.errors', ['some-error'])
    })
  })

  describe(SET_TRAY_NAME, () => {

    test('should set the name', () => {
      const existingState = Map({trayId: new Tray({name: 'some-name'})})
      const action = {type: SET_TRAY_NAME, trayId: 'trayId', name: 'some-new-name'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.name', 'some-new-name')
    })
  })

  describe(SET_SERVER_TYPE, () => {

    test('should set the server type', () => {
      const existingState = Map({trayId: new Tray({serverType: 'some-type'})})
      const action = {type: SET_SERVER_TYPE, trayId: 'trayId', serverType: 'some-new-type'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.serverType', 'some-new-type')
    })
  })

  describe(SET_TRAY_USERNAME, () => {

    test('should set the username if its different', () => {
      const existingState = Map({trayId: new Tray({username: 'some-username'})})
      const action = {type: SET_TRAY_USERNAME, trayId: 'trayId', username: 'some-new-username'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.username', 'some-new-username')
    })

    test('should set requires refresh if the username is different', () => {
      const existingState = Map({
        trayId: new Tray({
          trayId: 'trayId',
          username: 'some-username',
          requiresRefresh: false
        })
      })
      const action = {type: SET_TRAY_USERNAME, trayId: 'trayId', username: 'some-new-username'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.requiresRefresh', true)
    })

    test('should not set requires refresh if the username is the same', () => {
      const existingState = Map({
        trayId: new Tray({
          trayId: 'trayId',
          username: 'some-username',
          requiresRefresh: false
        })
      })
      const action = {type: SET_TRAY_USERNAME, trayId: 'trayId', username: 'some-username'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.requiresRefresh', false)
    })
  })

  describe(SET_TRAY_URL, () => {

    test('should set the url if its different', () => {
      const existingState = Map({trayId: new Tray({trayId: 'trayId', url: 'some-url'})})
      const action = {type: SET_TRAY_URL, trayId: 'trayId', url: 'some-new-url'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.url', 'some-new-url')
    })

    test('should set requires refresh if the URL is different', () => {
      const existingState = Map({trayId: new Tray({trayId: 'trayId', url: 'some-url', requiresRefresh: false})})
      const action = {type: SET_TRAY_URL, trayId: 'trayId', url: 'some-new-url'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.requiresRefresh', true)
    })

    test('should not set requires refresh if the URL is the same', () => {
      const existingState = Map({trayId: new Tray({trayId: 'trayId', url: 'some-url', requiresRefresh: false})})
      const action = {type: SET_TRAY_URL, trayId: 'trayId', url: 'some-url'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.requiresRefresh', false)
    })
  })

  describe(SET_INCLUDE_NEW, () => {

    test('should set include new', () => {
      const existingState = Map({trayId: new Tray({trayId: 'trayId', includeNew: false})})
      const action = {type: SET_INCLUDE_NEW, trayId: 'trayId', value: true}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('trayId.includeNew', true)
    })
  })
})
