import {testThunk, withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'

describe('PasswordThunkActionCreators', function () {

  const encrypt = mocks.stub()
  const send = mocks.stub()
  const abortPendingRequest = mocks.stub()
  const encryptingPassword = mocks.spy()
  const passwordEncrypted = mocks.spy()
  const passwordEncryptError = mocks.spy()

  const {encryptPassword} = withMockedImports('client/actions/PasswordThunkActionCreators', {
    '../common/gateways/SecurityGateway': {encryptPassword: encrypt},
    '../common/gateways/Gateway': {send, abortPendingRequest},
    './PasswordActionCreators': {encryptingPassword, passwordEncrypted, passwordEncryptError}
  })

  describe('encryptPassword', function () {

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
})
