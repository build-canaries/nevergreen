import request from 'superagent'
import Promise from 'promise'

const THIRTY_SECONDS = 1000 * 30
const THREE_MINUTES = 1000 * 60 * 60 * 3
const TIMEOUT = {
  response: THIRTY_SECONDS,
  deadline: THREE_MINUTES
}
const ACCEPT_HEADER = 'application/json; charset=utf-8'

function mapError(err) {
  return Promise.reject({status: err.status, message: err.response.text})
}

export function post(url, data) {
  return request
    .post(url)
    .send(data)
    .accept(ACCEPT_HEADER)
    .type('application/json; charset=utf-8')
    .timeout(TIMEOUT)
    .then((res) => res.body)
    .catch(mapError)
}

export function get(url) {
  return request
    .get(url)
    .accept(ACCEPT_HEADER)
    .timeout(TIMEOUT)
    .then((res) => res.body)
    .catch(mapError)
}
