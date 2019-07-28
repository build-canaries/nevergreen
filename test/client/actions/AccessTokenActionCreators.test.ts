import {Actions} from '../../../src/client/actions/Actions'
import {fakeRequest} from '../../../src/client/gateways/Gateway'
import {
  encryptingToken,
  tokenEncrypted,
  tokenEncryptError
} from "../../../src/client/actions/AccessTokenActionCreators";

describe('PasswordActionCreators', () => {

  describe(Actions.ENCRYPTING_TOKEN, () => {

    test('should return the correct type', () => {
      const actual = encryptingToken('irrelevant', 'irrelevant', fakeRequest('irrelevant'))
      expect(actual).toHaveProperty('type', Actions.ENCRYPTING_TOKEN)
    })

    test('should return the tray id', () => {
      const actual = encryptingToken('some-tray-id', 'irrelevant', fakeRequest('irrelevant'))
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the access token being encrypted', () => {
      const actual = encryptingToken('irrelevant', 'some-password', fakeRequest('irrelevant'))
      expect(actual).toHaveProperty('accessToken', 'some-password')
    })

    test('should return the request', () => {
      const request = fakeRequest('some-body')
      const actual = encryptingToken('irrelevant', 'irrelevant', request)
      expect(actual).toHaveProperty('request', request)
    })
  })

  describe(Actions.TOKEN_ENCRYPTED, () => {

    test('should return the correct type', () => {
      const actual = tokenEncrypted('irrelevant', 'irrelevant')
      expect(actual).toHaveProperty('type', Actions.TOKEN_ENCRYPTED)
    })

    test('should return the tray id', () => {
      const actual = tokenEncrypted('some-tray-id', 'irrelevant')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the encrypted access token', () => {
      const actual = tokenEncrypted('irrelevant', 'encrypted-password')
      expect(actual).toHaveProperty('accessToken', 'encrypted-password')
    })
  })

  describe(Actions.TOKEN_ENCRYPT_ERROR, () => {

    test('should return the correct type', () => {
      const actual = tokenEncryptError('irrelevant', [])
      expect(actual).toHaveProperty('type', Actions.TOKEN_ENCRYPT_ERROR)
    })

    test('should return the tray id', () => {
      const actual = tokenEncryptError('some-tray-id', [])
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the errors', () => {
      const actual = tokenEncryptError('some-tray-id', ['some-error'])
      expect(actual.errors).toEqual(expect.arrayContaining(['some-error']))
    })
  })
})
