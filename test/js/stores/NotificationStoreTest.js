jest.dontMock('../../../src/js/stores/NotificationStore')
  .dontMock('../../../src/js/NevergreenActions')

describe('notification store', () => {

  let AppDispatcher, NevergreenActions, store, callback, eventEmitterMock

  beforeEach(() => {
    eventEmitterMock = require('../jest/Helpers').eventEmitterMock()

    AppDispatcher = require('../../../src/js/common/AppDispatcher')
    NevergreenActions = require('../../../src/js/NevergreenActions')
    store = require('../../../src/js/stores/NotificationStore')
    callback = AppDispatcher.register.mock.calls[0][0]

    callback({
      type: NevergreenActions.AppInit
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  it('emits an change after app init', () => {
    callback({
      type: NevergreenActions.AppInit
    })
    expect(eventEmitterMock.emit).toBeCalledWith('notification-change')
  })

  it('returns an empty string by default', () => {
    expect(store.getNotification()).toBe('')
  })

  describe('notification event', () => {
    beforeEach(() => {
      callback({
        type: NevergreenActions.Notification,
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
        type: NevergreenActions.Notification,
        message: 'some-message'
      })
      callback({
        type: NevergreenActions.NotificationDismiss
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
