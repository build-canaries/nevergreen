import {proxyquire} from '../TestUtils'
import {before, beforeEach, describe, it} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import Immutable from 'immutable'
import {INTERESTING_PROJECTS} from '../../../src/client/actions/Actions'

describe('MonitorActionCreators', function () {
  let MonitorActions, ProjectsGateway, Gateway

  before(function () {
    ProjectsGateway = {}
    Gateway = {}
    MonitorActions = proxyquire('../../src/client/actions/MonitorActionCreators', {
      '../common/gateways/ProjectsGateway': ProjectsGateway,
      '../common/gateways/Gateway': Gateway
    })
  })

  describe('interesting projects', function () {

    it('should return the correct type', function () {
      const actual = MonitorActions.interestingProjects([])
      expect(actual).to.have.property('type', INTERESTING_PROJECTS)
    })

    it('should return the projects given', function () {
      const actual = MonitorActions.interestingProjects([{foo: 'bar', webUrl: ''}])
      expect(actual).to.have.property('projects').that.includes.deep.property('[0].foo', 'bar')
    })
  })

  describe('fetching interesting', function () {
    let dispatch

    beforeEach(function () {
      dispatch = sinon.spy()
    })

    it('should dispatch interesting projects action on success', function () {
      ProjectsGateway.interesting = sinon.stub().returns({})
      Gateway.send = sinon.stub().returns(Promise.resolve([]))
      return MonitorActions.fetchInteresting()(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: INTERESTING_PROJECTS})
      })
    })

    it('should filter projects containing jobs', function () {
      const projectNoJob = {name: 'some-name'}
      const projectWithJob = {name: 'another-name', job: 'some-job'}
      ProjectsGateway.interesting = sinon.stub().returns({})
      Gateway.send = sinon.stub().returns(Promise.resolve([projectNoJob, projectWithJob]))
      return MonitorActions.fetchInteresting()(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({projects: Immutable.fromJS([projectNoJob])})
      })
    })

    it('should dispatch interesting projects error action on failure', function () {
      ProjectsGateway.interesting = sinon.stub().returns({})
      Gateway.send = sinon.stub().returns(Promise.reject({}))
      return MonitorActions.fetchInteresting()(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: INTERESTING_PROJECTS})
      })
    })
  })
})
