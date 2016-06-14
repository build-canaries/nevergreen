import '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'
import {AppInit} from '../../../src/js/NevergreenActions'
import {RestoreConfiguration} from '../../../src/js/backup/BackupActions'
import {TrayAdd, ProjectsFetched} from '../../../src/js/tracking/TrackingActions'

describe('fetched projects store', () => {

  let subject, AppDispatcher, callback

  before(() => {
    AppDispatcher = {
      register: sinon.spy()
    }
    subject = proxyquire('../../../src/js/stores/FetchedProjectsStore', {'../common/AppDispatcher': AppDispatcher})

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

  it('returns undefined for unknown tray ids', () => {
    expect(subject.getAll('not-an-id')).to.be.undefined
  })

  it('creates an empty seq of fetched projects when a tray is added', () => {
    callback({
      type: TrayAdd,
      trayId: 'some-id'
    })
    expect(subject.getAll('some-id')).to.deep.equal([])
  })

  it('restores the state from configuration', () => {
    callback({
      type: RestoreConfiguration,
      configuration: {fetchedProjects: {someId: 'the-configuration'}}
    })
    expect(subject.getAll('someId')).to.equal('the-configuration')
  })

  describe('adding fetched projects', () => {

    beforeEach(() => {
      callback({
        type: TrayAdd,
        trayId: 'some-id'
      })
    })

    it('filters out jobs', () => {
      callback({
        type: ProjectsFetched,
        trayId: 'some-id',
        projects: [{
          projectId: 'some-project-id',
          name: 'name',
          stage: 'stage',
          job: null
        }, {
          projectId: 'another-project-id',
          name: 'something-else',
          stage: 'stage',
          job: 'job'
        }]
      })
      expect(subject.getAll('some-id')).to.deep.equal([{
        projectId: 'some-project-id',
        name: 'name stage',
        isNew: true,
        wasRemoved: false
      }])
    })

    describe('with previous projects added', () => {
      beforeEach(() => {
        callback({
          type: ProjectsFetched,
          trayId: 'some-id',
          projects: [{
            projectId: 'some-project-id',
            name: 'name',
            stage: 'stage',
            job: null
          }]
        })
      })

      it('removes the new flag if the same project is fetched again', () => {
        callback({
          type: ProjectsFetched,
          trayId: 'some-id',
          projects: [{
            projectId: 'some-project-id',
            name: 'name',
            stage: 'stage',
            job: null
          }]
        })
        expect(subject.getAll('some-id')).to.deep.equal([{
          projectId: 'some-project-id',
          name: 'name stage',
          isNew: false,
          wasRemoved: false
        }])
      })

      it('sets the removed flag if the project is not fetched again', () => {
        callback({
          type: ProjectsFetched,
          trayId: 'some-id',
          projects: []
        })
        expect(subject.getAll('some-id')).to.deep.equal([{
          projectId: 'some-project-id',
          name: 'name stage',
          isNew: false,
          wasRemoved: true
        }])
      })
    })
  })

  describe('validation', () => {
    it('returns an error message if the storage key does not exist', () => {
      const obj = {}
      expect(subject.validate(obj)).to.deep.equal(['The top level key fetchedProjects is missing!'])
    })

    it('returns an error message if the storage key is not an object', () => {
      const obj = {
        fetchedProjects: 'not-an-object'
      }
      expect(subject.validate(obj)).to.deep.equal(['The top level key fetchedProjects must be an object!'])
    })
  })

})
