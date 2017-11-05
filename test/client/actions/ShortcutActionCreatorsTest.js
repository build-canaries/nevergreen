import {describe, it} from 'mocha'
import {expect} from 'chai'
import {keyboardShortcut} from '../../../src/client/actions/ShortcutActionCreators'
import {KEYBOARD_SHORTCUT} from '../../../src/client/actions/Actions'

describe('ShortcutActionCreators', function () {

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
