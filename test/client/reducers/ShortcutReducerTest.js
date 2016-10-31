import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/ShortcutReducer'
import {INITIALISING} from '../../../src/client/actions/NevergreenActions'
import {KEYBOARD_SHORTCUT} from '../../../src/client/actions/ShortcutActions'
import Immutable from 'immutable'

describe('ShortcutReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe('initialising action', function () {

    it('should set the shortcuts shown property', function () {
      const existingState = Immutable.Map({show: true})
      const action = {type: INITIALISING}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('show', false)
    })
  })

  describe('keyboard shortcut action', function () {

    it('should set the shortcuts shown property', function () {
      const existingState = Immutable.Map({show: true})
      const action = {type: KEYBOARD_SHORTCUT, show: false}
      const newState = reduce(existingState, action)
      expect(newState).to.have.property('show', false)
    })
  })
})
