jest.dontMock('../../../src/js/stores/PushedMessagesStore')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('pushed messages store', () => {

  let AppDispatcher, Constants, store, callback, eventSourceMock, eventEmitterMock

  beforeEach(() => {
    eventEmitterMock = require('../jest/Helpers').eventEmitterMock()

    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    store = require('../../../src/js/stores/PushedMessagesStore')
    callback = AppDispatcher.register.mock.calls[0][0]

    eventSourceMock = {}
    window.EventSource = function EventSource() {
      return eventSourceMock
    }

    callback({
      type: Constants.AppInit
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register.mock.calls.length).toBe(1)
  })

  describe('get last message', () => {
    it('returns an empty string if no messages have been pushed', () => {
      expect(store.getLastMessage()).toBe('')
    })

    it('returns the last message pushed', () => {
      eventSourceMock.onmessage({
        data: 'message-1'
      })
      eventSourceMock.onmessage({
        data: 'message-2'
      })
      eventSourceMock.onmessage({
        data: 'message-3'
      })
      expect(store.getLastMessage()).toBe('message-3')
    })

    it('emits a change event', () => {
      eventSourceMock.onmessage({
        data: 'irrelevant'
      })
      expect(eventEmitterMock.emit).toBeCalledWith('pushed-messages-change')
    })
  })

})
