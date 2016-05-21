jest.dontMock('../../../src/js/actions/DisplayActions')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('display actions', () => {
  let subject, AppDispatcher, Constants

  beforeEach(() => {
    subject = require('../../../src/js/actions/DisplayActions')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
  })

  it('dispatches an action for broken build timers', () => {
    subject.setBrokenBuildTimers('some-value')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.BrokenBuildTimersChanged,
      value: 'some-value'
    })
  })

  it('dispatches an action for the broken build sounds toggled', () => {
    subject.setBrokenBuildSounds('toggle on')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.BrokenBuildSoundsToggled,
      value: 'toggle on'
    })
  })  
  
  it('dispatches an action for the broken build sound fx', () => {
    subject.setBrokenBuildSoundFx('some-url')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.BrokenBuildSoundFx,
      value: 'some-url'
    })
  })
})
