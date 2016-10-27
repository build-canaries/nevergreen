import '../UnitSpec'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {
  imageAdded,
  removeImage,
  textAdded,
  removeText,
  messageInvalid,
  removeMessage,
  addMessage,
  IMAGE_ADDED,
  IMAGE_REMOVED,
  TEXT_ADDED,
  TEXT_REMOVED,
  MESSAGE_INVALID
} from '../../../src/client/actions/SuccessActions'

describe('SuccessActions', function () {

  describe('image added', function () {

    it('should return the correct type', function () {
      const actual = imageAdded()
      expect(actual).to.have.property('type', IMAGE_ADDED)
    })

    it('should return the image url to add', function () {
      const actual = imageAdded('some-image-url')
      expect(actual).to.have.property('url', 'some-image-url')
    })
  })

  describe('remove image', function () {

    it('should return the correct type', function () {
      const actual = removeImage()
      expect(actual).to.have.property('type', IMAGE_REMOVED)
    })

    it('should return the image url being removed', function () {
      const actual = removeImage('some-image-url')
      expect(actual).to.have.property('url', 'some-image-url')
    })
  })

  describe('text added', function () {

    it('should return the correct type', function () {
      const actual = textAdded('irrelevant')
      expect(actual).to.have.property('type', TEXT_ADDED)
    })

    it('should return the text message to add', function () {
      const actual = textAdded('some-message')
      expect(actual).to.have.property('message', 'some-message')
    })

    it('should replace spaces with non-breaking spaces in emoticons so they don\'t get wrapped on the monitor page', function () {
      const actual = textAdded('(*＾3＾) /～♡')
      expect(actual).to.have.property('message', '(*＾3＾)\xa0/～♡')
    })

    it('should not replace spaces in sentences so they do get wrapped on the monitor page', function () {
      const actual = textAdded('nevergreen is awesome')
      expect(actual).to.have.property('message', 'nevergreen is awesome')
    })
  })

  describe('remove text', function () {

    it('should return the correct type', function () {
      const actual = removeText('irrelevant')
      expect(actual).to.have.property('type', TEXT_REMOVED)
    })

    it('should return the text message to add', function () {
      const actual = removeText('some-message')
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

  describe('remove message', function () {

    it('should call remove image if the message is url-like', function () {
      const actual = removeMessage('http')
      expect(actual).to.have.property('type', IMAGE_REMOVED)
    })

    it('should call remove text if the message is not url-like', function () {
      const actual = removeMessage('not-url-like')
      expect(actual).to.have.property('type', TEXT_REMOVED)
    })
  })

  describe('add message', function () {

    it('should call add image if the message is url-like', function () {
      const actual = addMessage('http')
      expect(actual).to.have.property('type', IMAGE_ADDED)
    })

    it('should call add text if the message is not url-like', function () {
      const actual = addMessage('not-url-like')
      expect(actual).to.have.property('type', TEXT_ADDED)
    })

    it('should call message invalid if message is blank', function () {
      const actual = addMessage('')
      expect(actual).to.have.property('type', MESSAGE_INVALID)
    })
  })
})
