jest.dontMock('../../../src/js/actions/SuccessActions')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('success actions', () => {

  let subject, AppDispatcher, Constants, validate

  beforeEach(() => {
    subject = require('../../../src/js/actions/SuccessActions')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    validate = require('validate.js')
  })

  it('dispatches a invalid action for blank messages', () => {
    validate.mockReturnValue('some message')

    subject.addMessage('')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.MessageInvalidInput,
      validationMessages: 'some message',
      message: ''
    })
  })

  it('dispatches a message added action for valid messages', () => {
    subject.addMessage('=(^.^)=')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.MessageAdd,
      message: '=(^.^)='
    })
  })

  it('dispatches a message removed action', () => {
    subject.removeMessage('=(^.^)=')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.MessageRemove,
      message: '=(^.^)='
    })
  })
})
