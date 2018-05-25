import {withMockedImports} from '../../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../../Mocking'

describe('NevergreenGateway', function () {

  const gatewaySend = mocks.stub()

  const {send} = withMockedImports('client/common/gateways/NevergreenGateway', {
    './Gateway': {send: gatewaySend}
  })

  describe('send', function () {

    it('should return the error message from the body on error', function () {
      gatewaySend.rejects({body: {errorMessage: 'some-error'}})
      return send().catch((actual) => {
        expect(actual).to.have.property('message', 'some-error')
      })
    })

    it('should return the body if it does not contain an error message on error', function () {
      gatewaySend.rejects({body: 'timeout'})
      return send().catch((actual) => {
        expect(actual).to.have.property('message', 'timeout')
      })
    })

    it('should return the given status on error', function () {
      gatewaySend.rejects({status: 500})
      return send().catch((actual) => {
        expect(actual).to.have.property('status', 500)
      })
    })
  })
})
