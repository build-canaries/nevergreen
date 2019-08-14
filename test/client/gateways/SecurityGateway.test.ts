import {encrypt} from '../../../src/client/gateways/SecurityGateway'
import * as gateway from '../../../src/client/gateways/Gateway'

describe('SecurityGateway', () => {

  test('should call the encrypt URL', () => {
    jest.spyOn(gateway, 'post')
    encrypt('some-password')
    expect(gateway.post).toBeCalledWith('/api/encrypt', 'some-password', {'Content-Type': 'text/plain'})
  })
})
