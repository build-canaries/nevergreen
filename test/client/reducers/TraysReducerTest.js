import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/TraysReducer'
import {INITIALISED, NAVIGATED} from '../../../src/client/actions/NevergreenActions'
import {IMPORT_SUCCESS} from '../../../src/client/actions/ImportActions'
import {
  ENCRYPTING_PASSWORD,
  HIGHLIGHT_TRAY,
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
} from '../../../src/client/actions/TrackingActions'
import Immutable from 'immutable'

describe('TraysReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe('initialised action', function () {

    it('should set the trays data', function () {
      const existingState = Immutable.Map({someId: {}})
      const action = {type: INITIALISED, data: Immutable.fromJS({trays: {trayId: {}}})}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('someId')
      expect(newState).to.have.property('trayId').that.is.instanceof(Immutable.Map)
    })

    it('should set the loaded property on added trays', function () {
      const existingState = Immutable.Map()
      const action = {type: INITIALISED, data: Immutable.fromJS({trays: {trayId: {}}})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })

    it('should handle no trays data', function () {
      const existingState = Immutable.Map()
      const action = {type: INITIALISED, data: Immutable.Map()}
      const newState = reduce(existingState, action)
      expect(newState).to.be.empty
    })
  })

  describe('imported data action', function () {

    it('should set the trays data', function () {
      const existingState = Immutable.Map({someId: {}})
      const action = {type: IMPORT_SUCCESS, data: Immutable.fromJS({trays: {trayId: {}}})}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('someId')
      expect(newState).to.have.property('trayId').that.is.instanceof(Immutable.Map)
    })

    it('should set the loaded property on added trays', function () {
      const existingState = Immutable.Map()
      const action = {type: IMPORT_SUCCESS, data: Immutable.fromJS({trays: {trayId: {}}})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })
  })

  describe('tray added action', function () {

    it('should set the tray data', function () {
      const existingState = Immutable.Map()
      const action = {type: TRAY_ADDED, trayId: 'trayId', data: Immutable.fromJS({foo: 'bar'})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('foo', 'bar')
    })
  })

  describe('highlight tray action', function () {

    it('should set the highlight flag to true', function () {
      const existingState = Immutable.fromJS({trayId: {highlight: false}})
      const action = {type: HIGHLIGHT_TRAY, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('highlight', true)
    })
  })

  describe('navigated action', function () {

    it('should set the highlight flag to false for all trays', function () {
      const existingState = Immutable.fromJS({trayId: {highlight: true}})
      const action = {type: NAVIGATED}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('highlight', false)
    })
  })

  describe('remove tray action', function () {

    it('should set the tray data', function () {
      const existingState = Immutable.Map({trayId: {}})
      const action = {type: REMOVE_TRAY, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('trayId')
    })
  })

  describe('encrypting password action', function () {

    it('should set as not loaded', function () {
      const existingState = Immutable.fromJS({trayId: {loaded: true}})
      const action = {type: ENCRYPTING_PASSWORD, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', false)
    })
  })

  describe('projects fetching action', function () {

    it('should set as not loaded', function () {
      const existingState = Immutable.fromJS({trayId: {loaded: true}})
      const action = {type: PROJECTS_FETCHING, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', false)
    })

    it('should remove any errors', function () {
      const existingState = Immutable.fromJS({trayId: {errors: 'some-error'}})
      const action = {type: PROJECTS_FETCHING, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.not.has.property('errors')
    })

    it('should set the pending request', function () {
      const existingState = Immutable.fromJS({trayId: {}})
      const action = {type: PROJECTS_FETCHING, trayId: 'trayId', request: 'some-request'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('pendingRequest', 'some-request')
    })
  })

  describe('password encrypted action', function () {

    it('should set the password', function () {
      const existingState = Immutable.fromJS({trayId: {}})
      const action = {type: PASSWORD_ENCRYPTED, trayId: 'trayId', password: 'some-password'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('password', 'some-password')
    })

    it('should set loaded', function () {
      const existingState = Immutable.fromJS({trayId: {loaded: false}})
      const action = {type: PASSWORD_ENCRYPTED, trayId: 'trayId', password: 'some-password'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })

    it('should remove any errors', function () {
      const existingState = Immutable.fromJS({trayId: {errors: ['some-error']}})
      const action = {type: PASSWORD_ENCRYPTED, trayId: 'trayId', password: 'some-password'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.not.has.property('errors')
    })

    it('should remove the request', function () {
      const existingState = Immutable.fromJS({trayId: {pendingRequest: 'some-request'}})
      const action = {type: PASSWORD_ENCRYPTED, trayId: 'trayId', errors: Immutable.List(['some-error'])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.not.has.property('pendingRequest')
    })
  })

  describe('projects fetched action', function () {

    it('should set loaded', function () {
      const existingState = Immutable.fromJS({trayId: {loaded: false}})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })

    it('should set timestamp', function () {
      const existingState = Immutable.fromJS({trayId: {}})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', timestamp: 'some-timestamp'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('timestamp', 'some-timestamp')
    })

    it('should set server type', function () {
      const existingState = Immutable.fromJS({trayId: {}})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId', serverType: 'some-type'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('serverType', 'some-type')
    })

    it('should remove any errors', function () {
      const existingState = Immutable.fromJS({trayId: {errors: ['some-error']}})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('errors')
    })

    it('should remove the request', function () {
      const existingState = Immutable.fromJS({trayId: {pendingRequest: 'some-request'}})
      const action = {type: PROJECTS_FETCHED, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('pendingRequest')
    })
  })

  describe('password encrypt error action', function () {

    it('should set loaded', function () {
      const existingState = Immutable.fromJS({trayId: {loaded: false}})
      const action = {type: PASSWORD_ENCRYPT_ERROR, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })

    it('should set errors', function () {
      const existingState = Immutable.fromJS({trayId: {}})
      const action = {type: PASSWORD_ENCRYPT_ERROR, trayId: 'trayId', errors: Immutable.List(['some-error'])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('errors').that.contains('some-error')
    })

    it('should remove the request', function () {
      const existingState = Immutable.fromJS({trayId: {pendingRequest: 'some-request'}})
      const action = {type: PASSWORD_ENCRYPT_ERROR, trayId: 'trayId', errors: Immutable.List(['some-error'])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.not.has.property('pendingRequest')
    })
  })

  describe('projects fetch error action', function () {

    it('should set loaded', function () {
      const existingState = Immutable.fromJS({trayId: {loaded: false}})
      const action = {type: PROJECTS_FETCH_ERROR, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('loaded', true)
    })

    it('should set errors', function () {
      const existingState = Immutable.fromJS({trayId: {}})
      const action = {type: PROJECTS_FETCH_ERROR, trayId: 'trayId', errors: Immutable.List(['some-error'])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('errors').that.contains('some-error')
    })

    it('should remove the request', function () {
      const existingState = Immutable.fromJS({trayId: {pendingRequest: 'some-request'}})
      const action = {type: PROJECTS_FETCH_ERROR, trayId: 'trayId', errors: Immutable.List(['some-error'])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.not.has.property('pendingRequest')
    })
  })

  describe('set name action', function () {

    it('should set the name', function () {
      const existingState = Immutable.fromJS({trayId: {name: 'some-name'}})
      const action = {type: SET_TRAY_NAME, trayId: 'trayId', name: 'some-new-name'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('name', 'some-new-name')
    })
  })

  describe('set server type', function () {

    it('should set the server type', function () {
      const existingState = Immutable.fromJS({trayId: {serverType: 'some-type'}})
      const action = {type: SET_SERVER_TYPE, trayId: 'trayId', serverType: 'some-new-type'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('serverType', 'some-new-type')
    })
  })

  describe('set username action', function () {

    it('should set the name', function () {
      const existingState = Immutable.fromJS({trayId: {username: 'some-username'}})
      const action = {type: SET_TRAY_USERNAME, trayId: 'trayId', username: 'some-new-username'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('username', 'some-new-username')
    })
  })

  describe('set tray url action', function () {

    it('should set the url', function () {
      const existingState = Immutable.fromJS({trayId: {trayId: 'trayId', url: 'some-url'}})
      const action = {type: SET_TRAY_URL, trayId: 'trayId', url: 'some-new-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('url', 'some-new-url')
    })
  })

  describe('set tray id action', function () {

    it('should update the key in the state to the new tray id', function () {
      const existingState = Immutable.fromJS({trayId: {trayId: 'trayId', url: 'some-url'}})
      const action = {type: SET_TRAY_ID, originalTrayId: 'trayId', newTrayId: 'some-new-url', url: 'some-new-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('some-new-url')
      expect(newState).to.not.have.property('trayId')
    })

    it('should set the tray id', function () {
      const existingState = Immutable.fromJS({trayId: {trayId: 'trayId', url: 'some-url'}})
      const action = {type: SET_TRAY_ID, originalTrayId: 'trayId', newTrayId: 'some-new-url', url: 'some-new-url'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('some-new-url').that.has.property('trayId', 'some-new-url')
    })
  })

})
