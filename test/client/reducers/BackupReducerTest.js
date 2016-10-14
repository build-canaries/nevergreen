import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/BackupReducer'
import {IMPORTED_DATA, IMPORT_ERROR} from '../../../src/client/actions/BackupActions'
import Immutable from 'immutable'

describe('BackupReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe('imported data action', function () {

    it('should set the infos property', function () {
      const existingState = Immutable.Map()
      const action = {type: IMPORTED_DATA, messages: Immutable.List(['some-message'])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('infos').that.contains('some-message')
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

    it('should set the errors property', function () {
      const existingState = Immutable.Map()
      const action = {type: IMPORT_ERROR, errors: Immutable.List(['some-error'])}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('errors').that.contains('some-error')
    })
  })
})
