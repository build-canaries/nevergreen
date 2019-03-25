import * as gateway from '../../../src/client/gateways/Gateway'
import {GatewayError} from '../../../src/client/gateways/Gateway'
import {send} from '../../../src/client/gateways/NevergreenGateway'

describe('NevergreenGateway', () => {

  gateway.send = jest.fn()

  describe('send', () => {

    test('should return the error message from the body on error', async () => {
      gateway.send.mockRejectedValue(new GatewayError('', 0, {errorMessage: 'some-error'}))
      try {
        await send()
      } catch (err) {
        expect(err).toHaveProperty('message', 'some-error')
      }
    })

    test('should return the body if it does not contain an error message on error', async () => {
      gateway.send.mockRejectedValue(new GatewayError('', 0, 'timeout'))
      try {
        await send()
      } catch (err) {
        expect(err).toHaveProperty('message', 'timeout')
      }
    })
  })
})
