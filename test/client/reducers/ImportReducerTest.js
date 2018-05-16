import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/ImportReducer'
import {IMPORT_ERROR, IMPORT_SUCCESS, IMPORTING, NAVIGATED} from '../../../src/client/actions/Actions'
import Immutable from 'immutable'

describe('ImportReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe(IMPORTING, function () {

    it('should set the loaded property', function () {
      const existingState = Immutable.Map({loaded: true})
      const action = {type: IMPORTING}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('loaded', false)
    })

    it('should delete the infos property', function () {
      const existingState = Immutable.Map({infos: Immutable.Map()})
      const action = {type: IMPORTING}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('infos')
    })

    it('should delete the errors property', function () {
      const existingState = Immutable.Map({errors: Immutable.Map()})
      const action = {type: IMPORTING}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('errors')
    })
  })

  describe(IMPORT_SUCCESS, function () {

    it('should set the loaded property', function () {
      const existingState = Immutable.Map({loaded: false})
      const action = {type: IMPORT_SUCCESS, messages: Immutable.List()}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('loaded', true)
    })

    it('should set the infos property', function () {
      const existingState = Immutable.Map()
      const action = {type: IMPORT_SUCCESS, messages: Immutable.List(['some-message'])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('infos').that.contains('some-message')
    })

    it('should delete the errors property', function () {
      const existingState = Immutable.Map({errors: Immutable.Map()})
      const action = {type: IMPORT_SUCCESS}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('errors')
    })
  })

  describe(IMPORT_ERROR, function () {

    it('should set the loaded property', function () {
      const existingState = Immutable.Map({loaded: false})
      const action = {type: IMPORT_ERROR}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('loaded', true)
    })

    it('should delete the infos property', function () {
      const existingState = Immutable.Map({infos: Immutable.Map()})
      const action = {type: IMPORT_ERROR}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('infos')
    })

    it('should set the errors property', function () {
      const existingState = Immutable.Map()
      const action = {type: IMPORT_ERROR, errors: Immutable.List(['some-error'])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('errors').that.contains('some-error')
    })
  })

  describe(NAVIGATED, function () {

    it('should delete the infos property', function () {
      const existingState = Immutable.Map({infos: Immutable.Map()})
      const action = {type: NAVIGATED}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('infos')
    })

    it('should delete the errors property', function () {
      const existingState = Immutable.Map({errors: Immutable.Map()})
      const action = {type: NAVIGATED}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('errors')
    })
  })
})
