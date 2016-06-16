import '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

describe('backup actions', () => {
  let subject, AppDispatcher, LocalRepository

  before(() => {
    AppDispatcher = {
      dispatch: sinon.spy()
    }
    LocalRepository = {}
    subject = proxyquire('../../../src/js/backup/BackupActions', {
      '../common/AppDispatcher': AppDispatcher,
      '../common/LocalRepository': LocalRepository
    })
  })

  beforeEach(() => {
    LocalRepository.getConfiguration = sinon.stub().returnsPromise()
  })

  it('dispatches import error', () => {
    subject.importError('the-errors')

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: subject.ImportError,
      errors: 'the-errors'
    })
  })  
  
  it('dispatches importing data', () => {
    subject.importingData('the-data')

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: subject.ImportingData,
      data: 'the-data'
    })
  })  
  
  it('dispatches restoring configuration', () => {
    subject.restoreConfiguration('the-data')

    expect(AppDispatcher.dispatch).to.have.been.calledWithMatch({
      type: subject.RestoreConfiguration,
      configuration: 'the-data'
    })
  })  
  
  it('dispatches export data', () => {
    subject.exportData('the-data')

    expect(AppDispatcher.dispatch).to.have.been.calledWithMatch({
      type: subject.ExportData,
      configuration: 'the-data'
    })
  })
  
  it('dispatches the up to most recent configuration loaded from storage', () => {
    LocalRepository.getConfiguration.resolves('some-value')

    subject.refreshConfiguration()

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: subject.ExportData,
      configuration: 'some-value'
    })
  })
})
