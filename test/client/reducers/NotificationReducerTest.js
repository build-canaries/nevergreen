import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/NotificationReducer'
import {NOTIFICATION, NOTIFICATION_DISMISS} from '../../../src/client/actions/Actions'

describe('NotificationReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe(NOTIFICATION, function () {

    it('should set the state', function () {
      const existingState = null
      const action = {type: NOTIFICATION, message: 'some-message'}
      const newState = reduce(existingState, action)
      expect(newState).to.equal('some-message')
    })
  })

  describe(NOTIFICATION_DISMISS, function () {

    it('should remove the state', function () {
      const existingState = 'some-message'
      const action = {type: NOTIFICATION_DISMISS}
      const newState = reduce(existingState, action)
      expect(newState).to.be.null()
    })
  })
})
