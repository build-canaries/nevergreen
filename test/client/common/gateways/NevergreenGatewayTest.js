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
      gatewaySend.rejects(new GatewayError({body: {errorMessage: 'some-error'}}))
      try {
        await send()
      } catch (err) {
        expect(err).to.have.property('message', 'some-error')
      }
    })

    it('should return the body if it does not contain an error message on error', async function () {
      gatewaySend.rejects(new GatewayError({body: 'timeout'}))
      try {
        await send()
      } catch (err) {
        expect(err).to.have.property('message', 'timeout')
      }
    })

    it('should return the given status on error', async function () {
      gatewaySend.rejects(new GatewayError({status: 500}))
      try {
        await send()
      } catch (err) {
        expect(err).to.have.property('status', 500)
      }
    })
  })
})
