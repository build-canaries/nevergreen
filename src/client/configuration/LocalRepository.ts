import localforage from 'localforage'
import {toPairs} from 'lodash'
import {State} from '../Reducer'

export type UntrustedData = { [key: string]: unknown }

export async function init() {
  localforage.config({name: 'nevergreen', storeName: 'nevergreen'})
  return localforage.ready()
}

export async function save(data: State): Promise<void> {
  return Promise.all(toPairs(data).map((pair) => {
    return localforage.setItem(pair[0], pair[1])
  })) as unknown as Promise<void>
}

export async function removeItems(keys: ReadonlyArray<string>): Promise<void> {
  return Promise.all(keys.map((key) => localforage.removeItem(key))) as unknown as Promise<void>
}

export async function load(): Promise<UntrustedData> {
  const configuration: UntrustedData = {}
  await localforage.iterate((value, key) => {
    configuration[key] = value
  })
  return configuration
}

export async function clear() {
  return localforage.clear()
}
