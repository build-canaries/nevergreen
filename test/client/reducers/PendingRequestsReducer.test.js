import {PENDING_REQUESTS_ROOT, reduce} from '../../../src/client/reducers/PendingRequestsReducer'
import {
  ENCRYPTING_PASSWORD,
  INTERESTING_PROJECTS,
  INTERESTING_PROJECTS_FETCHING,
  PASSWORD_ENCRYPT_ERROR,
  PASSWORD_ENCRYPTED,
  PROJECTS_FETCH_ERROR,
  PROJECTS_FETCHED,
  PROJECTS_FETCHING,
  REMOVE_TRAY
} from '../../../src/client/actions/Actions'
import {fromJS} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {INTERESTING_ROOT} from '../../../src/client/reducers/InterestingReducer'
import {getPendingRequest} from '../../../src/client/reducers/Selectors'
import {interestingProjects, interestingProjectsFetching} from '../../../src/client/actions/MonitorActionCreators'

describe('PendingRequestsReducer', () => {

  const reducer = combineReducers({
    [PENDING_REQUESTS_ROOT]: reduce
  })

  function state(existing) {
    return fromJS({[PENDING_REQUESTS_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state({foo: 'bar'})
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INTERESTING_PROJECTS_FETCHING, () => {

    test('should set the pending request', () => {
      const existingState = state({})
      const action = interestingProjectsFetching('some-pending-request')
      const newState = reducer(existingState, action)
      expect(getPendingRequest(newState, INTERESTING_ROOT)).toEqual('some-pending-request')
    })
  })

  describe(INTERESTING_PROJECTS, () => {

    test('should remove the pending request', () => {
      const existingState = state({[INTERESTING_ROOT]: 'some-pending-request'})
      const action = interestingProjects([], [])
      const newState = reducer(existingState, action)
      expect(getPendingRequest(newState, INTERESTING_ROOT)).toBeUndefined()
    })
  })

  const trayActionsThatStartRequests = [
    ENCRYPTING_PASSWORD,
    PROJECTS_FETCHING
  ]
  trayActionsThatStartRequests.forEach((actionType) => {

    describe(actionType, () => {

      test('should set the pending request', () => {

        const existingState = state({})
        const action = {type: actionType, trayId: 'trayId', request: 'some-pending-request'}
        const newState = reducer(existingState, action)
        expect(getPendingRequest(newState, 'trayId')).toEqual('some-pending-request')
      })
    })
  })

  const trayActionsThatRemoveRequests = [
    REMOVE_TRAY,
    PASSWORD_ENCRYPTED,
    PASSWORD_ENCRYPT_ERROR,
    PROJECTS_FETCHED,
    PROJECTS_FETCH_ERROR
  ]
  trayActionsThatRemoveRequests.forEach((actionType) => {

    describe(actionType, () => {

      test('should remove the pending request', () => {
        const existingState = state({trayId: 'some-pending-request'})
        const action = {type: actionType, trayId: 'trayId'}
        const newState = reducer(existingState, action)
        expect(getPendingRequest(newState, 'trayId')).toBeUndefined()
      })
    })
  })
})
