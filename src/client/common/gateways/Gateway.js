import Promise from 'promise'
import {toJson} from '../Json'

const THREE_MINUTES = 1000 * 60 * 60 * 3
const ACCEPT_HEADER = 'application/json; charset=utf-8'

function withTimeout(promise) {
  return Promise.race([promise, new Promise((_, reject) => setTimeout(reject, THREE_MINUTES))])
}

function timeoutError() {
  return Promise.reject({
    status: 0,
    message: 'Connection timeout'
  })
}

function processStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return response.text().then((body) => {
      return Promise.reject({
        status: response.status,
        message: body
      })
    })
  }
}

export function post(url, data) {
  return withTimeout(fetch(url, {
    method: 'post',
    body: toJson(data),
    headers: {
      Accept: ACCEPT_HEADER,
      'Content-Type': 'application/json; charset=utf-8'
    }
  })).catch(timeoutError)
    .then(processStatus)
    .then((response) => response.json())
}

export function get(url) {
  return withTimeout(fetch(url, {headers: {Accept: ACCEPT_HEADER}}))
    .catch(timeoutError)
    .then(processStatus)
    .then((response) => response.json())
}
