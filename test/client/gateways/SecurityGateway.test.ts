import {encryptPassword, encryptAccessToken} from '../../../src/client/gateways/SecurityGateway'
import * as gateway from '../../../src/client/gateways/Gateway'

describe('SecurityGateway', () => {

  describe('encryptPassword', () => {

    test('should call the encrypt URL', () => {
      jest.spyOn(gateway, 'post')
      encryptPassword('some-password')
      expect(gateway.post).toBeCalledWith('/api/encrypt', {password: 'some-password'})
    })
  })

  describe('encryptAccessToken', () => {

    test('should call the encrypt URL with token', () => {
      jest.spyOn(gateway, 'post')
      encryptAccessToken('some-dummy-token')
      expect(gateway.post).toBeCalledWith('/api/encrypt', {accessToken: 'some-dummy-token'})
    })
  })
})
