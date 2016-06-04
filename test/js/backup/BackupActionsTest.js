jest.dontMock('../../../src/js/backup/BackupActions')

describe('backup actions', () => {
  let subject, AppDispatcher, LocalRepository, promiseMock, Helpers

  beforeEach(() => {
    Helpers = require('../jest/Helpers')
    subject = require('../../../src/js/backup/BackupActions')
    AppDispatcher = require('../../../src/js/dispatcher/AppDispatcher')
    LocalRepository = require('../../../src/js/storage/LocalRepository')
    promiseMock = Helpers.promiseMock()
  })

  it('dispatches the up to most recent configuration loaded from storage', () => {
    LocalRepository.getConfiguration.mockReturnValue(promiseMock)

    subject.refreshConfiguration()

    promiseMock.then.mock.calls[0][0]('some-value') // call the callback passed to the promise mock

    expect(AppDispatcher.dispatch).toBeCalledWith({
      type: subject.ExportData,
      configuration: 'some-value'
    })
  })
})
