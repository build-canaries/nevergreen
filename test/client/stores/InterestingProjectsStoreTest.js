import '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'
import {AppInit} from '../../../src/client/NevergreenActions'
import {IMPORTED_DATA} from '../../../src/client/backup/BackupActions'
import {INTERESTING_PROJECTS, INTERESTING_PROJECTS_ERROR} from '../../../src/client/monitor/MonitorActions'

describe('interesting projects store', () => {

  let subject, AppDispatcher, callback

  before(() => {
    AppDispatcher = {
      register: sinon.spy()
    }
    subject = proxyquire('../../../src/client/stores/InterestingProjectsStore', {'../common/AppDispatcher': AppDispatcher})

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
      type: INTERESTING_PROJECTS,
      projects: []
    })
    expect(subject.getAll()).to.deep.equal([])
  })

  it('adds a project', () => {
    callback({
      type: INTERESTING_PROJECTS,
      projects: [{
        trayName: 'tray-name',
        projectId: 'some-id',
        name: 'name',
        stage: 'stage',
        prognosis: 'some-prognosis',
        lastBuildTime: 'some-last-build-time'
      }]
    })
    expect(subject.getAll()).to.deep.equal([{
      trayName: 'tray-name',
      projectId: 'some-id',
      name: 'name stage',
      prognosis: 'some-prognosis',
      lastBuildTime: 'some-last-build-time'
    }])
  })

  it('adds an error', () => {
    callback({
      type: INTERESTING_PROJECTS_ERROR,
      error: 'some-error'
    })
    expect(subject.getLastError()).to.equal('some-error')
  })

  it('clears the store state when new data is imported', () => {
    callback({
      type: IMPORTED_DATA
    })
    expect(subject.getAll()).to.deep.equal([])
  })

})
