import {encrypt} from './SecurityGateway'
import * as gateway from '../gateways/Gateway'

it('should call the encrypt URL', async () => {
  jest.spyOn(gateway, 'post').mockResolvedValueOnce('')
  await encrypt('some-password')
  expect(gateway.post).toBeCalledWith({
    url: '/api/encrypt',
    data: 'some-password',
    headers: {'Content-Type': 'text/plain'}
  })
})
