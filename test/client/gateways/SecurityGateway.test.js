import {encryptPassword} from '../../../src/client/gateways/SecurityGateway'
import * as gateway from '../../../src/client/gateways/Gateway'

describe('SecurityGateway', () => {

  gateway.post = jest.fn()

  describe('encryptPassword', () => {

    test('should call the encrypt URL', () => {
      encryptPassword('some-password')
      expect(gateway.post).toBeCalledWith('/api/encrypt', {password: 'some-password'})
    })
  })
})
