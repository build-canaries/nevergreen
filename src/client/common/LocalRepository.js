import localforage from 'localforage'
import _ from 'lodash'

export async function init() {
  localforage.config({name: 'nevergreen', storeName: 'nevergreen'})
  return localforage.ready()
}

export async function save(data) {
  return Promise.all(_.toPairs(data).map((pair) => {
    return localforage.setItem(pair[0], pair[1])
  }))
}

export async function load() {
  let configuration = {}
  await localforage.iterate((value, key) => {
    configuration[key] = value
  })
  return configuration
}

export async function clear() {
  return localforage.clear()
}
