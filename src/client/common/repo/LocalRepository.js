import localforage from 'localforage'
import _ from 'lodash'

export default {
  init() {
    localforage.config({name: 'nevergreen', storeName: 'nevergreen'})
    return localforage.ready()
  },

  save(data) {
    return Promise.all(_.toPairs(data).map((pair) => {
      return localforage.setItem(pair[0], pair[1])
    }))
  },

  load() {
    let configuration = {}
    return localforage.iterate((value, key) => {
      configuration[key] = value
    }).then(() => {
      return configuration
    })
  },

  clear() {
    return localforage.clear()
  }
}
