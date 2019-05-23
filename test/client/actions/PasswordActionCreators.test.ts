import {Actions} from '../../../src/client/actions/Actions'
import {
  encryptingPassword,
  passwordEncrypted,
  passwordEncryptError
} from '../../../src/client/actions/PasswordActionCreators'
import {fakeRequest} from '../../../src/client/gateways/Gateway'

describe('PasswordActionCreators', () => {

  describe(Actions.ENCRYPTING_PASSWORD, () => {

    test('should return the correct type', () => {
      const actual = encryptingPassword('irrelevant', 'irrelevant', fakeRequest('irrelevant'))
      expect(actual).toHaveProperty('type', Actions.ENCRYPTING_PASSWORD)
    })

    test('should return the tray id', () => {
      const actual = encryptingPassword('some-tray-id', 'irrelevant', fakeRequest('irrelevant'))
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the password being encrypted', () => {
      const actual = encryptingPassword('irrelevant', 'some-password', fakeRequest('irrelevant'))
      expect(actual).toHaveProperty('password', 'some-password')
    })

    test('should return the request', () => {
      const request = fakeRequest('some-body')
      const actual = encryptingPassword('irrelevant', 'irrelevant', request)
      expect(actual).toHaveProperty('request', request)
    })
  })

  describe(Actions.PASSWORD_ENCRYPTED, () => {

    test('should return the correct type', () => {
      const actual = passwordEncrypted('irrelevant', 'irrelevant')
      expect(actual).toHaveProperty('type', Actions.PASSWORD_ENCRYPTED)
    })

    test('should return the tray id', () => {
      const actual = passwordEncrypted('some-tray-id', 'irrelevant')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the encrypted password', () => {
      const actual = passwordEncrypted('irrelevant', 'encrypted-password')
      expect(actual).toHaveProperty('password', 'encrypted-password')
    })
  })

  describe(Actions.PASSWORD_ENCRYPT_ERROR, () => {

    test('should return the correct type', () => {
      const actual = passwordEncryptError('irrelevant', [])
      expect(actual).toHaveProperty('type', Actions.PASSWORD_ENCRYPT_ERROR)
    })

    test('should return the tray id', () => {
      const actual = passwordEncryptError('some-tray-id', [])
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the errors', () => {
      const actual = passwordEncryptError('some-tray-id', ['some-error'])
      expect(actual.errors).toEqual(expect.arrayContaining(['some-error']))
    })
  })
})
