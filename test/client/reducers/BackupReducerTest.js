import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/BackupReducer'
import {IMPORTING_DATA, IMPORTED_DATA, IMPORT_ERROR} from '../../../src/client/actions/BackupActions'
import Immutable from 'immutable'

describe('BackupReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  it('should set loaded to false when importing data action', function () {
    const existingState = Immutable.Map({loaded: true})
    const newState = reduce(existingState, {type: IMPORTING_DATA})
    expect(newState).to.have.property('loaded', false)
  })

  describe('imported data action', function () {

    it('should set the infos property', function () {
      const existingState = Immutable.Map()
      const action = {type: IMPORTED_DATA, messages: Immutable.List(['some-message'])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('infos').that.contains('some-message')
    })

    it('should set the loaded property', function () {
      const existingState = Immutable.Map({loaded: false})
      const action = {type: IMPORTED_DATA}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('loaded', true)
    })

    it('should delete the errors property', function () {
      const existingState = Immutable.Map({errors: Immutable.Map()})
      const action = {type: IMPORTED_DATA}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('errors')
    })
  })

  describe('import error action', function () {

    it('should delete the infos property', function () {
      const existingState = Immutable.Map({infos: Immutable.Map()})
      const action = {type: IMPORT_ERROR}
      const newState = reduce(existingState, action)
      expect(newState).to.not.have.property('infos')
    })

    it('should set the loaded property', function () {
      const existingState = Immutable.Map({loaded: false})
      const action = {type: IMPORT_ERROR}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('loaded', true)
    })

    it('should set the errors property', function () {
      const existingState = Immutable.Map()
      const action = {type: IMPORT_ERROR, errors: Immutable.List(['some-error'])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('errors').that.contains('some-error')
    })
  })
})
