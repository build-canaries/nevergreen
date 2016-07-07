import '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

describe('backup actions', () => {
  let BackupActions, LocalRepository

  before(() => {
    LocalRepository = {}
    BackupActions = proxyquire('../../../src/client/backup/BackupActions', {
      '../common/LocalRepository': LocalRepository
    })
  })

  beforeEach(() => {
    LocalRepository.getConfiguration = sinon.stub().returnsPromise()
  })

  it('dispatches import error', () => {
    const actual = BackupActions.importError('the-errors')

    expect(actual).to.have.property('type', BackupActions.IMPORT_ERROR)
    expect(actual).to.have.property('errors', 'the-errors')
  })

  it('dispatches importing data', () => {
    const actual = BackupActions.importingData('the-data')

    expect(actual).to.have.property('type', BackupActions.IMPORTING_DATA)
    expect(actual).to.have.property('data', 'the-data')
  })

  it('dispatches imported data', () => {
    const actual = BackupActions.importedData('the-data')

    expect(actual).to.have.property('type', BackupActions.IMPORTED_DATA)
    expect(actual).to.have.property('configuration', 'the-data')
  })

  it('dispatches exported data', () => {
    const actual = BackupActions.exportedData('the-data')

    expect(actual).to.have.property('type', BackupActions.EXPORTED_DATA)
    expect(actual).to.have.property('configuration', 'the-data')
  })

  it('dispatches the up to most recent configuration loaded from storage', () => {
    const AppDispatcher = {dispatch: sinon.spy()}
    LocalRepository.getConfiguration.resolves('some-value')

    BackupActions.exportData()(AppDispatcher)

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: BackupActions.EXPORTING_DATA
    })

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: BackupActions.EXPORTED_DATA,
      configuration: 'some-value'
    })
  })
})
