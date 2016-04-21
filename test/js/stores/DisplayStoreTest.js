jest.dontMock('../../../src/js/stores/DisplayStore')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('display store', () => {

  let AppDispatcher, Constants, store, callback

  beforeEach(() => {
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    store = require('../../../src/js/stores/DisplayStore')
    callback = AppDispatcher.register.mock.calls[0][0]

    callback({
      type: Constants.AppInit,
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
        type: Constants.BrokenBuildTimersChanged,
        value: true
      })

      expect(store.areBrokenBuildTimersEnabled()).toBeTruthy()
    })

    it('return false when the callback changes the value to anything else', () => {
        callback({
          type: Constants.BrokenBuildTimersChanged,
          value: 'a string'
        })
        expect(store.areBrokenBuildTimersEnabled()).toBeFalsy()
      }
    )
  })

  describe('are broken build sounds enabled', () => {

    it('enables broken build sounds by default', () => {
      expect(store.areBrokenBuildSoundsEnabled()).toBeTruthy()
    })

    it('enables broken builds when callback changes value to true', () => {
      callback({
        type: Constants.BrokenBuildSoundsToggled,
        value: true
      })
      expect(store.areBrokenBuildSoundsEnabled()).toBeTruthy()
    });

    it('disables broken builds when callbak changes value to false', () => {
      callback({
        type: Constants.BrokenBuildSoundsToggled,
        value: false
      })
      expect(store.areBrokenBuildSoundsEnabled()).toBeFalsy()
    });
  })

  describe('validation', () => {
    it('returns an error message if the storage key does not exist', () => {
      const obj = {}
      expect(store.validate(obj)).toEqual([jasmine.any(String)])
    })
  })
})
