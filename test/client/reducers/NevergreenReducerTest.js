import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/NevergreenReducer'
import {FULL_SCREEN, INITIALISED, INITIALISING, REQUEST_FULL_SCREEN} from '../../../src/client/actions/Actions'
import Immutable from 'immutable'

describe('NevergreenReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe(INITIALISING, function () {

    it('should set the loaded property', function () {
      const existingState = Immutable.Map({loaded: true})
      const action = {type: INITIALISING}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('loaded', false)
    })
  })

  describe(INITIALISED, function () {

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

  describe(FULL_SCREEN, function () {

    it('should set the full screen property', function () {
      const existingState = Immutable.Map({fullScreen: false})
      const action = {type: FULL_SCREEN, enabled: true}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('fullScreen', true)
    })
  })

  describe(REQUEST_FULL_SCREEN, function () {

    it('should set the full screen requested property', function () {
      const existingState = Immutable.Map({fullScreenRequested: false})
      const action = {type: REQUEST_FULL_SCREEN, requested: true}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('fullScreenRequested', true)
    })
  })
})
