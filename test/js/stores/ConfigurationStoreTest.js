jest.dontMock('../../../src/js/stores/ConfigurationStore')
  .dontMock('../../../src/js/constants/NevergreenConstants')
  .dontMock('promise')

describe('display settings store', () => {

  let LocalRepository, AppDispatcher, Constants, Promise, store, callback

  beforeEach(() => {
    LocalRepository = require('../../../src/js/storage/LocalRepository')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    Promise = require('promise')
    store = require('../../../src/js/stores/ConfigurationStore')
    callback = AppDispatcher.register.mock.calls[0][0]
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  describe('are broken build timers enabled', () => {
    it('returns false by default', () => {
      expect(store.areBrokenBuildTimersEnabled()).toBeFalsy()
    })

    it('returns true when the callback changes the value to true', () => {
      LocalRepository.save.mockImplementation(() => {
        return new Promise(function(resolve) { return resolve() })
      })

      callback({
        type: Constants.ConfigurationLoaded,
        configuration: {
          displaySettings: {
            showBrokenBuildTimers: false
          }
        }
      })

      expect(store.areBrokenBuildTimersEnabled()).toBeFalsy()

      callback({
        type: Constants.BrokenBuildTimersChanged,
        value: true
      })

        expect(store.areBrokenBuildTimersEnabled()).toBeTruthy()
    })

    it(
      'return false when the callback changes the value to anything else',
      () => {
        callback({
          type: Constants.BrokenBuildTimersChanged,
          value: 'a string'
        })
        expect(store.areBrokenBuildTimersEnabled()).toBeFalsy()
      }
    )
  })
})
