jest.dontMock('../../../src/js/success/SuccessActions')

describe('success actions', () => {

  let subject, AppDispatcher

  beforeEach(() => {
    subject = require('../../../src/js/success/SuccessActions')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
  })

  it('should not change messages which do not need to change', () => {
    expect('some-string').toEqual('some-string'.replace(/ /g, String.fromCharCode(160)))
  })

  it('dispatches a invalid action for blank messages', () => {
    subject.addMessage('')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: subject.MessageInvalidInput,
      errors: jasmine.arrayContaining([jasmine.any(String)]),
      message: ''
    })
  })

  it('dispatches a message added action for valid messages', () => {
    subject.addMessage('=(^.^)=')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: subject.MessageAdd,
      message: '=(^.^)='
    })
  })

  it('dispatches a message removed action', () => {
    subject.removeMessage('=(^.^)=')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: subject.MessageRemove,
      message: '=(^.^)='
    })
  })

  describe('dealing with spaces', () => {
    it('converts messages which do not look like text to use non-breaking spaces', () => {
      subject.addMessage('=(^ . ^)=')

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: subject.MessageAdd,
        message: '=(^ . ^)='.replace(/ /g, String.fromCharCode(160))
      })
    })

    it('does not convert messages which look like text', () => {
      subject.addMessage('some message')

      expect(AppDispatcher.dispatch).toBeCalledWith({
        type: subject.MessageAdd,
        message: 'some message'
      })
    })
  })
})
