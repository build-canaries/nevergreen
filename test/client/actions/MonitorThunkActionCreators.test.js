import {testThunk, withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'
import {fromJS, List, Map} from 'immutable'
import {
  PROGNOSIS_HEALTHY_BUILDING,
  PROGNOSIS_SICK,
  PROGNOSIS_SICK_BUILDING,
  Project
} from '../../../src/client/domain/Project'
import {Tray} from '../../../src/client/domain/Tray'
import {INTERESTING_ROOT} from '../../../src/client/reducers/InterestingReducer'
import {SELECTED_ROOT} from '../../../src/client/reducers/SelectedReducer'
import {TRAYS_ROOT} from '../../../src/client/reducers/TraysReducer'

describe('MonitorThunkActionCreators', function () {

  const NO_ERRORS = List()

  const send = mocks.stub()
  const interesting = mocks.stub()
  const interestingProjectsFetching = mocks.spy()
  const interestingProjects = mocks.spy()
  const projectNotifications = mocks.spy()

  const requiredState = Map({
    [INTERESTING_ROOT]: Map({
      projects: List()
    }),
    [SELECTED_ROOT]: Map(),
    [TRAYS_ROOT]: Map()
  })

  const {fetchInteresting} = withMockedImports('client/actions/MonitorThunkActionCreators', {
    '../gateways/ProjectsGateway': {interesting},
    '../gateways/NevergreenGateway': {send},
    './MonitorActionCreators': {interestingProjects, interestingProjectsFetching},
    './NotificationThunkActionCreators': {projectNotifications}
  })

  describe('fetchInteresting', function () {

    it('should dispatch interesting projects fetching action', async function () {
      interesting.returns('some-request')
      send.resolves(List())

      await testThunk(fetchInteresting(), requiredState)

      expect(interestingProjectsFetching).to.have.been.calledWith('some-request')
    })

    it('should dispatch interesting projects action on success', async function () {
      send.resolves(List())

      await testThunk(fetchInteresting(), requiredState)
      expect(interestingProjects).to.have.been.called()
    })

    /*
     * Jobs are exclusive to GoCD and are run in parallel when the owning stage runs. This means you get a project
     * for the stage plus another for each running job, and if anyone of them breaks the stage is also marked as
     * broken. This all makes sense but the Nevergreen team felt it created too much noise on the monitor and generally
     * just knowing a stage had broken was good enough.
     */
    it('should filter projects containing jobs', async function () {
      const projectNoJob = {
        projectId: 'some-name/some-stage',
        name: 'some-name',
        stage: 'some-stage',
        job: null
      }
      const projectWithJob = {
        projectId: 'some-name/some-stage/some-job',
        name: 'some-name',
        stage: 'some-stage',
        job: 'some-job'
      }
      const expectedProject = new Project(projectNoJob)
      send.resolves(fromJS([projectNoJob, projectWithJob]))

      await testThunk(fetchInteresting(), requiredState)
      expect(interestingProjects.getCall(0).args[0]).to.equal(List.of(expectedProject))
      expect(interestingProjects.getCall(0).args[1]).to.equal(NO_ERRORS)
    })

    describe('setting the this build time so building timers work correctly', function () {

      it('should set to the fetched time for projects that are building and not previously fetched', async function () {
        const project = {
          prognosis: PROGNOSIS_HEALTHY_BUILDING,
          fetchedTime: 'some-time'
        }
        send.resolves(fromJS([project]))

        await testThunk(fetchInteresting(), requiredState)

        expect(interestingProjects.getCall(0).args[0]).to.equal(List.of(
          new Project({...project, thisBuildTime: 'some-time'})
        ))
        expect(interestingProjects.getCall(0).args[1]).to.equal(NO_ERRORS)
      })

      it('should unset if the project is not building', async function () {
        const project = {
          prognosis: PROGNOSIS_SICK,
          fetchedTime: 'some-time'
        }
        send.resolves(fromJS([project]))

        await testThunk(fetchInteresting(), requiredState)

        expect(interestingProjects.getCall(0).args[0]).to.equal(List.of(
          new Project({...project, thisBuildTime: null})
        ))
        expect(interestingProjects.getCall(0).args[1]).to.equal(NO_ERRORS)
      })

      it('should use the previous this build time if the project was previously fetched and building', async function () {
        const previousProject = new Project({
          projectId: 'some-id',
          prognosis: PROGNOSIS_HEALTHY_BUILDING,
          thisBuildTime: 'previous-build-time'
        })
        const project = {
          projectId: 'some-id',
          prognosis: PROGNOSIS_HEALTHY_BUILDING,
          fetchedTime: 'some-time'
        }
        send.resolves(fromJS([project]))
        const state = requiredState.setIn([INTERESTING_ROOT, 'projects'], List.of(previousProject))

        await testThunk(fetchInteresting(), state)

        expect(interestingProjects.getCall(0).args[0]).to.equal(List.of(
          new Project({...project, thisBuildTime: 'previous-build-time'})
        ))
        expect(interestingProjects.getCall(0).args[1]).to.equal(NO_ERRORS)
      })

      it('should use the fetched time if the project was previously fetched but was not building', async function () {
        const previousProject = new Project({
          projectId: 'some-id',
          prognosis: PROGNOSIS_SICK,
          thisBuildTime: null
        })
        const project = {
          projectId: 'some-id',
          prognosis: PROGNOSIS_SICK_BUILDING,
          fetchedTime: 'fetched-time'
        }
        send.resolves(fromJS([project]))
        const state = requiredState.setIn([INTERESTING_ROOT, 'projects'], List.of(previousProject))

        await testThunk(fetchInteresting(), state)

        expect(interestingProjects.getCall(0).args[0]).to.equal(List.of(
          new Project({...project, thisBuildTime: 'fetched-time'})
        ))
        expect(interestingProjects.getCall(0).args[1]).to.equal(NO_ERRORS)
      })
    })

    it('should dispatch interesting projects action with a Nevergreen error if calling the service fails', async function () {
      send.rejects(new Error('some-error'))
      await testThunk(fetchInteresting(), requiredState)
      expect(interestingProjects).to.have.been.calledWith(List(), List.of('some-error'))
    })

    describe('returned tray errors', function () {

      it('should dispatch interesting projects with the tray name in the error if it exists', async function () {
        send.resolves(fromJS([{trayId: 'some-tray-id', isError: true, errorMessage: 'some-error'}]))
        const trays = List([new Tray({trayId: 'some-tray-id', name: 'some-name'})])
        const state = requiredState.set(TRAYS_ROOT, trays)

        await testThunk(fetchInteresting(), state)
        expect(interestingProjects.getCall(0).args[0]).to.equal(List())
        expect(interestingProjects.getCall(0).args[1]).to.equal(List.of('some-name some-error'))
      })

      it('should dispatch interesting projects with the tray url in the error if the name does not exist', async function () {
        send.resolves(fromJS([{trayId: 'some-tray-id', isError: true, errorMessage: 'some-error'}]))
        const trays = fromJS([new Tray({trayId: 'some-tray-id', url: 'some-url'})])
        const state = requiredState.set(TRAYS_ROOT, trays)

        await testThunk(fetchInteresting(), state)
        expect(interestingProjects.getCall(0).args[0]).to.equal(List())
        expect(interestingProjects.getCall(0).args[1]).to.equal(List.of('some-url some-error'))
      })
    })

    it('should dispatch project notifications on success', async function () {
      interesting.returns('some-request')
      send.resolves(List())
      const previousProjects = List.of(new Project())
      const state = requiredState.setIn([INTERESTING_ROOT, 'projects'], previousProjects)

      await testThunk(fetchInteresting(), state)

      expect(projectNotifications).to.have.been.calledWith(previousProjects)
    })
  })
})
