import {migrate} from '../../../../src/client/configuration/migrations/002_PrefixEncryptedValues'
import {TRAYS_ROOT} from '../../../../src/client/tracking/TraysReducer'

it('should not modify the given data if it does not contain trays', () => {
  const data = {foo: 'bar'}
  migrate(data)
  expect(data).toEqual({foo: 'bar'})
})

it('should not modify the given data if it contains the trays key but it is not an object', () => {
  const data = {[TRAYS_ROOT]: 'invalid'}
  migrate(data)
  expect(data).toEqual({[TRAYS_ROOT]: 'invalid'})
})

it('should not modify the given data if it contains the trays and tray id keys but it is not an object', () => {
  const data = {[TRAYS_ROOT]: {trayId: 'invalid'}}
  migrate(data)
  expect(data).toEqual({[TRAYS_ROOT]: {trayId: 'invalid'}})
})

it('should move password to encryptedPassword', () => {
  const trayId = 'trayId'
  const data = {
    [TRAYS_ROOT]: {
      [trayId]: {
        trayId,
        password: 'some-encrypted-password'
      }
    }
  }
  migrate(data)
  expect(data).toHaveProperty([TRAYS_ROOT, trayId, 'encryptedPassword'], 'some-encrypted-password')
  expect(data).not.toHaveProperty([TRAYS_ROOT, trayId, 'password'])
})

it('should move accessToken to encryptedAccessToken', () => {
  const trayId = 'trayId'
  const data = {
    [TRAYS_ROOT]: {
      [trayId]: {
        trayId,
        accessToken: 'some-encrypted-token'
      }
    }
  }
  migrate(data)
  expect(data).toHaveProperty([TRAYS_ROOT, trayId, 'encryptedAccessToken'], 'some-encrypted-token')
  expect(data).not.toHaveProperty([TRAYS_ROOT, trayId, 'accessToken'])
})
