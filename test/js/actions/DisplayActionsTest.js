jest.dontMock('../../../src/js/actions/DisplayActions')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('display actions', () => {
  let subject, AppDispatcher, Constants

  beforeEach(() => {
    subject = require('../../../src/js/actions/DisplayActions')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
  })

  it('dispatches an action with the value given', () => {
    subject.setBrokenBuildTimers('some-value')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.BrokenBuildTimersChanged,
      value: 'some-value'
    })
  })
})
