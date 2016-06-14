import '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'
import {AppInit} from '../../../src/js/NevergreenActions'
import {TrayAdd} from '../../../src/js/tracking/TrackingActions'
import {ProjectSelected, ProjectUnselected} from '../../../src/js/tracking/tray/TrayActions'
import {RestoreConfiguration} from '../../../src/js/backup/BackupActions'

describe('selected projects store', () => {

  let subject, AppDispatcher, callback

  before(() => {
    AppDispatcher = {
      register: sinon.spy()
    }
    subject = proxyquire('../../../src/js/stores/SelectedProjectsStore', {'../common/AppDispatcher': AppDispatcher})

    callback = AppDispatcher.register.getCall(0).args[0]
  })

  beforeEach(() => {
    AppDispatcher.dispatch = sinon.spy()

    callback({
      type: AppInit,
      configuration: {}
    })
    callback({
      type: TrayAdd,
      trayId: 'some-id'
    })
  })

  it('registers a callback with the dispatcher', () => {
    expect(AppDispatcher.register).to.have.been.called
  })

  it('concatenates selected project ids', () => {
    callback({
      type: ProjectSelected,
      trayId: 'some-id',
      projectIds: ['id-1']
    })
    callback({
      type: ProjectSelected,
      trayId: 'some-id',
      projectIds: ['id-2']
    })
    expect(subject.getForTray('some-id')).to.deep.equal(['id-1', 'id-2'])
  })

  it('removes unselected projects', () => {
    callback({
      type: ProjectSelected,
      trayId: 'some-id',
      projectIds: ['id-1']
    })
    callback({
      type: ProjectUnselected,
      trayId: 'some-id',
      projectIds: ['id-1']
    })
    expect(subject.getForTray('some-id')).to.deep.equal([])
  })

  it('restores the state from configuration', () => {
    callback({
      type: RestoreConfiguration,
      configuration: {selectedProjects: 'some-configuration'}
    })
    expect(subject.getAll()).to.equal('some-configuration')
  })

  describe('validation', () => {
    it('returns an error message if the storage key does not exist', () => {
      const obj = {}
      expect(subject.validate(obj)).to.deep.equal(['The top level key selectedProjects is missing!'])
    })

    it('returns an error message if the storage key is not an object', () => {
      const obj = {
        selectedProjects: 'not-an-object'
      }
      expect(subject.validate(obj)).to.deep.equal(['The top level key selectedProjects must be an object!'])
    })
  })
})
