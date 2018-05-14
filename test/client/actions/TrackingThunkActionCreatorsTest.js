import {testThunk, withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'

describe('TrackingThunkActionCreators', function () {

  const generateRandomName = mocks.stub()
  const encrypt = mocks.stub()
  const send = mocks.stub()
  const abortPendingRequest = mocks.stub()
  const fetchAll = mocks.stub()
  const encryptingPassword = mocks.spy()
  const passwordEncrypted = mocks.spy()
  const passwordEncryptError = mocks.spy()
  const trayAdded = mocks.spy()
  const projectsFetching = mocks.spy()
  const projectsFetched = mocks.spy()
  const projectsFetchError = mocks.spy()
  const setTrayId = mocks.spy()

  const {updateTrayId, encryptPassword, refreshTray} = withMockedImports('client/actions/TrackingThunkActionCreators', {
    '../common/gateways/SecurityGateway': {encryptPassword: encrypt},
    '../common/gateways/ProjectsGateway': {fetchAll},
    '../common/gateways/Gateway': {send, abortPendingRequest},
    '../domain/Tray': {generateRandomName},
    './TrackingActionCreators': {
      encryptingPassword,
      passwordEncrypted,
      passwordEncryptError,
      trayAdded,
      projectsFetching,
      projectsFetched,
      projectsFetchError,
      setTrayId
    }
  })

  describe('update tray id', function () {

    it('should dispatch set tray id', function () {
      const tray = {trayId: 'old-tray-id'}
      return testThunk(updateTrayId(tray, 'new-tray-id')).then(() => {
        expect(setTrayId).to.have.been.calledWith('old-tray-id', 'new-tray-id')
      })
    })

    // TODO: [#195] We can't verify refresh tray gets called as its in the same module
    it('should dispatch refresh tray')
  })

  describe('encrypt password', function () {

    it('should abort pending request', function () {
      send.resolves('')
      return testThunk(encryptPassword('irrelevant', 'irrelevant', 'some-pending-request')).then(() => {
        expect(abortPendingRequest).to.have.been.calledWith('some-pending-request')
      })
    })

    it('should dispatch encrypting password action', function () {
      encrypt.returns({})
      send.resolves('')
      encrypt.returns('encryption-request')

      return testThunk(encryptPassword('some-tray-id', 'some-password')).then(() => {
        expect(encryptingPassword).to.have.been.calledWith('some-tray-id', 'some-password', 'encryption-request')
      })
    })

    it('should dispatch password encrypted action', function () {
      send.resolves({password: 'some-encrypted-password'})
      return testThunk(encryptPassword('some-tray-id', 'irrelevant')).then(() => {
        expect(passwordEncrypted).to.have.been.calledWith('some-tray-id', 'some-encrypted-password')
      })
    })

    it('should dispatch password encrypted action on success', function () {
      send.resolves({password: 'some-encrypted-password'})
      return testThunk(encryptPassword('some-tray-id', 'irrelevant')).then(() => {
        expect(passwordEncrypted).to.have.been.calledWith('some-tray-id', 'some-encrypted-password')
      })
    })

    it('should return the encrypted password on success because add tray needs to use it', function () {
      send.resolves({password: 'some-encrypted-password'})
      return testThunk(encryptPassword('some-tray-id', 'irrelevant')).then((actual) => {
        expect(actual).to.equal('some-encrypted-password')
      })
    })

    it('should dispatch password encrypted action if password is blank without calling the gateway', function () {
      return testThunk(encryptPassword('some-tray-id', '')).then(() => {
        expect(passwordEncrypted).to.have.been.calledWith('some-tray-id', '')
        expect(send).to.not.have.been.called()
      })
    })

    it('should return a blank string if password is blank because add tray needs to use it', function () {
      return testThunk(encryptPassword('some-tray-id', '')).then((actual) => {
        expect(actual).to.equal('')
      })
    })

    it('should dispatch password encrypt error action if the request fails', function () {
      send.rejects({message: 'some-error'})
      return testThunk(encryptPassword('some-tray-id', 'irrelevant')).then(() => {
        expect(passwordEncryptError).to.have.been.calledWith('some-tray-id', ['Nevergreen some-error'])
      })
    })
  })

  describe.skip('add tray')

  describe('refresh tray', function () {

    it('should abort pending request', function () {
      send.resolves('')
      return testThunk(refreshTray({}, 'some-pending-request')).then(() => {
        expect(abortPendingRequest).to.have.been.calledWith('some-pending-request')
      })
    })

    it('should dispatch projects fetching action', function () {
      send.resolves('')
      fetchAll.returns('some-fetch-all-request')
      const tray = {trayId: 'some-tray-id'}

      return testThunk(refreshTray(tray)).then(() => {
        expect(projectsFetching).to.have.been.calledWith('some-tray-id', 'some-fetch-all-request')
      })
    })

    it('should dispatch projects fetched action when no errors are returned', function () {
      send.resolves([])
      const tray = {trayId: 'some-tray-id'}

      return testThunk(refreshTray(tray)).then(() => {
        expect(projectsFetched).to.have.been.calledWith('some-tray-id', [])
      })
    })

    it('should dispatch projects fetch error action if an error is returned', function () {
      send.resolves([{message: 'some-error'}])
      const tray = {trayId: 'some-tray-id'}

      return testThunk(refreshTray(tray)).then(() => {
        expect(projectsFetchError).to.have.been.calledWith('some-tray-id', ['some-error'])
      })
    })

    it('should dispatch projects fetch error action if the request fails', function () {
      send.rejects({message: 'some-error'})
      const tray = {trayId: 'some-tray-id'}

      return testThunk(refreshTray(tray)).then(() => {
        expect(projectsFetchError).to.have.been.calledWith('some-tray-id', ['Nevergreen some-error'])
      })
    })
  })
})
