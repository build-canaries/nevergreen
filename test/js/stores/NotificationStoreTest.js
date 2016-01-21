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

  it('emits an change after app init', () => {
    callback({
      type: Constants.AppInit
    })
    expect(eventEmitterMock.emit).toBeCalledWith('notification-change')
  })

  it('returns an empty string by default', () => {
    expect(store.getNotification()).toBe('')
  })

  describe('notification event', () => {
    beforeEach(() => {
      callback({
        type: Constants.Notification,
        message: 'some-message'
      })
    })

    it('sets the notification to the message', () => {
      expect(store.getNotification()).toBe('some-message')
    })

    it('emits a change', () => {
      expect(eventEmitterMock.emit).toBeCalledWith('notification-change')
    })
  })

  describe('dismissing the notification', () => {
    beforeEach(() => {
      callback({
        type: Constants.Notification,
        message: 'some-message'
      })
      callback({
        type: Constants.NotificationDismiss
      })
    })

    it('sets the notification back to an empty string', () => {
      expect(store.getNotification()).toBe('')
    })

    it('emits an change', () => {
      expect(eventEmitterMock.emit).toBeCalledWith('notification-change')
    })
  })

})
