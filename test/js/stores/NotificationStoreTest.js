jest.dontMock('../../../src/js/stores/NotificationStore')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('notification store', () => {

  let AppDispatcher, Constants, store, callback, eventEmitterMock

  beforeEach(() => {
    eventEmitterMock = require('../jest/Helpers').eventEmitterMock()

    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    store = require('../../../src/js/stores/NotificationStore')
    callback = AppDispatcher.register.mock.calls[0][0]

    callback({
      type: Constants.AppInit
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  it('emits an event after app init', () => {
    callback({
      type: Constants.AppInit
    })
    expect(eventEmitterMock.emit).toBeCalledWith('notification-change')
  })

  it('returns an empty string by default', () => {
    expect(store.getNotification()).toBe('')
  })

})
