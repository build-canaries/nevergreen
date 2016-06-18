import '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

describe('tracking actions', () => {

  let subject, AppDispatcher, ProjectsGateway, SecurityGateway, TrayStore, uuid

  before(() => {
    AppDispatcher = {}
    ProjectsGateway = {}
    SecurityGateway = {}
    TrayStore = {}
    uuid = {}
    subject = proxyquire('../../../src/client/tracking/TrackingActions', {
      '../common/AppDispatcher': AppDispatcher,
      '../common/gateways/ProjectsGateway': ProjectsGateway,
      '../common/gateways/SecurityGateway': SecurityGateway,
      '../stores/TrayStore': TrayStore,
      'node-uuid': uuid
    })
  })

  beforeEach(() => {
    AppDispatcher.dispatch = sinon.spy()
    ProjectsGateway.fetchAll = sinon.stub().returnsPromise()
    SecurityGateway.encryptPassword = sinon.stub().returnsPromise()
  })

  describe('adding a tray', () => {
    beforeEach(() => {
      uuid.v4 = sinon.stub().returns('some-uuid')
    })

    it('dispatches tray add', () => {
      subject.addTray('http://some-url', 'some-username', 'some-password')

      expect(AppDispatcher.dispatch).to.have.been.calledWith({
        type: subject.TrayAdd,
        trayId: 'some-uuid',
        url: 'http://some-url',
        username: 'some-username'
      })
    })

    it('adds the http scheme if no scheme is given', () => {
      subject.addTray('some-url', 'some-username', 'some-password')

      expect(AppDispatcher.dispatch).to.have.been.calledWithMatch({
        url: 'http://some-url'
      })
    })

    it('refreshes the tray with the username even if a blank password is given', () => {
      subject.addTray('http://some-url', 'some-username', '')

      expect(AppDispatcher.dispatch).to.have.been.calledWithMatch({
        type: subject.ProjectsFetching
      })
    })

    it('dispatches password encrypted if the tray has a password', () => {
      SecurityGateway.encryptPassword.resolves({password: 'some-encrypted-password'})

      subject.addTray('http://some-url', 'some-username', 'some-password')

      expect(AppDispatcher.dispatch).to.have.been.calledWithMatch({
        type: subject.PasswordEncrypted,
        trayId: 'some-uuid',
        password: 'some-encrypted-password'
      })

      expect(ProjectsGateway.fetchAll.getCall(0).args[0]).to.have.deep.property('[0].password', 'some-encrypted-password')
  })
  })

  it('dispatches tray remove action when removing a tray', () => {
    subject.removeTray('some-id')

    expect(AppDispatcher.dispatch).to.have.been.calledWith({
      type: subject.TrayRemove,
      trayId: 'some-id'
    })
  })

  describe('refreshing a tray', () => {
    it('dispatches projects fetching with the tray id', () => {
      subject.refreshTray({trayId: 'some-id'})

      expect(AppDispatcher.dispatch).to.have.been.calledWith({
        type: subject.ProjectsFetching,
        trayId: 'some-id'
      })
    })

    it('dispatches projects fetched action on success', () => {
      ProjectsGateway.fetchAll.resolves('some-projects')

      subject.refreshTray({trayId: 'some-id'})

      expect(AppDispatcher.dispatch).to.have.been.calledWithMatch({
        type: subject.ProjectsFetched,
        trayId: 'some-id',
        projects: 'some-projects'
      })
    })

    it('dispatches projects fetching failed action on error', () => {
      ProjectsGateway.fetchAll.rejects('some-error')

      subject.refreshTray({trayId: 'some-id'})

      expect(AppDispatcher.dispatch).to.have.been.calledWithMatch({
        type: subject.ProjectsFetchError,
        trayId: 'some-id',
        error: 'some-error'
      })
    })
  })

  describe('updating a tray', () => {
    beforeEach(() => {
      TrayStore.getById = sinon.stub().returns({password: 'existing-password'})
    })

    it('dispatches tray update with the given id', () => {
      subject.updateTray('some-id', 'some-name', 'some-url', 'some-username', 'some-password')

      expect(AppDispatcher.dispatch).to.have.been.calledWith({
        type: subject.TrayUpdate,
        trayId: 'some-id',
        name: 'some-name',
        url: 'some-url',
        username: 'some-username'
      })
    })

    it('dispatches password encrypted if the tray has a new different password', () => {
      SecurityGateway.encryptPassword.resolves({password: 'some-encrypted-password'})

      subject.updateTray('some-id', 'some-name', 'some-url', 'some-username', 'some-password')

      expect(AppDispatcher.dispatch).to.have.been.calledWith({
        type: subject.PasswordEncrypted,
        trayId: 'some-id',
        password: 'some-encrypted-password'
      })
    })

    it('does not dispatch password encrypted if the given password is the same as the current password', () => {
      subject.updateTray('some-id', 'some-name', 'some-url', 'some-username', 'existing-password')

      expect(AppDispatcher.dispatch).to.not.have.been.calledWith({
        type: subject.PasswordEncrypted,
        trayId: 'some-id',
        password: 'some-encrypted-password'
      })
    })

    it('allows the password to be unset aka updated to blank', () => {
      subject.updateTray('some-id', 'some-name', 'some-url', 'some-username', '')

      expect(AppDispatcher.dispatch).to.have.been.calledWith({
        type: subject.PasswordEncrypted,
        trayId: 'some-id',
        password: ''
      })
    })
  })

})
