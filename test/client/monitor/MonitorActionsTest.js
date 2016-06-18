import '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

describe('monitor actions', () => {

  let MonitorActions, AppDispatcher, ProjectsGateway

  before(() => {
    AppDispatcher = {}
    ProjectsGateway = {}
    MonitorActions = proxyquire('../../../src/client/monitor/MonitorActions', {
      '../common/AppDispatcher': AppDispatcher,
      '../common/gateways/ProjectsGateway': ProjectsGateway
    })
  })

  beforeEach(() => {
    AppDispatcher.dispatch = sinon.spy()
    ProjectsGateway.interesting = sinon.stub().returnsPromise()
  })

  describe('interesting projects', () => {
    it('should return the correct type', () => {
      const actual = MonitorActions.interestingProjects('irrelevant')
      expect(actual).to.have.property('type', MonitorActions.INTERESTING_PROJECTS)
    })

    it('should return the projects', () => {
      const actual = MonitorActions.interestingProjects('the-projects')
      expect(actual).to.have.property('projects', 'the-projects')
    })
  })

  describe('interesting projects error', () => {
    it('should return the correct type', () => {
      const actual = MonitorActions.interestingProjectsError('irrelevant')
      expect(actual).to.have.property('type', MonitorActions.INTERESTING_PROJECTS_ERROR)
    })

    it('should return the error', () => {
      const actual = MonitorActions.interestingProjectsError('the-error')
      expect(actual).to.have.property('error', 'the-error')
    })
  })

  describe('fetch interesting', () => {
    it('calls the projects gateway', () => {
      MonitorActions.fetchInteresting('some-trays', 'some-selected-projects')

      expect(ProjectsGateway.interesting).to.have.been.calledWith('some-trays', 'some-selected-projects')
    })

    it('dispatches a interesting projects action', () => {
      ProjectsGateway.interesting.resolves('the-data')

      MonitorActions.fetchInteresting('irrelevant', 'irrelevant')

      expect(AppDispatcher.dispatch).to.have.been.calledWithMatch({
        type: MonitorActions.INTERESTING_PROJECTS
      })
    })

    it('dispatches a interesting projects error action', () => {
      ProjectsGateway.interesting.rejects('the-error')

      MonitorActions.fetchInteresting('irrelevant', 'irrelevant')

      expect(AppDispatcher.dispatch).to.have.been.calledWithMatch({
        type: MonitorActions.INTERESTING_PROJECTS_ERROR
      })
    })
  })
})
