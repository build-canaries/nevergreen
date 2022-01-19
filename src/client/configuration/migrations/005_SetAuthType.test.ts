import {migrate} from './005_SetAuthType'
import {FEEDS_ROOT} from '../../settings/tracking/FeedsReducer'
import {AuthTypes} from '../../domain/Feed'

it('should not modify the given data if it does not contain projects', () => {
  const data = {foo: 'bar'}
  migrate(data)
  expect(data).toEqual({foo: 'bar'})
})

it('should not modify the given data if it contains the trays key but it is not an object', () => {
  const data = {[FEEDS_ROOT]: 'invalid'}
  migrate(data)
  expect(data).toEqual({[FEEDS_ROOT]: 'invalid'})
})

it('should not modify the given data if it contains the trays and tray id keys but it is not an object', () => {
  const data = {[FEEDS_ROOT]: {trayId: 'invalid'}}
  migrate(data)
  expect(data).toEqual({[FEEDS_ROOT]: {trayId: 'invalid'}})
})

it('should not change the auth type if it already exists', () => {
  const trayId = 'trayId'
  const data = {
    [FEEDS_ROOT]: {
      [trayId]: {
        authType: AuthTypes.token
      }
    }
  }
  migrate(data)
  expect(data).toHaveProperty([FEEDS_ROOT, trayId, 'authType'], AuthTypes.token)
})

it('should add the auth type as none if there is no password, username or access token', () => {
  const trayId = 'trayId'
  const data = {
    [FEEDS_ROOT]: {
      [trayId]: {}
    }
  }
  migrate(data)
  expect(data).toHaveProperty([FEEDS_ROOT, trayId, 'authType'], AuthTypes.none)
})

it('should add the auth type as basic if there is a username', () => {
  const trayId = 'trayId'
  const data = {
    [FEEDS_ROOT]: {
      [trayId]: {
        username: 'some-username'
      }
    }
  }
  migrate(data)
  expect(data).toHaveProperty([FEEDS_ROOT, trayId, 'authType'], AuthTypes.basic)
})

it('should add the auth type as basic if there is a password', () => {
  const trayId = 'trayId'
  const data = {
    [FEEDS_ROOT]: {
      [trayId]: {
        encryptedPassword: 'some-password'
      }
    }
  }
  migrate(data)
  expect(data).toHaveProperty([FEEDS_ROOT, trayId, 'authType'], AuthTypes.basic)
})

it('should add the auth type as token if there is a access token', () => {
  const trayId = 'trayId'
  const data = {
    [FEEDS_ROOT]: {
      [trayId]: {
        encryptedAccessToken: 'some-token'
      }
    }
  }
  migrate(data)
  expect(data).toHaveProperty([FEEDS_ROOT, trayId, 'authType'], AuthTypes.token)
})

// legitimately exported configuration should never end up in this state, but just in case pick basic
it('should add the auth type as basic if there is a username, password and access token', () => {
  const trayId = 'trayId'
  const data = {
    [FEEDS_ROOT]: {
      [trayId]: {
        username: 'some-username',
        encryptedPassword: 'some-password',
        encryptedAccessToken: 'some-token'
      }
    }
  }
  migrate(data)
  expect(data).toHaveProperty([FEEDS_ROOT, trayId, 'authType'], AuthTypes.basic)
})
