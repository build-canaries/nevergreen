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

  it('dispatches restoring configuration', () => {
    const actual = BackupActions.restoreConfiguration('the-data')

    expect(actual).to.have.property('type', BackupActions.RESTORE_CONFIGURATION)
    expect(actual).to.have.property('configuration', 'the-data')
  })

  it('dispatches export data', () => {
    const actual = BackupActions.exportData('the-data')

    expect(actual).to.have.property('type', BackupActions.EXPORT_DATA)
    expect(actual).to.have.property('configuration', 'the-data')
  })

  it('dispatches the up to most recent configuration loaded from storage', () => {
    const AppDispatcher = {dispatch: sinon.spy()}
    LocalRepository.getConfiguration.resolves('some-value')

    BackupActions.refreshConfiguration()(AppDispatcher)

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: BackupActions.EXPORT_DATA,
      configuration: 'some-value'
    })
  })
})
