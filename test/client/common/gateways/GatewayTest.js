import {withMockedImports} from '../../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../../Mocking'

describe('Gateway', function () {

  const {send, fakeResponse, abortPendingRequest} = withMockedImports('client/common/gateways/Gateway', {
    superagent: {}
  })

  describe('send', function () {

    it('should return the response body', function () {
      const request = Promise.resolve({body: 'some-body'})
      return send(request).then((actual) => {
        expect(actual).to.equal('some-body')
      })
    })

    it('should return the response text if no body exists (this will be the case for plain/text)', function () {
      const request = Promise.resolve({text: 'some-text'})
      return send(request).then((actual) => {
        expect(actual).to.equal('some-text')
      })
    })

    it('should throw the status on error', function () {
      const request = Promise.reject({status: 500})
      return send(request).catch((actual) => {
        expect(actual).to.have.property('status', 500)
      })
    })

    it('should throw the status on error set to 0 if it does not exist in the response', function () {
      const request = Promise.reject({})
      return send(request).catch((actual) => {
        expect(actual).to.have.property('status', 0)
      })
    })

    it('should throw the body on error', function () {
      const request = Promise.reject({response: {body: 'some-body'}})
      return send(request).catch((actual) => {
        expect(actual).to.have.property('body', 'some-body')
      })
    })

    it('should throw the body on error as empty object if no response exists', function () {
      const request = Promise.reject({})
      return send(request).catch((actual) => {
        expect(actual).to.have.property('body').that.deep.equals({})
      })
    })

    it('should throw the body on error as timeout when the request times out', function () {
      const request = Promise.reject({timeout: true})
      return send(request).catch((actual) => {
        expect(actual).to.have.property('body', 'timeout')
      })
    })
  })

  describe('fakeResponse', function () {

    it('should return a resolved promise with the given body', function () {
      const response = fakeResponse('whatever')
      expect(response).to.be.a('promise')

      return response.then((req) => {
        expect(req).to.include({body: 'whatever'})
      })
    })
  })

  describe('abortPendingRequest', function () {

    it('should abort a superagent request', function () {
      const abort = mocks.spy()
      abortPendingRequest({abort})
      expect(abort).to.have.been.called()
    })

    it('should not error if given something that is not a superagent request', function () {
      [null, undefined, 'a-string', {}, true, false].forEach((val) => {
        abortPendingRequest(val)
      })
    })
  })
})
