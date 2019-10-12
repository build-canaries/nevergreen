import {fakeRequest, send, TIMEOUT_ERROR, UNKNOWN_ERROR,
  post, put, patch, get} from '../../../src/client/gateways/Gateway'
import {Request, SuperAgentRequest} from 'superagent'

describe('Gateway', () => {
  const url = "http://dummy-server.com/order";
  const body = {orderId: 1};

  describe('request types', () => {
    describe('post', () => {
      const request = post(url, body) as SuperAgentRequest;

      expect(request.url).toEqual(url)
      expect(request.method).toEqual("POST")
      expect(request.get('Accept')).toEqual("application/json; charset=utf-8")
      expect(request.get('Content-Type')).toEqual("application/json; charset=utf-8")
    });

    describe('put', () => {
      const request = put(url, body) as SuperAgentRequest;

      expect(request.url).toEqual(url)
      expect(request.method).toEqual("PUT")
      expect(request.get('Accept')).toEqual("application/json; charset=utf-8")
      expect(request.get('Content-Type')).toEqual("application/json; charset=utf-8")
    });

    describe('patch', () => {
      const request = patch(url, body) as SuperAgentRequest;

      expect(request.url).toEqual(url)
      expect(request.method).toEqual("PATCH")
      expect(request.get('Accept')).toEqual("application/json; charset=utf-8")
      expect(request.get('Content-Type')).toEqual("application/json; charset=utf-8")
    });

    describe('get', () => {
      const request = get(url, body) as SuperAgentRequest;

      expect(request.url).toEqual(url)
      expect(request.method).toEqual("GET")
      expect(request.get('Accept')).toEqual("application/json; charset=utf-8")
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
