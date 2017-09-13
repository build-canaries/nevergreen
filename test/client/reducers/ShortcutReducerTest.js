import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {reduce} from '../../../src/client/reducers/ShortcutReducer'
import {KEYBOARD_SHORTCUT} from '../../../src/client/actions/ShortcutActions'

describe('ShortcutReducer', function () {

  it('should return the state unmodified for an unknown action', function () {
    const existingState = {foo: 'bar'}
    const newState = reduce(existingState, {type: 'not-a-real-action'})
    expect(newState).to.deep.equal(existingState)
  })

  describe('keyboard shortcut action', function () {

    it('should set the state', function () {
      const existingState = true
      const action = {type: KEYBOARD_SHORTCUT, show: false}
      const newState = reduce(existingState, action)
      expect(newState).to.be.false()
    })
  })
})
