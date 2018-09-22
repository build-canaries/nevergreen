import {withMockedImports} from '../../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../../Mocking'
import {TIMEOUT_ERROR, UNKNOWN_ERROR} from '../../../../src/client/common/gateways/Gateway'

describe('Gateway', function () {

  const {send, fakeResponse, abortPendingRequest} = withMockedImports('client/common/gateways/Gateway', {
    superagent: {}
  })

  describe('send', function () {

    it('should return the response body', async function () {
      const request = Promise.resolve({body: 'some-body'})
      const actual = await send(request)
      expect(actual).to.equal('some-body')
    })

    it('should return the response text if no body exists (this will be the case for plain/text)', async function () {
      const request = Promise.resolve({text: 'some-text'})
      const actual = await send(request)
      expect(actual).to.equal('some-text')
    })

    it('should throw the status on error', async function () {
      const request = Promise.reject({status: 500})
      try {
        await send(request)
      } catch (err) {
        expect(err).to.have.property('status', 500)
      }
    })

    it('should throw the status on error set to 0 if it does not exist in the response', async function () {
      const request = Promise.reject({})
      try {
        await send(request)
      } catch (err) {
        expect(err).to.have.property('status', 0)
      }
    })

    it('should throw the body on error', async function () {
      const request = Promise.reject({response: {body: 'some-body'}})
      try {
        await send(request)
      } catch (err) {
        expect(err).to.have.property('body', 'some-body')
      }
    })

    it('should throw the message on error if no body exists', async function () {
      const request = Promise.reject({message: 'some-error'})
      try {
        await send(request)
      } catch (err) {
        expect(err).to.have.property('body', 'some-error')
      }
    })

    it('should throw body as unknown if no response or message exists', async function () {
      const request = Promise.reject({})
      try {
        await send(request)
      } catch (err) {
        expect(err).to.have.property('body').that.equals(UNKNOWN_ERROR)
      }
    })

    it('should throw the body on error as timeout when the request times out', async function () {
      const request = Promise.reject({timeout: true})
      try {
        await send(request)
      } catch (err) {
        expect(err).to.have.property('body', TIMEOUT_ERROR)
      }
    })
  })

  describe('fakeResponse', function () {

    it('should return the given body', async function () {
      const response = await fakeResponse('whatever')
      expect(response).to.include({body: 'whatever'})
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
