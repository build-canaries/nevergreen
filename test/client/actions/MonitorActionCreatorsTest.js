import {withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {sandbox} from '../Sandbox'
import Immutable from 'immutable'
import {INTERESTING_PROJECTS} from '../../../src/client/actions/Actions'
import {PROGNOSIS_HEALTHY_BUILDING, PROGNOSIS_SICK, PROGNOSIS_SICK_BUILDING} from '../../../src/client/domain/Project'

describe('MonitorActionCreators', function () {

  const ProjectsGateway = {}
  const Gateway = {}
  const MonitorActions = withMockedImports('client/actions/MonitorActionCreators', {
    '../common/gateways/ProjectsGateway': ProjectsGateway,
    '../common/gateways/Gateway': Gateway
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
    const dispatch = sandbox.spy()

    it('should dispatch interesting projects action on success', function () {
      fetchInterestingReturns()

      return MonitorActions.fetchInteresting([], [], [])(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: INTERESTING_PROJECTS})
      })
    })

    /*
     * Jobs are exclusive to GoCD and are run in parallel when the owning stage runs. This means you get a project
     * for the stage plus another for each running job, and if anyone of them breaks the stage is also marked as
     * broken. This all makes sense but the Nevergreen team felt it created too much noise on the monitor and generally
     * just knowing a stage had broken was good enough.
     */
    it('should filter projects containing jobs', function () {
      const projectNoJob = {name: 'some-name'}
      const projectWithJob = {name: 'another-name', job: 'some-job'}
      fetchInterestingReturns(projectNoJob, projectWithJob)

      return MonitorActions.fetchInteresting([], [], [])(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({projects: Immutable.fromJS([projectNoJob])})
      })
    })

    it('should set the this build time to the fetched time for projects that are building and not previously fetched', function () {
      const project = {
        prognosis: PROGNOSIS_HEALTHY_BUILDING,
        fetchedTime: 'some-time'
      }
      fetchInterestingReturns(project)

      return MonitorActions.fetchInteresting([], [], [])(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({
          projects: Immutable.fromJS([{
            ...project,
            thisBuildTime: 'some-time'
          }])
        })
      })
    })

    it('should unset the this build time if the project is not building', function () {
      const project = {
        prognosis: PROGNOSIS_SICK,
        fetchedTime: 'some-time'
      }
      fetchInterestingReturns(project)

      return MonitorActions.fetchInteresting([], [], [])(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({
          projects: Immutable.fromJS([{
            ...project,
            thisBuildTime: null
          }])
        })
      })
    })

    it('should use the previous this build time if the project was previously fetched and building', function () {
      const previousProject = {
        projectId: 'some-id',
        prognosis: PROGNOSIS_HEALTHY_BUILDING,
        thisBuildTime: 'previous-build-time'
      }
      const project = {
        projectId: 'some-id',
        prognosis: PROGNOSIS_HEALTHY_BUILDING,
        fetchedTime: 'some-time'
      }
      fetchInterestingReturns(project)

      return MonitorActions.fetchInteresting([], [], [previousProject])(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({
          projects: Immutable.fromJS([{
            ...project,
            thisBuildTime: 'previous-build-time'
          }])
        })
      })
    })

    it('should use the fetched time as the this build time if the project was previously fetched but was not building', function () {
      const previousProject = {
        projectId: 'some-id',
        prognosis: PROGNOSIS_SICK,
        thisBuildTime: null
      }
      const project = {
        projectId: 'some-id',
        prognosis: PROGNOSIS_SICK_BUILDING,
        fetchedTime: 'some-time'
      }
      fetchInterestingReturns(project)

      return MonitorActions.fetchInteresting([], [], [previousProject])(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({
          projects: Immutable.fromJS([{
            ...project,
            thisBuildTime: 'some-time'
          }])
        })
      })
    })

    it('should dispatch interesting projects action on failure', function () {
      ProjectsGateway.interesting = sandbox.stub().returns({})
      Gateway.send = sandbox.stub().returns(Promise.reject({message: 'some-error'}))

      return MonitorActions.fetchInteresting([], [], [])(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({
          type: INTERESTING_PROJECTS,
          errors: Immutable.List(['Nevergreen some-error'])
        })
      })
    })
  })

  function fetchInterestingReturns(...projects) {
    ProjectsGateway.interesting = sandbox.stub().returns({})
    Gateway.send = sandbox.stub().returns(Promise.resolve(projects))
  }
})
