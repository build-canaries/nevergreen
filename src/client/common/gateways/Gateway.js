import request from 'superagent'
import * as log from '../Logger'
import _ from 'lodash'

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
    const url = _.get(err, 'response.req.url', 'unknown')

    log.error(`An exception was thrown when calling URL '${url}'`, err)

    const status = err.status || 0
    const message = _.get(err, 'response.body.message', 'timeout')
    throw {status, message}
  })
}

export function fakeResponse(body) {
  return Promise.resolve({body})
}
