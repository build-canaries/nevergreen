import {ENCRYPTING_PASSWORD, PASSWORD_ENCRYPT_ERROR, PASSWORD_ENCRYPTED} from '../../../src/client/actions/Actions'
import {
  encryptingPassword,
  passwordEncrypted,
  passwordEncryptError
} from '../../../src/client/actions/PasswordActionCreators'

describe('PasswordActionCreators', () => {

  describe(ENCRYPTING_PASSWORD, () => {

    test('should return the correct type', () => {
      const actual = encryptingPassword()
      expect(actual).toHaveProperty('type', ENCRYPTING_PASSWORD)
    })

    test('should return the tray id', () => {
      const actual = encryptingPassword('some-tray-id')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the password being encrypted', () => {
      const actual = encryptingPassword('irrelevant', 'some-password')
      expect(actual).toHaveProperty('password', 'some-password')
    })

    test('should return the request', () => {
      const actual = encryptingPassword('irrelevant', 'irrelevant', 'some-request')
      expect(actual).toHaveProperty('request', 'some-request')
    })
  })

  describe(PASSWORD_ENCRYPTED, () => {

    test('should return the correct type', () => {
      const actual = passwordEncrypted()
      expect(actual).toHaveProperty('type', PASSWORD_ENCRYPTED)
    })

    test('should return the tray id', () => {
      const actual = passwordEncrypted('some-tray-id')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the encrypted password', () => {
      const actual = passwordEncrypted('irrelevant', 'encrypted-password')
      expect(actual).toHaveProperty('password', 'encrypted-password')
    })
  })

  describe(PASSWORD_ENCRYPT_ERROR, () => {

    test('should return the correct type', () => {
      const actual = passwordEncryptError()
      expect(actual).toHaveProperty('type', PASSWORD_ENCRYPT_ERROR)
    })

    test('should return the tray id', () => {
      const actual = passwordEncryptError('some-tray-id')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the errors', () => {
      const actual = passwordEncryptError('some-tray-id', ['some-error'])
      expect(actual.errors.toJS()).toEqual(expect.arrayContaining(['some-error']))
    })
  })
})
