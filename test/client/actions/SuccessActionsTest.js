import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {
  messageAdded,
  messageInvalid,
  removeMessage,
  addMessage
} from '../../../src/client/actions/SuccessActions'
import {MESSAGE_ADDED, MESSAGE_INVALID, MESSAGE_REMOVED} from '../../../src/client/actions/Actions'

describe('SuccessActions', function () {

  describe('text added', function () {

    it('should return the correct type', function () {
      const actual = messageAdded('irrelevant')
      expect(actual).to.have.property('type', MESSAGE_ADDED)
    })

    it('should return the text message to add', function () {
      const actual = messageAdded('some-message')
      expect(actual).to.have.property('message', 'some-message')
    })

    it('should replace spaces with non-breaking spaces in emoticons so they don\'t get wrapped on the monitor page', function () {
      const actual = messageAdded('(*＾3＾) /～♡')
      expect(actual).to.have.property('message', '(*＾3＾)\xa0/～♡')
    })

    it('should not replace spaces in sentences so they do get wrapped on the monitor page', function () {
      const actual = messageAdded('nevergreen is awesome')
      expect(actual).to.have.property('message', 'nevergreen is awesome')
    })
  })

  describe('remove message', function () {

    it('should return the correct type', function () {
      const actual = removeMessage('irrelevant')
      expect(actual).to.have.property('type', MESSAGE_REMOVED)
    })

    it('should return the text message to add', function () {
      const actual = removeMessage('some-message')
      expect(actual).to.have.property('message', 'some-message')
    })
  })

  describe('message invalid', function () {

    it('should return the correct type', function () {
      const actual = messageInvalid()
      expect(actual).to.have.property('type', MESSAGE_INVALID)
    })

    it('should return the message', function () {
      const actual = messageInvalid('some-message')
      expect(actual).to.have.property('message', 'some-message')
    })

    it('should return the errors', function () {
      const actual = messageInvalid('some-message', ['some-error'])
      expect(actual).to.have.property('errors').that.contains('some-error')
    })
  })

  describe('add message', function () {

    it('should call add message if the message is valid', function () {
      const actual = addMessage('not-url-like')
      expect(actual).to.have.property('type', MESSAGE_ADDED)
    })

    it('should call message invalid if message is blank', function () {
      const actual = addMessage('')
      expect(actual).to.have.property('type', MESSAGE_INVALID)
    })
  })
})
