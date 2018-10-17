import {withMockedImports} from '../../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../../Mocking'
import {GatewayError} from '../../../../src/client/common/gateways/Gateway'

describe('NevergreenGateway', function () {

  const gatewaySend = mocks.stub()

  const {send} = withMockedImports('client/common/gateways/NevergreenGateway', {
    './Gateway': {send: gatewaySend}
  })

  describe('send', function () {

    it('should return the error message from the body on error', async function () {
      gatewaySend.rejects(new GatewayError('', 0, {errorMessage: 'some-error'}))
      try {
        await send()
      } catch (err) {
        expect(err).to.have.property('message', 'some-error')
      }
    })

    it('should return the body if it does not contain an error message on error', async function () {
      gatewaySend.rejects(new GatewayError('', 0, 'timeout'))
      try {
        await send()
      } catch (err) {
        expect(err).to.have.property('message', 'timeout')
      }
    })
  })
})
