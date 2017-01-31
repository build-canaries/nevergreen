import {proxyquire} from '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import Immutable from 'immutable'

describe('MonitorActions', function () {
  let MonitorActions, ProjectsGateway

  before(function () {
    ProjectsGateway = {}
    MonitorActions = proxyquire('../../src/client/actions/MonitorActions', {
      '../common/gateways/ProjectsGateway': ProjectsGateway
    })
  })

  describe('interesting projects', function () {

    it('should return the correct type', function () {
      const actual = MonitorActions.interestingProjects([])
      expect(actual).to.have.property('type', MonitorActions.INTERESTING_PROJECTS)
    })

    it('should return the projects given', function () {
      const actual = MonitorActions.interestingProjects([{foo: 'bar', webUrl: ''}])
      expect(actual).to.have.property('data').that.includes.deep.property('[0].foo', 'bar')
    })
  })

  describe('interesting projects error', function () {

    it('should return the correct type', function () {
      const actual = MonitorActions.interestingProjectsError()
      expect(actual).to.have.property('type', MonitorActions.INTERESTING_PROJECTS_ERROR)
    })

    it('should return the error given', function () {
      const actual = MonitorActions.interestingProjectsError(['some-error'])
      expect(actual).to.have.property('errors').that.contains('some-error')
    })
  })

  describe('fetching interesting', function () {
    let dispatch

    beforeEach(function () {
      dispatch = sinon.spy()
    })

    it('should dispatch interesting projects action on success', function () {
      ProjectsGateway.interesting = sinon.stub().returns(Promise.resolve([]))
      return MonitorActions.fetchInteresting()(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: MonitorActions.INTERESTING_PROJECTS})
      })
    })

    it('should filter projects containing jobs', function () {
      const projectNoJob = {name: 'some-name'}
      const projectWithJob = {name: 'another-name', job: 'some-job'}
      ProjectsGateway.interesting = sinon.stub().returns(Promise.resolve([projectNoJob, projectWithJob]))
      return MonitorActions.fetchInteresting()(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({data: Immutable.fromJS([projectNoJob])})
      })
    })

    it('should dispatch interesting projects error action on failure', function () {
      ProjectsGateway.interesting = sinon.stub().returns(Promise.reject({}))
      return MonitorActions.fetchInteresting()(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: MonitorActions.INTERESTING_PROJECTS_ERROR})
      })
    })
  })
})
