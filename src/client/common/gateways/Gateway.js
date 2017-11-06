import request from 'superagent'
import * as log from '../Logger'
import _get from 'lodash/get'

const THIRTY_SECONDS = 1000 * 30
const THREE_MINUTES = 1000 * 60 * 60 * 3
const TIMEOUT = {
  response: THIRTY_SECONDS,
  deadline: THREE_MINUTES
}
const ACCEPT_HEADER = 'application/json; charset=utf-8'

export function post(url, data, headers = {}) {
  return request
    .post(url)
    .send(data)
    .accept(ACCEPT_HEADER)
    .type('application/json; charset=utf-8')
    .set(headers)
    .timeout(TIMEOUT)
}

export function patch(url, data, headers = {}) {
  return request
    .patch(url)
    .send(data)
    .accept(ACCEPT_HEADER)
    .type('application/json; charset=utf-8')
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

export function send(request) {
  return request.then((res) => {
    return res.body || res.text
  }).catch((err) => {
    log.error('An unhandled exception was thrown from the server', err)
    const status = err.status || 0
    const message = _get(err, 'response.body.error', 'timeout')
    throw {status, message}
  })
}

export function fakeResponse(body) {
  return Promise.resolve({body})
}
