import {fakeRequest, get, post, Request, send, TIMEOUT_ERROR} from './Gateway'

const url = 'http://dummy-server.com/order'
const body = {orderId: 1}

describe('request types', () => {

  it('post', () => {
    const request = post(url, body)

    expect(request.url).toEqual(url)
    expect(request.method).toEqual('POST')
    expect(request.get('Accept')).toEqual('application/json; charset=utf-8')
    expect(request.get('Content-Type')).toEqual('application/json; charset=utf-8')
  })

  it('get', () => {
    const request = get(url, body)

    expect(request.url).toEqual(url)
    expect(request.method).toEqual('GET')
    expect(request.get('Accept')).toEqual('application/json; charset=utf-8')
  })
})

describe('send', () => {

  it('should return the response body if it exists', async () => {
    const request = Promise.resolve({body: {foo: 'bar'}}) as Request<unknown>
    const actual = await send(request)
    expect(actual).toEqual({foo: 'bar'})
  })

  it('should return the response text if no body exists (this will be the case for plain/text)', async () => {
    const request = Promise.resolve({text: 'some-text'}) as Request<unknown>
    const actual = await send(request)
    expect(actual).toEqual('some-text')
  })

  it('should throw the body on error', async () => {
    const request = Promise.reject({response: {body: {description: 'some-error'}}}) as Request<unknown>
    try {
      await send(request)
    } catch (err) {
      expect(err).toHaveProperty('message', 'some-error')
    }
  })

  it('should throw the message on error if no body exists', async () => {
    const request = Promise.reject({message: 'some-error'}) as Request<unknown>
    try {
      await send(request)
    } catch (err) {
      expect(err).toHaveProperty('message', 'some-error')
    }
  })

  it('should throw body as unknown if no response or message exists', async () => {
    const request = Promise.reject({}) as Request<unknown>
    try {
      await send(request)
    } catch (err) {
      expect(err).toHaveProperty('message', 'Unknown error')
    }
  })

  it('should throw the body on error as timeout when the request times out', async () => {
    const request = Promise.reject({timeout: true}) as Request<unknown>
    try {
      await send(request)
    } catch (err) {
      expect(err).toHaveProperty('message', TIMEOUT_ERROR)
    }
  })
})

describe('fakeRequest', () => {

  it('should return a plain JS object as this is what superagent returns', async () => {
      const response = await fakeRequest('whatever')
      expect(response).toBeInstanceOf(Object)
    }
  )

  it('should return the given body', async () => {
    const response = await fakeRequest('whatever')
    expect(response).toHaveProperty('body', 'whatever')
  })
})
