import localforage from 'localforage'
import Promise from 'promise'
import _ from 'lodash'

module.exports = {
  init() {
    localforage.config({
      name: 'nevergreen',
      storeName: 'nevergreen'
    })
  },

  save(dataObject) {
    return Promise.all(_.toPairs(dataObject).map((pair) => {
      return localforage.setItem(pair[0], pair[1])
    }))
  },

  getConfiguration() {
    let configuration = {}
    return localforage.iterate((value, key) => {
      configuration[key] = value
    }).then(() => {
      return configuration
    })
  },

  getItem(key) {
    return localforage.getItem(key)
  },

  setItem(key, value) {
    return localforage.setItem(key, value)
  },

  removeItem(key) {
    return localforage.removeItem(key)
  }
}
