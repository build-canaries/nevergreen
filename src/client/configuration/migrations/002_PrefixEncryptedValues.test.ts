import {migrate} from './002_PrefixEncryptedValues'
import {feedsRoot} from '../../settings/tracking/FeedsReducer'

it('should not modify the given data if it does not contain trays', () => {
  const data = {foo: 'bar'}
  migrate(data)
  expect(data).toEqual({foo: 'bar'})
})

it('should not modify the given data if it contains the trays key but it is not an object', () => {
  const data = {[feedsRoot]: 'invalid'}
  migrate(data)
  expect(data).toEqual({[feedsRoot]: 'invalid'})
})

it('should not modify the given data if it contains the trays and tray id keys but it is not an object', () => {
  const data = {[feedsRoot]: {trayId: 'invalid'}}
  migrate(data)
  expect(data).toEqual({[feedsRoot]: {trayId: 'invalid'}})
})

it('should move password to encryptedPassword', () => {
  const trayId = 'trayId'
  const data = {
    [feedsRoot]: {
      [trayId]: {
        trayId,
        password: 'some-encrypted-password'
      }
    }
  }
  migrate(data)
  expect(data).toHaveProperty([feedsRoot, trayId, 'encryptedPassword'], 'some-encrypted-password')
  expect(data).not.toHaveProperty([feedsRoot, trayId, 'password'])
})

it('should move accessToken to encryptedAccessToken', () => {
  const trayId = 'trayId'
  const data = {
    [feedsRoot]: {
      [trayId]: {
        trayId,
        accessToken: 'some-encrypted-token'
      }
    }
  }
  migrate(data)
  expect(data).toHaveProperty([feedsRoot, trayId, 'encryptedAccessToken'], 'some-encrypted-token')
  expect(data).not.toHaveProperty([feedsRoot, trayId, 'accessToken'])
})
