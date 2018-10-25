import {describe, it} from 'mocha'
import {expect} from 'chai'
import {addMessage, removeMessage} from '../../../src/client/actions/SuccessActionCreators'
import {MESSAGE_ADDED, MESSAGE_REMOVED, NOOP} from '../../../src/client/actions/Actions'

describe('SuccessActionCreators', function () {

  describe(MESSAGE_ADDED, function () {

    it('should return the correct type', function () {
      const actual = addMessage('irrelevant')
      expect(actual).to.have.property('type', MESSAGE_ADDED)
    })

    it('should return the text message to add', function () {
      const actual = addMessage('some-message')
      expect(actual).to.have.property('message', 'some-message')
    })

    it('should replace spaces with non-breaking spaces in emoticons so they don\'t get wrapped on the monitor page', function () {
      const actual = addMessage('(*＾3＾) /～♡')
      expect(actual).to.have.property('message', '(*＾3＾)\xa0/～♡')
    })

    it('should not replace spaces in sentences so they do get wrapped on the monitor page', function () {
      const actual = addMessage('nevergreen is awesome')
      expect(actual).to.have.property('message', 'nevergreen is awesome')
    })

    it('should return a no op action if message is blank', function () {
      const actual = addMessage('')
      expect(actual).to.have.property('type', NOOP)
    })
  })

  describe(MESSAGE_REMOVED, function () {

    it('should return the correct type', function () {
      const actual = removeMessage('irrelevant')
      expect(actual).to.have.property('type', MESSAGE_REMOVED)
    })

    it('should return the text message to add', function () {
      const actual = removeMessage('some-message')
      expect(actual).to.have.property('message', 'some-message')
    })
  })
})
