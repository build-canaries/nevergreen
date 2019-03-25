import {reduce} from '../../../src/client/reducers/PendingRequestsReducer'
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
import {Map} from 'immutable'

describe('PendingRequestsReducer', () => {

  test('should return the state unmodified for an unknown action', () => {
    const existingState = Map({foo: 'bar'})
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INTERESTING_PROJECTS_FETCHING, () => {

    test('should set the pending request', () => {
      const existingState = Map()
      const action = {type: INTERESTING_PROJECTS_FETCHING, request: 'some-pending-request'}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).toHaveProperty('interesting', 'some-pending-request')
    })
  })

  describe(INTERESTING_PROJECTS, () => {

    test('should remove the pending request', () => {
      const existingState = Map({trayId: 'some-pending-request'})
      const action = {type: INTERESTING_PROJECTS}
      const newState = reduce(existingState, action)
      expect(newState.toJS()).not.toHaveProperty('interesting')
    })
  })

  const trayActionsThatStartRequests = [
    ENCRYPTING_PASSWORD,
    PROJECTS_FETCHING
  ]
  trayActionsThatStartRequests.forEach((actionType) => {

    describe(actionType, () => {

      test('should set the pending request', () => {

        const existingState = Map()
        const action = {type: actionType, trayId: 'trayId', request: 'some-pending-request'}
        const newState = reduce(existingState, action)
        expect(newState.toJS()).toHaveProperty('trayId', 'some-pending-request')
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
        const existingState = Map({trayId: 'some-pending-request'})
        const action = {type: actionType, trayId: 'trayId'}
        const newState = reduce(existingState, action)
        expect(newState.toJS()).not.toHaveProperty('trayId')
      })
    })
  })
})
