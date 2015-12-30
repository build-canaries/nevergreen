jest.dontMock('../../../src/js/actions/ConfigurationActions')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('configuration actions', () => {
  let subject, AppDispatcher, Constants, LocalRepository, promiseMock

  beforeEach(() => {
    subject = require('../../../src/js/actions/ConfigurationActions')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    LocalRepository = require('../../../src/js/storage/LocalRepository')
    promiseMock = {
      then: jest.genMockFunction(),
      catch: jest.genMockFunction()
    }
    promiseMock.then.mockReturnValue(promiseMock)
    promiseMock.catch.mockReturnValue(promiseMock)
  })

  it('dispatches the up to most recent configuration loaded from storage', () => {
    LocalRepository.getConfiguration.mockReturnValue(promiseMock)

    subject.exportData()

    promiseMock.then.mock.calls[0][0]('some-value') // call the callback passed to the promise mock

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.ExportData,
      configuration: 'some-value'
    })
  })
})
