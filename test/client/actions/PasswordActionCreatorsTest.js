import {describe, it} from 'mocha'
import {expect} from 'chai'
import {ENCRYPTING_PASSWORD, PASSWORD_ENCRYPT_ERROR, PASSWORD_ENCRYPTED} from '../../../src/client/actions/Actions'
import {
  encryptingPassword,
  passwordEncrypted,
  passwordEncryptError
} from '../../../src/client/actions/PasswordActionCreators'

describe('PasswordActionCreators', function () {

  describe(ENCRYPTING_PASSWORD, function () {

    it('should return the correct type', function () {
      const actual = encryptingPassword()
      expect(actual).to.have.property('type', ENCRYPTING_PASSWORD)
    })

    it('should return the tray id', function () {
      const actual = encryptingPassword('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the password being encrypted', function () {
      const actual = encryptingPassword('irrelevant', 'some-password')
      expect(actual).to.have.property('password', 'some-password')
    })

    it('should return the request', function () {
      const actual = encryptingPassword('irrelevant', 'irrelevant', 'some-request')
      expect(actual).to.have.property('request', 'some-request')
    })
  })

  describe(PASSWORD_ENCRYPTED, function () {

    it('should return the correct type', function () {
      const actual = passwordEncrypted()
      expect(actual).to.have.property('type', PASSWORD_ENCRYPTED)
    })

    it('should return the tray id', function () {
      const actual = passwordEncrypted('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the encrypted password', function () {
      const actual = passwordEncrypted('irrelevant', 'encrypted-password')
      expect(actual).to.have.property('password', 'encrypted-password')
    })
  })

  describe(PASSWORD_ENCRYPT_ERROR, function () {

    it('should return the correct type', function () {
      const actual = passwordEncryptError()
      expect(actual).to.have.property('type', PASSWORD_ENCRYPT_ERROR)
    })

    it('should return the tray id', function () {
      const actual = passwordEncryptError('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the errors', function () {
      const actual = passwordEncryptError('some-tray-id', ['some-error'])
      expect(actual).to.have.property('errors').that.includes('some-error')
    })
  })
})
