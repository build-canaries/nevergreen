import request from 'superagent'
import * as log from '../common/Logger'
import _ from 'lodash'
import {fromJS, isImmutable} from 'immutable'

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

export function post(url, data, headers = {}) {
  return request
    .post(url)
    .send(isImmutable(data) ? data.toJS() : data)
    .accept(ACCEPT_HEADER)
    .type(CONTENT_TYPE)
    .set(headers)
    .timeout(TIMEOUT)
    .retry(RETRIES)
}

export function put(url, data, headers = {}) {
  return request
    .put(url)
    .send(isImmutable(data) ? data.toJS() : data)
    .accept(ACCEPT_HEADER)
    .type(CONTENT_TYPE)
    .set(headers)
    .timeout(TIMEOUT)
    .retry(RETRIES)
}

export function patch(url, data, headers = {}) {
  return request
    .patch(url)
    .send(isImmutable(data) ? data.toJS() : data)
    .accept(ACCEPT_HEADER)
    .type(CONTENT_TYPE)
    .set(headers)
    .timeout(TIMEOUT)
    .retry(RETRIES)
}

export function get(url, headers = {}) {
  return request
    .get(url)
    .accept(ACCEPT_HEADER)
    .set(headers)
    .timeout(TIMEOUT)
    .retry(RETRIES)
}

export async function send(request) {
  try {
    const res = await request
    return fromJS(res.body) || res.text
  } catch (error) {
    const url = error.url || 'unknown'

    log.error(`An exception was thrown when calling URL '${url}'`, error)

    const status = error.status || 0
    const body = error.timeout
      ? TIMEOUT_ERROR
      : _.get(error, 'response.body') || error.message || UNKNOWN_ERROR

    throw new GatewayError(error.message, status, body)
  }
}

export async function fakeResponse(body) {
  return {body}
}

export function abortPendingRequest(req) {
  if (req && _.isFunction(req.abort)) {
    req.abort()
  }
}

export class GatewayError extends Error {
  constructor(message, status, body) {
    super(message)
    this.name = 'GatewayError'
    this.status = status
    this.body = fromJS(body)
  }
}
