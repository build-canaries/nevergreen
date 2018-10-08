import request from 'superagent'
import * as log from '../Logger'
import _ from 'lodash'
import {fromJS, isImmutable, Record} from 'immutable'

const THIRTY_SECONDS = 1000 * 30
const THREE_MINUTES = 1000 * 60 * 60 * 3
const TIMEOUT = {
  response: THIRTY_SECONDS,
  deadline: THREE_MINUTES
}
const ACCEPT_HEADER = 'application/json; charset=utf-8'
const CONTENT_TYPE = 'application/json; charset=utf-8'

export const UNKNOWN_ERROR = 'unknown error'
export const TIMEOUT_ERROR = 'timeout'

export function post(url, data, headers = {}) {
  return request
    .post(url)
    .send(isImmutable(data) ? data.toJS() : data)
    .accept(ACCEPT_HEADER)
    .type(CONTENT_TYPE)
    .set(headers)
    .timeout(TIMEOUT)
}

export function patch(url, data, headers = {}) {
  return request
    .patch(url)
    .send(isImmutable(data) ? data.toJS() : data)
    .accept(ACCEPT_HEADER)
    .type(CONTENT_TYPE)
    .set(headers)
    .timeout(TIMEOUT)
}

export function get(url, headers = {}) {
  return request
    .get(url)
    .accept(ACCEPT_HEADER)
    .set(headers)
    .timeout(TIMEOUT)
}

export async function send(request) {
  try {
    const res = await request
    return fromJS(res.body) || res.text
  } catch (err) {
    const url = _.get(err, 'url', 'unknown')

    log.error(`An exception was thrown when calling URL '${url}'`, err)

    const status = _.get(err, 'status') || 0
    const body = _.get(err, 'timeout')
      ? TIMEOUT_ERROR
      : _.get(err, 'response.body') || _.get(err, 'message') || UNKNOWN_ERROR

    throw new GatewayError({status, body: fromJS(body)})
  }
}

export async function fakeResponse(body) {
  return fromJS({body})
}

export function abortPendingRequest(req) {
  if (req && _.isFunction(req.abort)) {
    req.abort()
  }
}

export class GatewayError extends Record({
  status: 0,
  body: null
}) {
}
