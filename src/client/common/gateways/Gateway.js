import Promise from 'promise'

const ACCEPT_HEADER = 'application/json; charset=utf-8'

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
  return fetch(url, {
    method: 'post',
    body: JSON.stringify(data),
    headers: {
      Accept: ACCEPT_HEADER,
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
    .catch(timeoutError)
    .then(processStatus)
    .then((response) => response.json())
}

export function get(url) {
  return fetch(url, {headers: {Accept: ACCEPT_HEADER}})
    .catch(timeoutError)
    .then(processStatus)
    .then((response) => response.json())
}
