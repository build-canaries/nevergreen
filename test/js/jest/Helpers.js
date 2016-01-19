module.exports = {
  eventEmitterMock() {
    const eventEmitterMock = {
      emit: jest.genMockFunction()
    }
    const eventEmitter = require('events')
    eventEmitter.EventEmitter = function EventEmitter() {
      return eventEmitterMock
    }

    return eventEmitterMock
  },

  promiseMock() {
    const promiseMock = {
      then: jest.genMockFunction(),
      catch: jest.genMockFunction()
    }
    promiseMock.then.mockReturnValue(promiseMock)
    promiseMock.catch.mockReturnValue(promiseMock)

    return promiseMock
  }
}