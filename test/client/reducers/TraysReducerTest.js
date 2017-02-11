import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/TraysReducer'
import {INITIALISED} from '../../../src/client/actions/NevergreenActions'
import {IMPORTED_DATA} from '../../../src/client/actions/BackupActions'
import {
  TRAY_ADDED,
  REMOVE_TRAY,
  ENCRYPTING_PASSWORD,
  PROJECTS_FETCHING,
  PASSWORD_ENCRYPTED,
  PROJECTS_FETCHED,
  PASSWORD_ENCRYPT_ERROR,
  PROJECTS_FETCH_ERROR,
  UPDATING_TRAY,
  HIGHLIGHT_TRAY,
  CLEAR_TRAY_HIGHLIGHT
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
      const action = {type: IMPORTED_DATA, data: Immutable.fromJS({trays: {trayId: {}}})}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('someId')
      expect(newState).to.have.property('trayId').that.is.instanceof(Immutable.Map)
    })

    it('should set the loaded property on added trays', function () {
      const existingState = Immutable.Map()
      const action = {type: IMPORTED_DATA, data: Immutable.fromJS({trays: {trayId: {}}})}
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

  describe('clear tray highlight action', function () {

    it('should set the highlight flag to false', function () {
      const existingState = Immutable.fromJS({trayId: {highlight: true}})
      const action = {type: CLEAR_TRAY_HIGHLIGHT, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('highlight', false)
    })

    it('should check the tray has not been removed (we clear on unmount which happens after the remove tray action)', function () {
      const existingState = Immutable.Map()
      const action = {type: CLEAR_TRAY_HIGHLIGHT, trayId: 'trayId'}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('trayId')
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

  describe('updating tray action', function () {

    it('should merge the tray data', function () {
      const existingState = Immutable.fromJS({trayId: {}})
      const action = {type: UPDATING_TRAY, trayId: 'trayId', data: Immutable.Map({foo: 'bar'})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('trayId').that.has.property('foo', 'bar')
    })
  })
})
