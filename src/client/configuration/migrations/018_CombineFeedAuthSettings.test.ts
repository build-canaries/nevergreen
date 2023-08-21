import { migrate } from './018_CombineFeedAuthSettings'
import { UntrustedData } from '../LocalRepository'

it('should return the given data if it does not contain settings', () => {
  const data = { foo: 'bar' }
  migrate(data)
  expect(data).toEqual({ foo: 'bar' })
})

it('should move encrypted password if it is not blank', () => {
  const data: UntrustedData = {
    trays: {
      trayId: { encryptedPassword: 'some-password' },
    },
  }
  migrate(data)
  expect(data).toEqual({
    trays: {
      trayId: expect.objectContaining({
        encryptedAuth: 'some-password',
      }) as unknown,
    },
  })
  expect(data).toEqual({
    trays: {
      trayId: expect.not.objectContaining({
        encryptedPassword: expect.any(String) as unknown,
      }) as unknown,
    },
  })
})

it('should move encrypted access token if it is not blank', () => {
  const data: UntrustedData = {
    trays: {
      trayId: { encryptedAccessToken: 'some-token' },
    },
  }
  migrate(data)
  expect(data).toEqual({
    trays: {
      trayId: expect.objectContaining({
        encryptedAuth: 'some-token',
      }) as unknown,
    },
  })
  expect(data).toEqual({
    trays: {
      trayId: expect.not.objectContaining({
        encryptedAccessToken: expect.any(String) as unknown,
      }) as unknown,
    },
  })
})
