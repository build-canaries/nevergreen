import localforage from 'localforage'
import {toPairs} from 'lodash'
import {State} from '../Reducer'

export type UntrustedData = { [key: string]: unknown }

export async function init(): Promise<void> {
  localforage.config({name: 'nevergreen', storeName: 'nevergreen'})
  return localforage.ready()
}

export async function save(data: State): Promise<void> {
  await Promise.all(toPairs(data).map((pair) => {
    return localforage.setItem(pair[0], pair[1])
  }))
}

export async function load(): Promise<UntrustedData> {
  const configuration: UntrustedData = {}
  await localforage.iterate((value, key) => {
    configuration[key] = value
  })
  return configuration
}

export async function clear(): Promise<void> {
  return localforage.clear()
}
