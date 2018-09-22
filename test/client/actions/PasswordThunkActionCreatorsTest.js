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
    '../common/gateways/Gateway': {abortPendingRequest},
    '../common/gateways/NevergreenGateway': {send},
    './PasswordActionCreators': {encryptingPassword, passwordEncrypted, passwordEncryptError}
  })

  describe('encryptPassword', function () {

    it('should abort pending request', async function () {
      send.resolves('')
      await testThunk(encryptPassword('irrelevant', 'irrelevant', 'some-pending-request'))
      expect(abortPendingRequest).to.have.been.calledWith('some-pending-request')
    })

    it('should dispatch encrypting password action', async function () {
      encrypt.returns({})
      send.resolves('')
      encrypt.returns('encryption-request')

      await testThunk(encryptPassword('some-tray-id', 'some-password'))
      expect(encryptingPassword).to.have.been.calledWith('some-tray-id', 'some-password', 'encryption-request')
    })

    it('should dispatch password encrypted action', async function () {
      send.resolves({password: 'some-encrypted-password'})
      await testThunk(encryptPassword('some-tray-id', 'irrelevant'))
      expect(passwordEncrypted).to.have.been.calledWith('some-tray-id', 'some-encrypted-password')
    })

    it('should dispatch password encrypted action on success', async function () {
      send.resolves({password: 'some-encrypted-password'})
      await testThunk(encryptPassword('some-tray-id', 'irrelevant'))
      expect(passwordEncrypted).to.have.been.calledWith('some-tray-id', 'some-encrypted-password')
    })

    it('should return the encrypted password on success because add tray needs to use it', async function () {
      send.resolves({password: 'some-encrypted-password'})
      const actual = await testThunk(encryptPassword('some-tray-id', 'irrelevant'))
      expect(actual).to.equal('some-encrypted-password')
    })

    it('should dispatch password encrypted action if password is blank without calling the gateway', async function () {
      await testThunk(encryptPassword('some-tray-id', ''))
      expect(passwordEncrypted).to.have.been.calledWith('some-tray-id', '')
      expect(send).to.not.have.been.called()
    })

    it('should return a blank string if password is blank because add tray needs to use it', async function () {
      const actual = await testThunk(encryptPassword('some-tray-id', ''))
      expect(actual).to.equal('')
    })

    it('should dispatch password encrypt error action if the request fails', async function () {
      send.rejects({message: 'some-error'})
      await testThunk(encryptPassword('some-tray-id', 'irrelevant'))
      expect(passwordEncryptError).to.have.been.calledWith('some-tray-id', ['some-error'])
    })
  })
})
