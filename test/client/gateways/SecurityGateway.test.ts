import {encryptPassword} from '../../../src/client/gateways/SecurityGateway'
import * as gateway from '../../../src/client/gateways/Gateway'

describe('SecurityGateway', () => {

  describe('encryptPassword', () => {

    test('should call the encrypt URL', () => {
      jest.spyOn(gateway, 'post')
      encryptPassword('some-password')
      expect(gateway.post).toBeCalledWith('/api/encrypt', {password: 'some-password'})
    })
  })
})
