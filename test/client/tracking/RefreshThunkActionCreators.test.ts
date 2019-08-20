import {buildProject, buildState, buildTray, testThunk} from '../testHelpers'
import {TRAYS_ROOT} from '../../../src/client/tracking/TraysReducer'
import {PENDING_REQUESTS_ROOT} from '../../../src/client/PendingRequestsReducer'
import {PROJECTS_ROOT} from '../../../src/client/tracking/ProjectsReducer'
import {refreshTray} from '../../../src/client/tracking/RefreshThunkActionCreators'
import * as projectsGateway from '../../../src/client/gateways/ProjectsGateway'
import * as gateway from '../../../src/client/gateways/Gateway'
import * as trackingActionCreators from '../../../src/client/tracking/TrackingActionCreators'
import * as nevergreenThunkActionCreators from '../../../src/client/NevergreenThunkActionCreators'
import {SuperAgentRequest} from 'superagent'

describe('RefreshThunkActionCreators', () => {

  describe('refreshTray', () => {

    const tray = buildTray({
      trayId: 'some-tray-id',
      includeNew: true
    })

    const abort = jest.fn()

    const project = buildProject({projectId: 'some-project-id'})

    const requiredState = buildState({
      [TRAYS_ROOT]: {
        'some-tray-id': tray
      },
      [PENDING_REQUESTS_ROOT]: {
        'some-tray-id': abort
      },
      [PROJECTS_ROOT]: {
        'some-tray-id': {
          'some-project-id': project
        }
      }
    })

    test('should abort pending request', async () => {
      jest.spyOn(gateway, 'send').mockResolvedValue([])
      jest.spyOn(nevergreenThunkActionCreators, 'abortPendingRequest')
      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(nevergreenThunkActionCreators.abortPendingRequest).toBeCalledWith('some-tray-id')
    })

    test('should create a fetch all request with the tray', async () => {
      jest.spyOn(gateway, 'send').mockResolvedValue([])
      jest.spyOn(projectsGateway, 'fetchAll')
      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(projectsGateway.fetchAll).toBeCalledWith([tray], [project])
    })

    test('should dispatch projects fetching action', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const request = {} as any as SuperAgentRequest
      jest.spyOn(gateway, 'send').mockResolvedValue([])
      jest.spyOn(projectsGateway, 'fetchAll').mockReturnValue(request)
      jest.spyOn(trackingActionCreators, 'projectsFetching')

      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(trackingActionCreators.projectsFetching).toBeCalledWith('some-tray-id', request)
    })

    test('should dispatch projects fetched action when no errors are returned', async () => {
      jest.spyOn(gateway, 'send').mockResolvedValue([])
      jest.spyOn(trackingActionCreators, 'projectsFetched')
      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(trackingActionCreators.projectsFetched).toBeCalledWith('some-tray-id', [], true)
    })

    test('should dispatch projects fetch error action if an error is returned', async () => {
      jest.spyOn(gateway, 'send').mockResolvedValue([{isError: true, errorMessage: 'some-error'}])
      jest.spyOn(trackingActionCreators, 'projectsFetchError')
      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(trackingActionCreators.projectsFetchError).toBeCalledWith('some-tray-id', ['some-error'])
    })

    test('should dispatch projects fetch error action if the request fails', async () => {
      jest.spyOn(gateway, 'send').mockRejectedValue(new Error('some-error'))
      jest.spyOn(trackingActionCreators, 'projectsFetchError')
      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(trackingActionCreators.projectsFetchError).toBeCalledWith('some-tray-id', ['some-error'])
    })
  })
})
