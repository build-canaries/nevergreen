jest.dontMock('../../../src/js/actions/SuccessActions')
  .dontMock('../../../src/js/constants/NevergreenConstants')
  .dontMock('validate.js')

describe('success actions', function () {

  var subject, AppDispatcher, Constants

  beforeEach(function () {
    subject = require('../../../src/js/actions/SuccessActions')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
  })

  it('dispatches a invalid action for blank messages', function () {
    subject.addMessage('')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.MessageInvalidInput,
      validationMessages: {message: {0: 'Message can\'t be blank'}},
      message: ''
    })
  })

  it('dispatches a message added action for valid messages', function () {
    subject.addMessage('=(^.^)=')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.MessageAdd,
      message: '=(^.^)='
    })
  })

  it('dispatches a message removed action', function () {
    subject.removeMessage('=(^.^)=')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.MessageRemove,
      message: '=(^.^)='
    })
  })
})
