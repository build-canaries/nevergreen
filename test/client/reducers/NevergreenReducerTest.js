import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/NevergreenReducer'
import {INITIALISING, INITIALISED} from '../../../src/client/actions/NevergreenActions'
import Immutable from 'immutable'

describe('NevergreenReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe('initialising action', function () {

    it('should set the loaded property', function () {
      const existingState = Immutable.Map({loaded: true})
      const action = {type: INITIALISING}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('loaded', false)
    })
  })

  describe('initialised action', function () {

    it('should set the loaded property', function () {
      const existingState = Immutable.Map({loaded: false})
      const action = {type: INITIALISED, data: Immutable.Map()}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('loaded', true)
    })

    it('should merge the nevergreen data', function () {
      const existingState = Immutable.Map()
      const action = {type: INITIALISED, data: Immutable.Map({nevergreen: {foo: 'bar'}})}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('foo', 'bar')
    })
  })
})
