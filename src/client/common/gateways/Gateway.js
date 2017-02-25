import request from 'superagent'

const THIRTY_SECONDS = 1000 * 30
const THREE_MINUTES = 1000 * 60 * 60 * 3
const TIMEOUT = {
  response: THIRTY_SECONDS,
  deadline: THREE_MINUTES
}
const ACCEPT_HEADER = 'application/json; charset=utf-8'

export function post(url, data) {
  return request
    .post(url)
    .send(data)
    .accept(ACCEPT_HEADER)
    .type('application/json; charset=utf-8')
    .timeout(TIMEOUT)
}

export function get(url) {
  return request
    .get(url)
    .accept(ACCEPT_HEADER)
    .timeout(TIMEOUT)
}

export function send(request) {
  return request
    .then((res) => res.body)
    .catch((err) => {
      const status = err.status || 0
      const message = (err.response && err.response.text) || 'timeout'
      throw {status, message}
    })
}
