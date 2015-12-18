jest.dontMock('../../../src/js/stores/ConfigurationStore')
  .dontMock('../../../src/js/constants/NevergreenConstants')
  .dontMock('promise')

describe('display settings store', function () {

  var LocalRepository, AppDispatcher, Constants, Promise, store, callback

  beforeEach(function () {
    LocalRepository = require('../../../src/js/storage/LocalRepository')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    Promise = require('promise')
    store = require('../../../src/js/stores/ConfigurationStore')
    callback = AppDispatcher.register.mock.calls[0][0]
  })

  it('registers a callback with the dispatcher', function () {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  describe('are broken build timers enabled', function () {
    it('returns false by default', function () {
      expect(store.areBrokenBuildTimersEnabled()).toBeFalsy()
    })

    it('returns true when the callback changes the value to true', function () {
      LocalRepository.save.mockImplementation(function () {
        return new Promise(function (resolve) { return resolve() })
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

    it('return false when the callback changes the value to anything else', function () {
      callback({
        type: Constants.BrokenBuildTimersChanged,
        value: 'a string'
      })
      expect(store.areBrokenBuildTimersEnabled()).toBeFalsy()
    })
  })
})
