import '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'
import {AppInit} from '../../../src/js/NevergreenActions'
import {RESTORE_CONFIGURATION} from '../../../src/js/backup/BackupActions'
import {InterestingProjects, InterestingProjectsError} from '../../../src/js/monitor/MonitorActions'

describe('interesting projects store', () => {

  let subject, AppDispatcher, callback

  before(() => {
    AppDispatcher = {
      register: sinon.spy()
    }
    subject = proxyquire('../../../src/js/stores/InterestingProjectsStore', {'../common/AppDispatcher': AppDispatcher})

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

  it('adds empty projects', () => {
    callback({
      type: InterestingProjects,
      projects: []
    })
    expect(subject.getAll()).to.deep.equal([])
  })

  it('adds a project', () => {
    callback({
      type: InterestingProjects,
      projects: [{
        projectId: 'some-id',
        name: 'name',
        stage: 'stage',
        prognosis: 'some-prognosis',
        lastBuildTime: 'some-last-build-time'
      }]
    })
    expect(subject.getAll()).to.deep.equal([{
      projectId: 'some-id',
      name: 'name stage',
      prognosis: 'some-prognosis',
      lastBuildTime: 'some-last-build-time'
    }])
  })

  it('adds an error', () => {
    callback({
      type: InterestingProjectsError,
      error: 'some-error'
    })
    expect(subject.getLastError()).to.equal('some-error')
  })

  it('clears the store state when new data is imported', () => {
    callback({
      type: RESTORE_CONFIGURATION
    })
    expect(subject.getAll()).to.deep.equal([])
  })

})
