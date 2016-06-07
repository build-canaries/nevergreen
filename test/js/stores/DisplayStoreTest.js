jest.dontMock('../../../src/js/stores/DisplayStore')
  .dontMock('../../../src/js/NevergreenActions')
  .dontMock('../../../src/js/audio-visual/AudioVisualActions')

describe('display store', () => {

  let AppDispatcher, NevergreenActions, AudioVisualActions, store, callback

  beforeEach(() => {
    AppDispatcher = require('../../../src/js/common/AppDispatcher')
    NevergreenActions = require('../../../src/js/NevergreenActions')
    AudioVisualActions = require('../../../src/js/audio-visual/AudioVisualActions')
    store = require('../../../src/js/stores/DisplayStore')
    callback = AppDispatcher.register.mock.calls[0][0]

    callback({
      type: NevergreenActions.AppInit,
      configuration: {}
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  describe('are broken build timers enabled', () => {
    it('returns false by default', () => {
      expect(store.areBrokenBuildTimersEnabled()).toBeFalsy()
    })

    it('returns true when the callback changes the value to true', () => {
      callback({
        type: AudioVisualActions.BrokenBuildTimersChanged,
        value: true
      })

      expect(store.areBrokenBuildTimersEnabled()).toBeTruthy()
    })

    it('return false when the callback changes the value to anything else', () => {
        callback({
          type: AudioVisualActions.BrokenBuildTimersChanged,
          value: 'a string'
        })
        expect(store.areBrokenBuildTimersEnabled()).toBeFalsy()
      }
    )
  })

  describe('are broken build sounds enabled', () => {

    it('disables broken build sounds by default', () => {
      expect(store.areBrokenBuildSoundsEnabled()).toBeFalsy()
    })

    it('enables broken builds when callback changes value to true', () => {
      callback({
        type: AudioVisualActions.BrokenBuildSoundsToggled,
        value: true
      })
      expect(store.areBrokenBuildSoundsEnabled()).toBeTruthy()
    })

    it('disables broken builds when callbak changes value to false', () => {
      callback({
        type: AudioVisualActions.BrokenBuildSoundsToggled,
        value: false
      })
      expect(store.areBrokenBuildSoundsEnabled()).toBeFalsy()
    })
  })

  describe('broken build sound fx', () => {
    it('defaults to the included pacman death sound', () => {
      expect(store.brokenBuildSoundFx()).toBe('sounds/pacman_death.mp3')
    })

    it('sets the value', () => {
      callback({
        type: AudioVisualActions.BrokenBuildSoundFx,
        value: 'some-url'
      })
      expect(store.brokenBuildSoundFx()).toBe('some-url')
    })
  })

  describe('validation', () => {
    it('returns an error message if the storage key does not exist', () => {
      const obj = {}
      expect(store.validate(obj)).toEqual([jasmine.any(String)])
    })
  })
})
