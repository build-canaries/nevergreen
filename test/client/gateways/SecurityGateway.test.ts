import {encrypt} from '../../../src/client/gateways/SecurityGateway'
import * as gateway from '../../../src/client/gateways/Gateway'

it('should call the encrypt URL', () => {
  jest.spyOn(gateway, 'post')
  void encrypt('some-password')
  expect(gateway.post).toBeCalledWith('/api/encrypt', 'some-password', {'Content-Type': 'text/plain'})
})
