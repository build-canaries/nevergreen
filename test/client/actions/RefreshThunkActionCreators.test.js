import {testThunk} from '../testHelpers'
import {fromJS, List} from 'immutable'
import {Tray} from '../../../src/client/domain/Tray'
import {Project} from '../../../src/client/domain/Project'
import {TRAYS_ROOT} from '../../../src/client/reducers/TraysReducer'
import {PENDING_REQUESTS_ROOT} from '../../../src/client/reducers/PendingRequestsReducer'
import {PROJECTS_ROOT} from '../../../src/client/reducers/ProjectsReducer'
import {refreshTray} from '../../../src/client/actions/RefreshThunkActionCreators'
import * as projectsGateway from '../../../src/client/gateways/ProjectsGateway'
import * as gateway from '../../../src/client/gateways/Gateway'
import * as nevergreenGateway from '../../../src/client/gateways/NevergreenGateway'
import * as trackingActionCreators from '../../../src/client/actions/TrackingActionCreators'

describe('RefreshThunkActionCreators', () => {

  nevergreenGateway.send = jest.fn()
  gateway.abortPendingRequest = jest.fn()
  projectsGateway.fetchAll = jest.fn()
  trackingActionCreators.projectsFetching = jest.fn()
  trackingActionCreators.projectsFetched = jest.fn()
  trackingActionCreators.projectsFetchError = jest.fn()

  describe('refreshTray', () => {

    const tray = new Tray({
      trayId: 'some-tray-id',
      includeNew: true
    })

    const requiredState = fromJS({
      [TRAYS_ROOT]: {
        'some-tray-id': tray
      },
      [PENDING_REQUESTS_ROOT]: {
        'some-tray-id': 'some-pending-request'
      },
      [PROJECTS_ROOT]: {
        'some-tray-id': [
          new Project({projectId: 'some-project-id'})
        ]
      }
    })

    test('should abort pending request', async () => {
      nevergreenGateway.send.mockResolvedValue(List())
      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(gateway.abortPendingRequest).toBeCalledWith('some-pending-request')
    })

    test('should create a fetch all request with the tray', async () => {
      nevergreenGateway.send.mockResolvedValue(List())
      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(projectsGateway.fetchAll.mock.calls[0][0]).toEqual(List.of(tray))
      expect(projectsGateway.fetchAll.mock.calls[0][1]).toEqual(fromJS({'some-tray-id': ['some-project-id']}))
    })

    test('should dispatch projects fetching action', async () => {
      nevergreenGateway.send.mockResolvedValue(List())
      projectsGateway.fetchAll.mockReturnValue('some-fetch-all-request')

      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(trackingActionCreators.projectsFetching).toBeCalledWith('some-tray-id', 'some-fetch-all-request')
    })

    test('should dispatch projects fetched action when no errors are returned', async () => {
      nevergreenGateway.send.mockResolvedValue(List())
      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(trackingActionCreators.projectsFetched).toBeCalledWith('some-tray-id', List(), true)
    })

    test('should dispatch projects fetch error action if an error is returned', async () => {
      nevergreenGateway.send.mockResolvedValue(fromJS([{isError: true, errorMessage: 'some-error'}]))
      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(trackingActionCreators.projectsFetchError.mock.calls[0][0]).toEqual('some-tray-id')
      expect(trackingActionCreators.projectsFetchError.mock.calls[0][1]).toEqual(List.of('some-error'))
    })

    test('should dispatch projects fetch error action if the request fails', async () => {
      nevergreenGateway.send.mockRejectedValue(new Error('some-error'))
      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(trackingActionCreators.projectsFetchError).toBeCalledWith('some-tray-id', List.of('some-error'))
    })
  })
})
