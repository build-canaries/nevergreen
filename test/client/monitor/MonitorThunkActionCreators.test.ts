import {buildApiProject, buildProject, buildState, buildTray, testThunk} from '../testHelpers'
import {Prognosis} from '../../../src/client/domain/Project'
import {INTERESTING_ROOT} from '../../../src/client/monitor/InterestingReducer'
import {TRAYS_ROOT} from '../../../src/client/tracking/TraysReducer'
import {PROJECTS_ROOT} from '../../../src/client/tracking/ProjectsReducer'
import {fetchInteresting} from '../../../src/client/monitor/MonitorThunkActionCreators'
import * as projectsGateway from '../../../src/client/gateways/ProjectsGateway'
import * as gateway from '../../../src/client/gateways/Gateway'
import {fakeRequest} from '../../../src/client/gateways/Gateway'
import * as monitorActionCreators from '../../../src/client/monitor/MonitorActionCreators'
import * as notificationThunkActionCreators from '../../../src/client/notification/NotificationThunkActionCreators'

describe('MonitorThunkActionCreators', () => {

  const NO_ERRORS: string[] = []

  describe('fetchInteresting', () => {

    test('should dispatch interesting projects fetching action', async () => {
      const request = fakeRequest('irrelevant')
      jest.spyOn(projectsGateway, 'interesting').mockReturnValue(request)
      jest.spyOn(gateway, 'send').mockResolvedValue([])
      jest.spyOn(monitorActionCreators, 'interestingProjectsFetching')

      await testThunk(fetchInteresting(), buildState())

      expect(monitorActionCreators.interestingProjectsFetching).toBeCalledWith(request)
    })

    test('should dispatch interesting projects action on success', async () => {
      jest.spyOn(gateway, 'send').mockResolvedValue([])
      jest.spyOn(monitorActionCreators, 'interestingProjects')

      await testThunk(fetchInteresting(), buildState())
      expect(monitorActionCreators.interestingProjects).toBeCalled()
    })

    /*
     * Jobs are exclusive to GoCD and are run in parallel when the owning stage runs. This means you get a project
     * for the stage plus another for each running job, and if anyone of them breaks the stage is also marked as
     * broken. This all makes sense but the Nevergreen team felt it created too much noise on the monitor and generally
     * just knowing a stage had broken was good enough.
     */
    test('should filter projects containing jobs', async () => {
      const projectNoJob = buildApiProject({
        projectId: 'some-name/some-stage',
        name: 'some-name',
        stage: 'some-stage',
        job: null
      })
      const projectWithJob = buildApiProject({
        projectId: 'some-name/some-stage/some-job',
        name: 'some-name',
        stage: 'some-stage',
        job: 'some-job'
      })
      jest.spyOn(gateway, 'send').mockResolvedValue([projectNoJob, projectWithJob])
      jest.spyOn(monitorActionCreators, 'interestingProjects')

      await testThunk(fetchInteresting(), buildState())
      expect(monitorActionCreators.interestingProjects).toHaveBeenCalledWith(
        [expect.objectContaining({
          projectId: 'some-name/some-stage'
        })],
        NO_ERRORS)
    })

    describe('setting the this build time so building timers work correctly', () => {

      test('should set to the fetched time for projects that are building and not previously fetched', async () => {
        const project = buildApiProject({
          projectId: 'some-id',
          prognosis: Prognosis.healthyBuilding,
          fetchedTime: 'some-time'
        })
        jest.spyOn(gateway, 'send').mockResolvedValue([project])
        jest.spyOn(monitorActionCreators, 'interestingProjects')

        await testThunk(fetchInteresting(), buildState())

        expect(monitorActionCreators.interestingProjects).toHaveBeenCalledWith(
          [expect.objectContaining({
            projectId: 'some-id',
            thisBuildTime: 'some-time'
          })], NO_ERRORS)
      })

      test('should unset if the project is not building', async () => {
        const project = buildApiProject({
          projectId: 'some-id',
          prognosis: Prognosis.sick,
          fetchedTime: 'some-time'
        })
        jest.spyOn(gateway, 'send').mockResolvedValue([project])
        jest.spyOn(monitorActionCreators, 'interestingProjects')

        await testThunk(fetchInteresting(), buildState())

        expect(monitorActionCreators.interestingProjects).toHaveBeenCalledWith([
          expect.not.objectContaining({
            thisBuildTime: ''
          })], NO_ERRORS)
      })

      test('should use the previous this build time if the project was previously fetched and building', async () => {
        const previousProject = buildProject({
          projectId: 'some-id',
          prognosis: Prognosis.healthyBuilding,
          thisBuildTime: 'previous-build-time'
        })
        const project = buildProject({
          projectId: 'some-id',
          prognosis: Prognosis.healthyBuilding,
          fetchedTime: 'some-time'
        })
        jest.spyOn(gateway, 'send').mockResolvedValue([project])
        jest.spyOn(monitorActionCreators, 'interestingProjects')
        const state = buildState({
          [INTERESTING_ROOT]: {
            projects: [previousProject]
          }
        })

        await testThunk(fetchInteresting(), state)

        expect(monitorActionCreators.interestingProjects).toHaveBeenCalledWith(
          [expect.objectContaining({
            projectId: 'some-id',
            thisBuildTime: 'previous-build-time'
          })], NO_ERRORS)
      })

      test('should use the fetched time if the project was previously fetched but was not building', async () => {
        const previousProject = buildProject({
          projectId: 'some-id',
          prognosis: Prognosis.sick,
          thisBuildTime: ''
        })
        const project = buildProject({
          projectId: 'some-id',
          prognosis: Prognosis.sickBuilding,
          fetchedTime: 'fetched-time'
        })
        jest.spyOn(gateway, 'send').mockResolvedValue([project])
        jest.spyOn(monitorActionCreators, 'interestingProjects')
        const state = buildState({
          [INTERESTING_ROOT]: {
            projects: [previousProject]
          }
        })

        await testThunk(fetchInteresting(), state)

        expect(monitorActionCreators.interestingProjects).toHaveBeenCalledWith(
          [expect.objectContaining({
            projectId: 'some-id',
            thisBuildTime: 'fetched-time'
          })], NO_ERRORS)
      })
    })

    test('should dispatch interesting projects action with a Nevergreen error if calling the service fails', async () => {
      jest.spyOn(gateway, 'send').mockRejectedValue(new Error('some-error'))
      jest.spyOn(monitorActionCreators, 'interestingProjects')
      await testThunk(fetchInteresting(), buildState())
      expect(monitorActionCreators.interestingProjects).toBeCalledWith([], ['some-error'])
    })

    describe('returned tray errors', () => {

      test('should dispatch interesting projects with the tray name in the error if it exists', async () => {
        jest.spyOn(gateway, 'send').mockImplementation(() => {
          throw new Error('Aborted')
        })
        jest.spyOn(monitorActionCreators, 'interestingProjects')
        const state = buildState({
          [TRAYS_ROOT]: {
            'some-tray-id': buildTray({trayId: 'some-tray-id', name: 'some-name'})
          },
          [PROJECTS_ROOT]: {
            'some-tray-id': {}
          }
        })

        await testThunk(fetchInteresting(), state)
        expect(monitorActionCreators.interestingProjects).toHaveBeenCalledWith([], [])
      })

      test('should dispatch interesting projects with the tray name in the error if it exists', async () => {
        jest.spyOn(gateway, 'send').mockResolvedValue([{
          trayId: 'some-tray-id',
          isError: true,
          errorMessage: 'some-error'
        }])
        jest.spyOn(monitorActionCreators, 'interestingProjects')
        const state = buildState({
          [TRAYS_ROOT]: {
            'some-tray-id': buildTray({trayId: 'some-tray-id', name: 'some-name'})
          },
          [PROJECTS_ROOT]: {
            'some-tray-id': {}
          }
        })

        await testThunk(fetchInteresting(), state)
        expect(monitorActionCreators.interestingProjects).toHaveBeenCalledWith([], ['some-name some-error'])
      })

      test('should dispatch interesting projects with the tray url in the error if the name does not exist', async () => {
        jest.spyOn(gateway, 'send').mockResolvedValue([{
          trayId: 'some-tray-id',
          isError: true,
          errorMessage: 'some-error'
        }])
        jest.spyOn(monitorActionCreators, 'interestingProjects')
        const state = buildState({
          [TRAYS_ROOT]: {
            'some-tray-id': buildTray({trayId: 'some-tray-id', url: 'some-url'})
          },
          [PROJECTS_ROOT]: {
            'some-tray-id': {}
          }
        })

        await testThunk(fetchInteresting(), state)
        expect(monitorActionCreators.interestingProjects).toHaveBeenCalledWith([], ['some-url some-error'])
      })
    })

    test('should dispatch project notifications on success', async () => {
      jest.spyOn(projectsGateway, 'interesting').mockReturnValue(fakeRequest(''))
      jest.spyOn(gateway, 'send').mockResolvedValue([])
      jest.spyOn(notificationThunkActionCreators, 'projectNotifications')
      const previousProjects = [buildProject()]
      const state = buildState({
        [INTERESTING_ROOT]: {
          projects: previousProjects
        }
      })

      await testThunk(fetchInteresting(), state)

      expect(notificationThunkActionCreators.projectNotifications).toBeCalledWith(previousProjects)
    })
  })
})
