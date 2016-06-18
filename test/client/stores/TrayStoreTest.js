import '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'
import {AppInit} from '../../../src/client/NevergreenActions'
import {IMPORTING_DATA} from '../../../src/client/backup/BackupActions'
import {
  TrayAdd,
  TrayUpdate,
  TrayRemove,
  ProjectsFetched,
  ProjectsFetching,
  ProjectsFetchError
} from '../../../src/client/tracking/TrackingActions'

describe('tray store', () => {

  let subject, AppDispatcher, callback, NameGenerator

  before(() => {
    AppDispatcher = {
      register: sinon.spy()
    }
    NameGenerator = {}
    subject = proxyquire('../../../src/client/stores/TrayStore', {
      '../common/AppDispatcher': AppDispatcher,
      'project-name-generator': () => NameGenerator
    })

    callback = AppDispatcher.register.getCall(0).args[0]
  })

  beforeEach(() => {
    AppDispatcher.dispatch = sinon.spy()

    callback({
      type: AppInit,
      configuration: {}
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register).to.have.been.called
  })

  it('adds a tray', () => {
    NameGenerator.spaced = 'some generated name'
    
    callback({
      type: TrayAdd,
      trayId: 'some-id',
      url: 'some-url',
      username: 'some-username'
    })
    
    expect(subject.getById('some-id')).to.deep.equal({
      trayId: 'some-id',
      name: 'Some Generated Name',
      url: 'some-url',
      username: 'some-username'
    })
  })

  describe('once a tray is added', () => {
    beforeEach(() => {
      callback({
        type: TrayAdd,
        trayId: 'some-id',
        url: 'some-url',
        username: 'some-username'
      })
    })

    it('updates a tray', () => {
      callback({
        type: TrayUpdate,
        trayId: 'some-id',
        name: 'some-name',
        url: 'another-url',
        username: 'another-username'
      })
      expect(subject.getById('some-id')).to.deep.equal({
        trayId: 'some-id',
        name: 'some-name',
        url: 'another-url',
        username: 'another-username'
      })
    })

    it('removes a tray', () => {
      callback({
        type: TrayRemove,
        trayId: 'some-id'
      })
      expect(subject.getById('some-id')).to.be.undefined
    })

    it('sets the fetching flag to true while fetching', () => {
      callback({
        type: ProjectsFetching,
        trayId: 'some-id'
      })
      expect(subject.getById('some-id').fetching).to.be.true
    })

    it('clears the error object while fetching', () => {
      callback({
        type: ProjectsFetching,
        trayId: 'some-id'
      })
      expect(subject.getById('some-id').error).to.be.null
    })

    it('sets the fetching flag to false when fetched', () => {
      callback({
        type: ProjectsFetched,
        trayId: 'some-id'
      })
      expect(subject.getById('some-id').fetching).to.be.false
    })

    it('clears the error object once fetched', () => {
      callback({
        type: ProjectsFetched,
        trayId: 'some-id'
      })
      expect(subject.getById('some-id').error).to.be.null
    })

    it('sets the error object on api error', () => {
      callback({
        type: ProjectsFetchError,
        trayId: 'some-id',
        error: 'some-error'
      })
      expect(subject.getById('some-id').error).to.equal('some-error')
    })

    it('sets the fetching flag to false on error', () => {
      callback({
        type: ProjectsFetchError,
        trayId: 'some-id'
      })
      expect(subject.getById('some-id').fetching).to.be.false
    })
  })

  it('clears the store state when new data is imported', () => {
    callback({
      type: IMPORTING_DATA
    })
    expect(subject.getAll()).to.deep.equal([])
  })

  describe('validation', () => {
    it('returns an error message if the storage key does not exist', () => {
      const obj = {}
      expect(subject.validate(obj)).to.deep.equal(['The top level key tray is missing!'])
    })

    it('returns an error message if the trays key does not exist', () => {
      const obj = {
        success: {}
      }
      expect(subject.validate(obj)).to.deep.equal(['The top level key tray is missing!'])
    })

    it('returns an error message if the trays key is not an object', () => {
      const obj = {
        success: {
          trays: 'not-an-object'
        }
      }
      expect(subject.validate(obj)).to.deep.equal(['The top level key tray is missing!'])
    })
  })

})
