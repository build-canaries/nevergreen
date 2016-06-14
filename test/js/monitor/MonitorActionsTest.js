import '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

describe('monitor actions', () => {

  let subject, AppDispatcher, ProjectsGateway

  before(() => {
    AppDispatcher = {}
    ProjectsGateway = {}
    subject = proxyquire('../../../src/js/monitor/MonitorActions', {
      '../common/AppDispatcher': AppDispatcher,
      '../common/gateways/ProjectsGateway': ProjectsGateway
    })
  })

  beforeEach(() => {
    AppDispatcher.dispatch = sinon.spy()
    ProjectsGateway.interesting = sinon.stub().returnsPromise()
  })

  it('calls the projects gateway', () => {
    subject.fetchInteresting('some-trays', 'some-selected-projects')

    expect(ProjectsGateway.interesting).to.have.been.calledWith('some-trays', 'some-selected-projects')
  })

  it('dispatches a interesting projects action', () => {
    ProjectsGateway.interesting.resolves('the-data')

    subject.fetchInteresting('irrelevant', 'irrelevant')

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: subject.InterestingProjects,
      projects: 'the-data'
    })
  })

  it('dispatches a interesting projects error action', () => {
    ProjectsGateway.interesting.rejects('the-error')

    subject.fetchInteresting('irrelevant', 'irrelevant')

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: subject.InterestingProjectsError,
      error: 'the-error'
    })
  })
})
