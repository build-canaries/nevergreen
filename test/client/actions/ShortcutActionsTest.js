import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {keyboardShortcut, KEYBOARD_SHORTCUT} from '../../../src/client/actions/ShortcutActions'

describe('ShortcutActions', function () {

  describe('keyboard shortcut', function () {

    it('should return the correct type', function () {
      const actual = keyboardShortcut()
      expect(actual).to.have.property('type', KEYBOARD_SHORTCUT)
    })

    it('should return if they are shown', function () {
      const actual = keyboardShortcut(true)
      expect(actual).to.have.property('show', true)
    })
  })
})
