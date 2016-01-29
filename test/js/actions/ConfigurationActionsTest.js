jest.dontMock('../../../src/js/actions/ConfigurationActions')
  .dontMock('../../../src/js/constants/NevergreenConstants')

describe('configuration actions', () => {
  let subject, AppDispatcher, Constants, LocalRepository, promiseMock, Helpers

  beforeEach(() => {
    Helpers = require('../jest/Helpers')
    subject = require('../../../src/js/actions/ConfigurationActions')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    Constants = require('../../../src/js/constants/NevergreenConstants')
    LocalRepository = require('../../../src/js/storage/LocalRepository')
    promiseMock = Helpers.promiseMock()
  })

  it('dispatches the up to most recent configuration loaded from storage', () => {
    LocalRepository.getConfiguration.mockReturnValue(promiseMock)

    subject.refreshConfiguration()

    promiseMock.then.mock.calls[0][0]('some-value') // call the callback passed to the promise mock

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: Constants.ExportData,
      configuration: 'some-value'
    })
  })
})
