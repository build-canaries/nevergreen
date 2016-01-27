const Promise = require('promise')

const processStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return response.text().then(body => {
      return Promise.reject({
        status: response.status,
        message: body
      })
    })
  }
}

module.exports = {
  post(url, data) {
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json; charset=utf-8',
        'Content-Type': 'application/json; charset=utf-8'
      }
    }).then(processStatus).then(response => {
      return response.json()
    })
  },

  get(url) {
    return fetch(url, {
      headers: {
        Accept: 'application/json; charset=utf-8'
      }
    }).then(processStatus).then(response => {
      return response.json()
    })
  }
}
