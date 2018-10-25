import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/TraysReducer'
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
  SET_SERVER_TYPE,
  SET_TRAY_ID,
  SET_TRAY_NAME,
  SET_TRAY_URL,
  SET_TRAY_USERNAME,
  TRAY_ADDED
} from '../../../src/client/actions/Actions'
import {fromJS, List, Map} from 'immutable'

describe('TraysReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe(INITIALISED, function () {

    it('should set the trays data', function () {
      const existingState = Map({someId: {}})
      const action = {type: INITIALISED, data: fromJS({trays: {trayId: {}}})}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('someId')
      expect(newState).to.have.property('trayId').that.is.instanceof(Map)
    })

    it('should set the loaded property on added trays', function () {
      const existingState = Map()
      const action = {type: INITIALISED, data: fromJS({trays: {trayId: {}}})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })

    it('should handle no trays data', function () {
      const existingState = Map()
      const action = {type: INITIALISED, data: Map()}
      const newState = reduce(existingState, action)
      expect(newState).to.be.empty()
    })
  })

  describe(IMPORT_SUCCESS, function () {

    it('should set the trays data', function () {
      const existingState = Map({someId: {}})
      const action = {type: IMPORT_SUCCESS, data: fromJS({trays: {trayId: {}}})}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('someId')
      expect(newState).to.have.property('trayId').that.is.instanceof(Map)
    })

    it('should set the loaded property on added trays', function () {
      const existingState = Map()
      const action = {type: IMPORT_SUCCESS, data: fromJS({trays: {trayId: {}}})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })
  })

  describe(TRAY_ADDED, function () {

    it('should set the tray data', function () {
      const existingState = Map()
      const action = {type: TRAY_ADDED, trayId: 'trayId', data: fromJS({foo: 'bar'})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('foo', 'bar')
    })
  })

  describe(HIGHLIGHT_TRAY, function () {

    it('should set the highlight flag to true', function () {
      const existingState = fromJS({trayId: {highlight: false}})
      const action = {type: HIGHLIGHT_TRAY, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('highlight', true)
    })
  })

  describe(NAVIGATED, function () {

    it('should set the highlight flag to false for all trays', function () {
      const existingState = fromJS({trayId: {highlight: true}})
      const action = {type: NAVIGATED}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('highlight', false)
    })
  })

  describe(REMOVE_TRAY, function () {

    it('should set the tray data', function () {
      const existingState = Map({trayId: {}})
      const action = {type: REMOVE_TRAY, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('trayId')
    })
  })

  describe(ENCRYPTING_PASSWORD, function () {

    it('should set as not loaded', function () {
      const existingState = fromJS({trayId: {loaded: true}})
      const action = {type: ENCRYPTING_PASSWORD, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', false)
    })
  })

  describe(PROJECTS_FETCHING, function () {

    it('should set as not loaded', function () {
      const existingState = fromJS({trayId: {loaded: true}})
      const action = {type: PROJECTS_FETCHING, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', false)
    })

    it('should remove any errors', function () {
      const existingState = fromJS({trayId: {errors: 'some-error'}})
      const action = {type: PROJECTS_FETCHING, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.not.has.property('errors')
    })
  })

  describe(PASSWORD_ENCRYPTED, function () {

    it('should set the password', function () {
      const existingState = fromJS({trayId: {}})
      const action = {type: PASSWORD_ENCRYPTED, trayId: 'trayId', password: 'some-password'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('password', 'some-password')
    })

    it('should set loaded', function () {
      const existingState = fromJS({trayId: {loaded: false}})
      const action = {type: PASSWORD_ENCRYPTED, trayId: 'trayId', password: 'some-password'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })

    it('should remove any errors', function () {
      const existingState = fromJS({trayId: {errors: ['some-error']}})
      const action = {type: PASSWORD_ENCRYPTED, trayId: 'trayId', password: 'some-password'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.not.has.property('errors')
    })
  })

  describe(PROJECTS_FETCHED, function () {

    it('should set loaded', function () {
      const existingState = fromJS({trayId: {loaded: false}})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })

    it('should set timestamp', function () {
      const existingState = fromJS({trayId: {}})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', timestamp: 'some-timestamp'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('timestamp', 'some-timestamp')
    })

    it('should set server type', function () {
      const existingState = fromJS({trayId: {}})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', serverType: 'some-type'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('serverType', 'some-type')
    })

    it('should remove any errors', function () {
      const existingState = fromJS({trayId: {errors: ['some-error']}})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('errors')
    })
  })

  describe(PASSWORD_ENCRYPT_ERROR, function () {

    it('should set loaded', function () {
      const existingState = fromJS({trayId: {loaded: false}})
      const action = {type: PASSWORD_ENCRYPT_ERROR, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })

    it('should set errors', function () {
      const existingState = fromJS({trayId: {}})
      const action = {type: PASSWORD_ENCRYPT_ERROR, trayId: 'trayId', errors: List(['some-error'])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('errors').that.contains('some-error')
    })
  })

  describe(PROJECTS_FETCH_ERROR, function () {

    it('should set loaded', function () {
      const existingState = fromJS({trayId: {loaded: false}})
      const action = {type: PROJECTS_FETCH_ERROR, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })

    it('should set errors', function () {
      const existingState = fromJS({trayId: {}})
      const action = {type: PROJECTS_FETCH_ERROR, trayId: 'trayId', errors: List(['some-error'])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('errors').that.contains('some-error')
    })
  })

  describe(SET_TRAY_NAME, function () {

    it('should set the name', function () {
      const existingState = fromJS({trayId: {name: 'some-name'}})
      const action = {type: SET_TRAY_NAME, trayId: 'trayId', name: 'some-new-name'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('name', 'some-new-name')
    })
  })

  describe(SET_SERVER_TYPE, function () {

    it('should set the server type', function () {
      const existingState = fromJS({trayId: {serverType: 'some-type'}})
      const action = {type: SET_SERVER_TYPE, trayId: 'trayId', serverType: 'some-new-type'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('serverType', 'some-new-type')
    })
  })

  describe(SET_TRAY_USERNAME, function () {

    it('should set the name', function () {
      const existingState = fromJS({trayId: {username: 'some-username'}})
      const action = {type: SET_TRAY_USERNAME, trayId: 'trayId', username: 'some-new-username'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('username', 'some-new-username')
    })
  })

  describe(SET_TRAY_URL, function () {

    it('should set the url', function () {
      const existingState = fromJS({trayId: {trayId: 'trayId', url: 'some-url'}})
      const action = {type: SET_TRAY_URL, trayId: 'trayId', url: 'some-new-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('url', 'some-new-url')
    })
  })

  describe(SET_TRAY_ID, function () {

    it('should update the key in the state to the new tray id', function () {
      const existingState = fromJS({trayId: {trayId: 'trayId', url: 'some-url'}})
      const action = {type: SET_TRAY_ID, originalTrayId: 'trayId', newTrayId: 'some-new-url', url: 'some-new-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('some-new-url')
      expect(newState).to.not.have.property('trayId')
    })

    it('should set the tray id', function () {
      const existingState = fromJS({trayId: {trayId: 'trayId', url: 'some-url'}})
      const action = {type: SET_TRAY_ID, originalTrayId: 'trayId', newTrayId: 'some-new-url', url: 'some-new-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('some-new-url').that.has.property('trayId', 'some-new-url')
    })
  })
})
