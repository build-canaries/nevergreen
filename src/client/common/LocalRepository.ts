import localforage from 'localforage'
import {toPairs} from 'lodash'
import {Configuration} from '../reducers/Configuration'

export async function init() {
  localforage.config({name: 'nevergreen', storeName: 'nevergreen'})
  return localforage.ready()
}

export async function save(data: Configuration) {
  return Promise.all(toPairs(data).map((pair) => {
    return localforage.setItem(pair[0], pair[1])
  }))
}

export async function load(): Promise<object> {
  let configuration = {}
  await localforage.iterate((value, key) => {
    // @ts-ignore
    configuration[key] = value
  })
  return configuration
}

export async function clear() {
  return localforage.clear()
}
