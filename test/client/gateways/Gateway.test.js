import {
  abortPendingRequest,
  fakeResponse,
  send,
  TIMEOUT_ERROR,
  UNKNOWN_ERROR
} from '../../../src/client/gateways/Gateway'
import {Map} from 'immutable'

describe('Gateway', () => {

  describe('send', () => {

    test('should return the response body as an immutable object', async () => {
      const request = Promise.resolve({body: {foo: 'bar'}})
      const actual = await send(request)
      expect(actual).toEqual(Map({foo: 'bar'}))
    })

    test('should return the response text if no body exists (this will be the case for plain/text)', async () => {
      const request = Promise.resolve({text: 'some-text'})
      const actual = await send(request)
      expect(actual).toEqual('some-text')
    })

    test('should throw the status on error', async () => {
      const request = Promise.reject({status: 500})
      try {
        await send(request)
      } catch (err) {
        expect(err).toHaveProperty('status', 500)
      }
    })

    test('should throw the status on error set to 0 if it does not exist in the response', async () => {
      const request = Promise.reject({})
      try {
        await send(request)
      } catch (err) {
        expect(err).toHaveProperty('status', 0)
      }
    })

    test('should throw the body on error', async () => {
      const request = Promise.reject({response: {body: 'some-body'}})
      try {
        await send(request)
      } catch (err) {
        expect(err).toHaveProperty('body', 'some-body')
      }
    })

    test('should throw the message on error if no body exists', async () => {
      const request = Promise.reject({message: 'some-error'})
      try {
        await send(request)
      } catch (err) {
        expect(err).toHaveProperty('body', 'some-error')
      }
    })

    test('should throw body as unknown if no response or message exists', async () => {
      const request = Promise.reject({})
      try {
        await send(request)
      } catch (err) {
        expect(err.body).toEqual(UNKNOWN_ERROR)
      }
    })

    test('should throw the body on error as timeout when the request times out', async () => {
      const request = Promise.reject({timeout: true})
      try {
        await send(request)
      } catch (err) {
        expect(err).toHaveProperty('body', TIMEOUT_ERROR)
      }
    })
  })

  describe('fakeResponse', () => {

    test('should return a plain JS object as this is what superagent returns', async () => {
        const response = await fakeResponse('whatever')
        expect(response).toBeInstanceOf(Object)
      }
    )

    test('should return the given body', async () => {
      const response = await fakeResponse('whatever')
      expect(response).toHaveProperty('body', 'whatever')
    })
  })

  describe('abortPendingRequest', () => {

    test('should abort a superagent request', () => {
      const abort = jest.fn()
      abortPendingRequest({abort})
      expect(abort).toBeCalled()
    })

    test('should not error if given something that is not a superagent request', () => {
        [null, undefined, 'a-string', {}, true, false].forEach((val) => {
          abortPendingRequest(val)
        })
      }
    )
  })
})
