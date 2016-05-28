jest.dontMock('../../../src/js/audio-visual/AudioVisualActions')

describe('audio visual actions', () => {
  let subject, AppDispatcher

  beforeEach(() => {
    subject = require('../../../src/js/audio-visual/AudioVisualActions')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
  })

  it('dispatches an action for broken build timers', () => {
    subject.setBrokenBuildTimers('some-value')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: subject.BrokenBuildTimersChanged,
      value: 'some-value'
    })
  })

  it('dispatches an action for the broken build sounds toggled', () => {
    subject.setBrokenBuildSounds('toggle on')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: subject.BrokenBuildSoundsToggled,
      value: 'toggle on'
    })
  })

  it('dispatches an action for the broken build sound fx', () => {
    subject.setBrokenBuildSoundFx('some-url')

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: subject.BrokenBuildSoundFx,
      value: 'some-url'
    })
  })
})
