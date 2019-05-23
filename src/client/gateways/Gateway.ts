import request, {Request} from 'superagent'
import * as log from '../common/Logger'
import _ from 'lodash'

type ApiData = object | string

const THIRTY_SECONDS = 1000 * 30
const ONE_MINUTES = 1000 * 60 * 60
const TIMEOUT = {
  response: THIRTY_SECONDS,
  deadline: ONE_MINUTES
}
const RETRIES = 1
const ACCEPT_HEADER = 'application/json; charset=utf-8'
const CONTENT_TYPE = 'application/json; charset=utf-8'

export const UNKNOWN_ERROR = 'Unknown error'
export const TIMEOUT_ERROR = 'Connection timeout calling the Nevergreen server'

export function post(url: string, data: ApiData, headers = {}) {
  return request
    .post(url)
    .send(data)
    .accept(ACCEPT_HEADER)
    .type(CONTENT_TYPE)
    .set(headers)
    .timeout(TIMEOUT)
    .retry(RETRIES)
}

export function put(url: string, data: ApiData, headers = {}) {
  return request
    .put(url)
    .send(data)
    .accept(ACCEPT_HEADER)
    .type(CONTENT_TYPE)
    .set(headers)
    .timeout(TIMEOUT)
    .retry(RETRIES)
}

export function patch(url: string, data: ApiData, headers = {}) {
  return request
    .patch(url)
    .send(data)
    .accept(ACCEPT_HEADER)
    .type(CONTENT_TYPE)
    .set(headers)
    .timeout(TIMEOUT)
    .retry(RETRIES)
}

export function get(url: string, headers = {}) {
  return request
    .get(url)
    .accept(ACCEPT_HEADER)
    .set(headers)
    .timeout(TIMEOUT)
    .retry(RETRIES)
}

export async function send<T>(request: Request): Promise<T> {
  try {
    const res = await request
    return res.body || res.text
  } catch (error) {
    const url = error.url || 'unknown'

    log.error(`An exception was thrown when calling URL '${url}'`, error)

    const message = error.timeout
      ? TIMEOUT_ERROR
      : _.get(error, 'response.body.errorMessage') || error.message || UNKNOWN_ERROR

    throw new Error(message)
  }
}

export function fakeRequest(body: string | object) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return {body, abort: _.noop} as any as Request
}
