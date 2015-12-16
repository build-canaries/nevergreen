jest.dontMock('../../../src/js/actions/DisplayActions')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('display actions', function () {
  var subject, AppDispatcher, Constants

  beforeEach(function () {
    subject = require('../../../src/js/actions/DisplayActions')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
  })

  it('dispatches an action with the value given', function () {
    subject.setBrokenBuildTimers('some-value')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.BrokenBuildTimersChanged,
      value: 'some-value'
    })
  })
})
