import {testThunk, withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'
import {PROGNOSIS_HEALTHY_BUILDING, PROGNOSIS_SICK, PROGNOSIS_SICK_BUILDING} from '../../../src/client/domain/Project'

describe('MonitorThunkActionCreators', function () {

  const NO_ERRORS = []

  const send = mocks.stub()
  const interesting = mocks.stub()
  const interestingProjects = mocks.spy()

  const {fetchInteresting} = withMockedImports('client/actions/MonitorThunkActionCreators', {
    '../common/gateways/ProjectsGateway': {interesting},
    '../common/gateways/NevergreenGateway': {send},
    './MonitorActionCreators': {interestingProjects}
  })

  describe('fetchInteresting', function () {

    it('should dispatch interesting projects action on success', function () {
      send.resolves([])

      return testThunk(fetchInteresting([], [], [])).then(() => {
        expect(interestingProjects).to.have.been.called()
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
      send.resolves([projectNoJob, projectWithJob])

      return testThunk(fetchInteresting([], [], [])).then(() => {
        expect(interestingProjects).to.have.been.calledWithMatch([projectNoJob], NO_ERRORS)
      })
    })

    describe('setting the this build time so building timers work correctly', function () {

      it('should set to the fetched time for projects that are building and not previously fetched', function () {
        const project = {
          prognosis: PROGNOSIS_HEALTHY_BUILDING,
          fetchedTime: 'some-time'
        }
        send.resolves([project])

        return testThunk(fetchInteresting([], [], [])).then(() => {
          expect(interestingProjects).to.have.been.calledWithMatch([{
            ...project,
            thisBuildTime: 'some-time'
          }], NO_ERRORS)
        })
      })

      it('should unset if the project is not building', function () {
        const project = {
          prognosis: PROGNOSIS_SICK,
          fetchedTime: 'some-time'
        }
        send.resolves([project])

        return testThunk(fetchInteresting([], [], [])).then(() => {
          expect(interestingProjects).to.have.been.calledWithMatch([{
            ...project,
            thisBuildTime: null
          }], NO_ERRORS)
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
        send.resolves([project])

        return testThunk(fetchInteresting([], [], [previousProject])).then(() => {
          expect(interestingProjects).to.have.been.calledWithMatch([{
            ...project,
            thisBuildTime: 'previous-build-time'
          }], NO_ERRORS)
        })
      })

      it('should use the fetched time if the project was previously fetched but was not building', function () {
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
        send.resolves([project])

        return testThunk(fetchInteresting([], [], [previousProject])).then(() => {
          expect(interestingProjects).to.have.been.calledWithMatch([{
            ...project,
            thisBuildTime: 'some-time'
          }], NO_ERRORS)
        })
      })
    })

    it('should dispatch interesting projects action with a Nevergreen error if calling the service fails', function () {
      send.rejects({message: 'some-error'})

      return testThunk(fetchInteresting([], [], [])).then(() => {
        expect(interestingProjects).to.have.been.calledWithMatch([], ['some-error'])
      })
    })

    describe('returned tray errors', function () {

      it('should dispatch interesting projects with the tray name in the error if it exists', function () {
        send.resolves([{trayId: 'some-tray-id', isError: true, errorMessage: 'some-error'}])
        const trays = [{trayId: 'some-tray-id', name: 'some-name'}]

        return testThunk(fetchInteresting(trays, [], [])).then(() => {
          expect(interestingProjects).to.have.been.calledWithMatch([], ['some-name some-error'])
        })
      })

      it('should dispatch interesting projects with the tray url in the error if the name does not exist', function () {
        send.resolves([{trayId: 'some-tray-id', isError: true, errorMessage: 'some-error'}])
        const trays = [{trayId: 'some-tray-id', url: 'some-url'}]

        return testThunk(fetchInteresting(trays, [], [])).then(() => {
          expect(interestingProjects).to.have.been.calledWithMatch([], ['some-url some-error'])
        })
      })
    })
  })
})
