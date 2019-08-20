import localforage from 'localforage'
import {toPairs} from 'lodash'

export async function init() {
  localforage.config({name: 'nevergreen', storeName: 'nevergreen'})
  return localforage.ready()
}

export async function save(data: object) {
  return Promise.all(toPairs(data).map((pair) => {
    return localforage.setItem(pair[0], pair[1])
  }))
}

export async function load(): Promise<object> {
  const configuration: { [key: string]: unknown } = {}
  await localforage.iterate((value, key) => {
    configuration[key] = value
  })
  return configuration
}

export async function clear() {
  return localforage.clear()
}
