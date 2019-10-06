import {fakeRequest, send, TIMEOUT_ERROR, UNKNOWN_ERROR,
  post, put, patch, get} from '../../../src/client/gateways/Gateway'
import {Request} from 'superagent'

describe('Gateway', () => {
  const url = "http://dummy-server.com/order";
  const body = {orderId: 1};
  const responseTimeOut = 30000;
  const timeOut = 60000;

  describe('request types', () => {
    describe('post', () => {
      const request = post(url, body) as any;

      expect(request.url).toEqual(url)
      expect(request.method).toEqual("POST")
      expect(request._data).toEqual(body)
      expect(request.header['Accept']).toEqual("application/json; charset=utf-8")
      expect(request.header['Content-Type']).toEqual("application/json; charset=utf-8")
      expect(request._responseTimeout).toEqual(responseTimeOut)
      expect(request._timeout).toEqual(timeOut)
      expect(request._maxRetries).toEqual(1)
    });

    describe('put', () => {
      const request = put(url, body) as any;

      expect(request.url).toEqual(url)
      expect(request.method).toEqual("PUT")
      expect(request._data).toEqual(body)
      expect(request.header['Accept']).toEqual("application/json; charset=utf-8")
      expect(request.header['Content-Type']).toEqual("application/json; charset=utf-8")
      expect(request._responseTimeout).toEqual(responseTimeOut)
      expect(request._timeout).toEqual(timeOut)
      expect(request._maxRetries).toEqual(1)
    });

    describe('patch', () => {
      const request = patch(url, body) as any;

      expect(request.url).toEqual(url)
      expect(request.method).toEqual("PATCH")
      expect(request._data).toEqual(body)
      expect(request.header['Accept']).toEqual("application/json; charset=utf-8")
      expect(request.header['Content-Type']).toEqual("application/json; charset=utf-8")
      expect(request._responseTimeout).toEqual(responseTimeOut)
      expect(request._timeout).toEqual(timeOut)
      expect(request._maxRetries).toEqual(1)
    });

    describe('get', () => {
      const request = get(url, body) as any;

      expect(request.url).toEqual(url)
      expect(request.method).toEqual("GET")
      expect(request.header['Accept']).toEqual("application/json; charset=utf-8")
      expect(request._responseTimeout).toEqual(responseTimeOut)
      expect(request._timeout).toEqual(timeOut)
      expect(request._maxRetries).toEqual(1)
    });
  })

  describe('send', () => {

    test('should return the response body if it exists', async () => {
      const request = Promise.resolve({body: {foo: 'bar'}}) as Request
      const actual = await send(request)
      expect(actual).toEqual({foo: 'bar'})
    })

    test('should return the response text if no body exists (this will be the case for plain/text)', async () => {
      const request = Promise.resolve({text: 'some-text'}) as Request
      const actual = await send(request)
      expect(actual).toEqual('some-text')
    })

    test('should throw the body on error', async () => {
      const request = Promise.reject({response: {body: {errorMessage: 'some-error'}}}) as Request
      try {
        await send(request)
      } catch (err) {
        expect(err).toHaveProperty('message', 'some-error')
      }
    })

    test('should throw the message on error if no body exists', async () => {
      const request = Promise.reject({message: 'some-error'}) as Request
      try {
        await send(request)
      } catch (err) {
        expect(err).toHaveProperty('message', 'some-error')
      }
    })

    test('should throw body as unknown if no response or message exists', async () => {
      const request = Promise.reject({}) as Request
      try {
        await send(request)
      } catch (err) {
        expect(err).toHaveProperty('message', UNKNOWN_ERROR)
      }
    })

    test('should throw the body on error as timeout when the request times out', async () => {
      const request = Promise.reject({timeout: true}) as Request
      try {
        await send(request)
      } catch (err) {
        expect(err).toHaveProperty('message', TIMEOUT_ERROR)
      }
    })
  })

  describe('fakeResponse', () => {

    test('should return a plain JS object as this is what superagent returns', async () => {
        const response = await fakeRequest('whatever')
        expect(response).toBeInstanceOf(Object)
      }
    )

    test('should return the given body', async () => {
      const response = await fakeRequest('whatever')
      expect(response).toHaveProperty('body', 'whatever')
    })
  })
})
