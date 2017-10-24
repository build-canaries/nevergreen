import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/SuccessReducer'
import {IMPORT_SUCCESS, INITIALISED, MESSAGE_ADDED, MESSAGE_REMOVED} from '../../../src/client/actions/Actions'
import Immutable from 'immutable'

describe('SuccessReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe('initialised action', function () {

    it('should set the success data', function () {
      const existingState = Immutable.OrderedSet(['old-message'])
      const action = {type: INITIALISED, data: Immutable.fromJS({success: ['some-message']})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain('some-message')
    })

    it('should handle no success data', function () {
      const existingState = Immutable.OrderedSet()
      const action = {type: INITIALISED, data: Immutable.Map()}
      const newState = reduce(existingState, action)
      expect(newState).to.be.empty()
    })
  })

  describe('imported data action', function () {

    it('should merge the success data', function () {
      const existingState = Immutable.OrderedSet()
      const action = {type: IMPORT_SUCCESS, data: Immutable.fromJS({success: ['some-message']})}
      const newState = reduce(existingState, action)
      expect(newState).to.contain('some-message')
    })
  })

  describe('message added action', function () {

    it('should add the given message', function () {
      const existingState = Immutable.OrderedSet()
      const action = {type: MESSAGE_ADDED, message: 'some-message'}
      const newState = reduce(existingState, action)
      expect(newState).to.contain('some-message')
    })

    it('should not add the same message multiple times', function () {
      const existingState = Immutable.OrderedSet(['some-message'])
      const action = {type: MESSAGE_ADDED, message: 'some-message'}
      const newState = reduce(existingState, action)
      expect(newState).to.have.size(1)
    })
  })

  describe('message removed action', function () {

    it('should remove the given message', function () {
      const existingState = Immutable.OrderedSet(['a', 'b', 'c'])
      const action = {type: MESSAGE_REMOVED, message: 'b'}
      const newState = reduce(existingState, action)
      expect(newState).to.deep.equal(Immutable.OrderedSet(['a', 'c']))
    })
  })
})
