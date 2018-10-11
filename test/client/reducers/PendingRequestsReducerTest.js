import {describe, it} from 'mocha'
import {expect} from 'chai'
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

describe('PendingRequestsReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = Map({foo: 'bar'})
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe(INTERESTING_PROJECTS_FETCHING, function () {

    it('should set the pending request', function () {
      const existingState = Map()
      const action = {type: INTERESTING_PROJECTS_FETCHING, request: 'some-pending-request'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('interesting', 'some-pending-request')
    })
  })

  describe(INTERESTING_PROJECTS, function () {

    it('should remove the pending request', function () {
      const existingState = Map({trayId: 'some-pending-request'})
      const action = {type: INTERESTING_PROJECTS}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('interesting')
    })
  })

  const trayActionsThatStartRequests = [
    ENCRYPTING_PASSWORD,
    PROJECTS_FETCHING
  ]
  trayActionsThatStartRequests.forEach((actionType) => {

    describe(actionType, function () {

      it('should set the pending request', function () {

        const existingState = Map()
        const action = {type: actionType, trayId: 'trayId', request: 'some-pending-request'}
        const newState = reduce(existingState, action)
        expect(newState).to.have.property('trayId', 'some-pending-request')
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

    describe(actionType, function () {

      it('should remove the pending request', function () {
        const existingState = Map({trayId: 'some-pending-request'})
        const action = {type: actionType, trayId: 'trayId'}
        const newState = reduce(existingState, action)
        expect(newState).to.not.have.property('trayId')
      })
    })
  })
})
