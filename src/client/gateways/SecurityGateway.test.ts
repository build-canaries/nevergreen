import {encrypt} from './SecurityGateway'
import * as gateway from '../gateways/Gateway'

it('should call the encrypt URL', () => {
  jest.spyOn(gateway, 'post')
  void encrypt('some-password')
  expect(gateway.post).toBeCalledWith('/api/encrypt', 'some-password', {'Content-Type': 'text/plain'})
})
