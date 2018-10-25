import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/SuccessReducer'
import {IMPORT_SUCCESS, INITIALISED, MESSAGE_ADDED, MESSAGE_REMOVED} from '../../../src/client/actions/Actions'
import {fromJS, Map, OrderedSet} from 'immutable'

describe('SuccessReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe(INITIALISED, function () {

    it('should set the success data', function () {
      const existingState = OrderedSet(['old-message'])
      const action = {type: INITIALISED, data: fromJS({success: ['some-message']})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain('some-message')
    })

    it('should handle no success data', function () {
      const existingState = OrderedSet()
      const action = {type: INITIALISED, data: Map()}
      const newState = reduce(existingState, action)
      expect(newState).to.be.empty()
    })
  })

  describe(IMPORT_SUCCESS, function () {

    it('should merge the success data', function () {
      const existingState = OrderedSet()
      const action = {type: IMPORT_SUCCESS, data: fromJS({success: ['some-message']})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain('some-message')
    })
  })

  describe(MESSAGE_ADDED, function () {

    it('should add the given message', function () {
      const existingState = OrderedSet()
      const action = {type: MESSAGE_ADDED, message: 'some-message'}
      const newState = reduce(existingState, action)
      expect(newState).to.contain('some-message')
    })

    it('should not add the same message multiple times', function () {
      const existingState = OrderedSet(['some-message'])
      const action = {type: MESSAGE_ADDED, message: 'some-message'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.size(1)
    })
  })

  describe(MESSAGE_REMOVED, function () {

    it('should remove the given message', function () {
      const existingState = OrderedSet(['a', 'b', 'c'])
      const action = {type: MESSAGE_REMOVED, message: 'b'}
      const newState = reduce(existingState, action)
      expect(newState).to.deep.equal(OrderedSet(['a', 'c']))
    })
  })
})
