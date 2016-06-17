import '../UnitSpec'
import {describe, it, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import {
  messageInvalid,
  messageAdd,
  addMessage,
  removeMessage,
  MESSAGE_INVALID_INPUT,
  MESSAGE_ADD,
  MESSAGE_REMOVE
} from '../../../src/js/success/SuccessActions'

describe('success actions', () => {

  describe('message invalid', () => {
    it('should return the correct type', () => {
      const actual = messageInvalid('irrelevant', 'irrelevant')
      expect(actual).to.have.property('type', MESSAGE_INVALID_INPUT)
    })

    it('should return the errors', () => {
      const actual = messageInvalid('the-errors', 'irrelevant')
      expect(actual).to.have.property('errors', 'the-errors')
    })

    it('should return the message', () => {
      const actual = messageInvalid('irrelevant', 'the-message')
      expect(actual).to.have.property('message', 'the-message')
    })
  })

  describe('message add', () => {
    it('should return the correct type', () => {
      const actual = messageAdd('irrelevant')
      expect(actual).to.have.property('type', MESSAGE_ADD)
    })

    it('should return the message', () => {
      const actual = messageAdd('the-message')
      expect(actual).to.have.property('message', 'the-message')
    })
  })

  describe('add message', () => {
    let AppDispatcher = {}

    beforeEach(() => {
      AppDispatcher.dispatch = sinon.spy()
    })

    it('dispatches a invalid action for blank messages', () => {
      addMessage('')(AppDispatcher)

      expect(AppDispatcher.dispatch).to.have.been.calledWithMatch({
        type: MESSAGE_INVALID_INPUT
      })
    })

    it('dispatches a message added action for valid messages', () => {
      addMessage('=(^.^)=')(AppDispatcher)

      expect(AppDispatcher.dispatch).to.have.been.calledWith({
        type: MESSAGE_ADD,
        message: '=(^.^)='
      })
    })

    describe('dealing with spaces', () => {
      it('converts messages which do not look like text to use non-breaking spaces', () => {
        addMessage('=(^ . ^)=')(AppDispatcher)

        expect(AppDispatcher.dispatch).to.have.been.calledWithMatch({
          message: '=(^ . ^)='.replace(/ /g, String.fromCharCode(160))
        })
      })

      it('does not convert messages which look like text', () => {
        addMessage('some message')(AppDispatcher)

        expect(AppDispatcher.dispatch).to.have.been.calledWithMatch({
          message: 'some message'
        })
      })
    })
  })

  describe('remove message', () => {
    let AppDispatcher = {}

    beforeEach(() => {
      AppDispatcher.dispatch = sinon.spy()
    })

    it('dispatches a message removed action', () => {
      removeMessage('=(^.^)=')(AppDispatcher)

      expect(AppDispatcher.dispatch).to.have.been.calledWith({
        type: MESSAGE_REMOVE,
        message: '=(^.^)='
      })
    })
  })
})
