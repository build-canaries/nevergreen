import {testThunk} from '../testHelpers'
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
import {PROJECTS_ROOT} from '../../../src/client/reducers/ProjectsReducer'
import {fetchInteresting} from '../../../src/client/actions/MonitorThunkActionCreators'
import * as projectsGateway from '../../../src/client/gateways/ProjectsGateway'
import * as gateway from '../../../src/client/gateways/Gateway'
import * as monitorActionCreators from '../../../src/client/actions/MonitorActionCreators'
import * as notificationThunkActionCreators from '../../../src/client/actions/NotificationThunkActionCreators'

describe('MonitorThunkActionCreators', () => {

  const NO_ERRORS = List()

  gateway.send = jest.fn()
  projectsGateway.interesting = jest.fn()
  monitorActionCreators.interestingProjectsFetching = jest.fn()
  monitorActionCreators.interestingProjects = jest.fn()
  notificationThunkActionCreators.projectNotifications = jest.fn()

  const requiredState = Map({
    [INTERESTING_ROOT]: Map({
      projects: List()
    }),
    [SELECTED_ROOT]: Map(),
    [TRAYS_ROOT]: Map(),
    [PROJECTS_ROOT]: Map()
  })

  describe('fetchInteresting', () => {

    test('should dispatch interesting projects fetching action', async () => {
      projectsGateway.interesting.mockReturnValue('some-request')
      gateway.send.mockResolvedValue(List())

      await testThunk(fetchInteresting(), requiredState)

      expect(monitorActionCreators.interestingProjectsFetching).toBeCalledWith('some-request')
    })

    test('should dispatch interesting projects action on success', async () => {
      gateway.send.mockResolvedValue(List())

      await testThunk(fetchInteresting(), requiredState)
      expect(monitorActionCreators.interestingProjects).toBeCalled()
    })

    /*
     * Jobs are exclusive to GoCD and are run in parallel when the owning stage runs. This means you get a project
     * for the stage plus another for each running job, and if anyone of them breaks the stage is also marked as
     * broken. This all makes sense but the Nevergreen team felt it created too much noise on the monitor and generally
     * just knowing a stage had broken was good enough.
     */
    test('should filter projects containing jobs', async () => {
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
      gateway.send.mockResolvedValue(fromJS([projectNoJob, projectWithJob]))

      await testThunk(fetchInteresting(), requiredState)
      expect(monitorActionCreators.interestingProjects.mock.calls[0][0]).toEqual(List.of(expectedProject))
      expect(monitorActionCreators.interestingProjects.mock.calls[0][1]).toEqual(NO_ERRORS)
    })

    describe('setting the this build time so building timers work correctly', () => {

      test('should set to the fetched time for projects that are building and not previously fetched', async () => {
        const project = {
          prognosis: PROGNOSIS_HEALTHY_BUILDING,
          fetchedTime: 'some-time'
        }
        gateway.send.mockResolvedValue(fromJS([project]))

        await testThunk(fetchInteresting(), requiredState)

        expect(monitorActionCreators.interestingProjects.mock.calls[0][0]).toEqual(List.of(
          new Project({...project, thisBuildTime: 'some-time'})
        ))
        expect(monitorActionCreators.interestingProjects.mock.calls[0][1]).toEqual(NO_ERRORS)
      })

      test('should unset if the project is not building', async () => {
        const project = {
          prognosis: PROGNOSIS_SICK,
          fetchedTime: 'some-time'
        }
        gateway.send.mockResolvedValue(fromJS([project]))

        await testThunk(fetchInteresting(), requiredState)

        expect(monitorActionCreators.interestingProjects.mock.calls[0][0]).toEqual(List.of(
          new Project({...project, thisBuildTime: ''})
        ))
        expect(monitorActionCreators.interestingProjects.mock.calls[0][1]).toEqual(NO_ERRORS)
      })

      test('should use the previous this build time if the project was previously fetched and building', async () => {
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
        gateway.send.mockResolvedValue(fromJS([project]))
        const state = requiredState.setIn([INTERESTING_ROOT, 'projects'], List.of(previousProject))

        await testThunk(fetchInteresting(), state)

        expect(monitorActionCreators.interestingProjects.mock.calls[0][0]).toEqual(List.of(
          new Project({...project, thisBuildTime: 'previous-build-time'})
        ))
        expect(monitorActionCreators.interestingProjects.mock.calls[0][1]).toEqual(NO_ERRORS)
      })

      test('should use the fetched time if the project was previously fetched but was not building', async () => {
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
        gateway.send.mockResolvedValue(fromJS([project]))
        const state = requiredState.setIn([INTERESTING_ROOT, 'projects'], List.of(previousProject))

        await testThunk(fetchInteresting(), state)

        expect(monitorActionCreators.interestingProjects.mock.calls[0][0]).toEqual(List.of(
          new Project({...project, thisBuildTime: 'fetched-time'})
        ))
        expect(monitorActionCreators.interestingProjects.mock.calls[0][1]).toEqual(NO_ERRORS)
      })
    })

    test('should dispatch interesting projects action with a Nevergreen error if calling the service fails', async () => {
      gateway.send.mockRejectedValue(new Error('some-error'))
      await testThunk(fetchInteresting(), requiredState)
      expect(monitorActionCreators.interestingProjects).toBeCalledWith(List(), List.of('some-error'))
    })

    describe('returned tray errors', () => {

      test('should dispatch interesting projects with the tray name in the error if it exists', async () => {
        gateway.send.mockResolvedValue(fromJS([{
          trayId: 'some-tray-id',
          isError: true,
          errorMessage: 'some-error'
        }]))
        const trays = List([new Tray({trayId: 'some-tray-id', name: 'some-name'})])
        const state = requiredState
          .set(TRAYS_ROOT, trays)
          .set(PROJECTS_ROOT, fromJS({
            'some-tray-id': []
          }))

        await testThunk(fetchInteresting(), state)
        expect(monitorActionCreators.interestingProjects.mock.calls[0][0]).toEqual(List())
        expect(monitorActionCreators.interestingProjects.mock.calls[0][1]).toEqual(List.of('some-name some-error'))
      })

      test('should dispatch interesting projects with the tray url in the error if the name does not exist', async () => {
        gateway.send.mockResolvedValue(fromJS([{
          trayId: 'some-tray-id',
          isError: true,
          errorMessage: 'some-error'
        }]))
        const trays = fromJS([new Tray({trayId: 'some-tray-id', url: 'some-url'})])
        const state = requiredState
          .set(TRAYS_ROOT, trays)
          .set(PROJECTS_ROOT, fromJS({
            'some-tray-id': []
          }))

        await testThunk(fetchInteresting(), state)
        expect(monitorActionCreators.interestingProjects.mock.calls[0][0]).toEqual(List())
        expect(monitorActionCreators.interestingProjects.mock.calls[0][1]).toEqual(List.of('some-url some-error'))
      })
    })

    test('should dispatch project notifications on success', async () => {
      projectsGateway.interesting.mockReturnValue('some-request')
      gateway.send.mockResolvedValue(List())
      const previousProjects = List.of(new Project())
      const state = requiredState.setIn([INTERESTING_ROOT, 'projects'], previousProjects)

      await testThunk(fetchInteresting(), state)

      expect(notificationThunkActionCreators.projectNotifications).toBeCalledWith(previousProjects)
    })
  })
})
