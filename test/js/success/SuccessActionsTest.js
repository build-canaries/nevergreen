import '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

describe('success actions', () => {

  let subject, AppDispatcher

  before(() => {
    AppDispatcher = {}
    subject = proxyquire('../../../src/js/success/SuccessActions', {'../common/AppDispatcher': AppDispatcher})
  })

  beforeEach(() => {
    AppDispatcher.dispatch = sinon.spy()
  })

  it('dispatches a invalid action for blank messages', () => {
    subject.addMessage('')

    expect(AppDispatcher.dispatch).to.have.been.calledWithMatch({
      type: subject.MessageInvalidInput,
      message: ''
    })
  })

  it('dispatches a message added action for valid messages', () => {
    subject.addMessage('=(^.^)=')

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: subject.MessageAdd,
      message: '=(^.^)='
    })
  })

  it('dispatches a message removed action', () => {
    subject.removeMessage('=(^.^)=')

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: subject.MessageRemove,
      message: '=(^.^)='
    })
  })

  describe('dealing with spaces', () => {
    it('converts messages which do not look like text to use non-breaking spaces', () => {
      subject.addMessage('=(^ . ^)=')

      expect(AppDispatcher.dispatch).to.have.been.calledWith({
        type: subject.MessageAdd,
        message: '=(^ . ^)='.replace(/ /g, String.fromCharCode(160))
      })
    })

    it('does not convert messages which look like text', () => {
      subject.addMessage('some message')

      expect(AppDispatcher.dispatch).to.have.been.calledWith({
        type: subject.MessageAdd,
        message: 'some message'
      })
    })
  })
})
