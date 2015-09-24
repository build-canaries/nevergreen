var Promise = require('promise')

if (!window.fetch) {
  window.fetch = require('whatwg-fetch')
}

var processStatus = function (response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject({
      status: response.status,
      responseText: response.statusText
    })
  }
}

module.exports = {
  post: function (url, data) {
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(processStatus).then(function (response) {
      return response.json()
    })
  },

  get: function (url) {
    return fetch(url, {
      headers: {
        Accept: 'application/json; charset=utf-8'
      }
    }).then(processStatus).then(function (response) {
      return response.json()
    })
  }
}
