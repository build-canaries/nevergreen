import {
  getPendingRequest,
  PENDING_REQUESTS_ROOT,
  PendingRequestsState,
  reduce
} from '../../src/client/PendingRequestsReducer'
import {Actions} from '../../src/client/Actions'
import {buildState, testReducer} from './testHelpers'
import {RecursivePartial} from '../../src/client/common/Types'
import {fakeRequest} from '../../src/client/gateways/Gateway'

describe('PendingRequestsReducer', () => {

  const reducer = testReducer({
    [PENDING_REQUESTS_ROOT]: reduce
  })

  function state(existing?: RecursivePartial<PendingRequestsState>) {
    return buildState({[PENDING_REQUESTS_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state()
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  const trayActionsThatStartRequests = [
    Actions.ENCRYPTING_PASSWORD,
    Actions.PROJECTS_FETCHING
  ]
  trayActionsThatStartRequests.forEach((actionType) => {

    describe(actionType, () => {

      test('should set the pending request', () => {
        const abort = jest.fn()
        const existingState = state({})
        const action = {type: actionType, trayId: 'trayId', request: {abort}}
        const newState = reducer(existingState, action)
        expect(getPendingRequest(newState, 'trayId')).toBeDefined()
      })
    })
  })

  const trayActionsThatRemoveRequests = [
    Actions.REMOVE_TRAY,
    Actions.PASSWORD_ENCRYPTED,
    Actions.PASSWORD_ENCRYPT_ERROR,
    Actions.PROJECTS_FETCHED,
    Actions.PROJECTS_FETCH_ERROR
  ]
  trayActionsThatRemoveRequests.forEach((actionType) => {

    describe(actionType, () => {

      test('should remove the pending request', () => {
        const existingState = state({trayId: fakeRequest('irrelevant')})
        const action = {type: actionType, trayId: 'trayId'}
        const newState = reducer(existingState, action)
        expect(getPendingRequest(newState, 'trayId')).toBeUndefined()
      })
    })
  })
})
