import {fakeResponse, post} from './Gateway'
import {keyIn} from '../common/Utils'
import {List, Map} from 'immutable'

const KEYS_TO_SEND = keyIn('trayId', 'url', 'username', 'password', 'serverType')

function hasIncludedProjects(tray) {
  return tray.get('included').count() > 0
}

export function fetchAll(trays) {
  const data = trays
    .map((tray) => Map(tray)
      .filter(KEYS_TO_SEND))

  return post('/api/projects/all', data)
}

export function interesting(trays, selected) {
  const data = trays
    .map((tray) => Map(tray)
      .filter(KEYS_TO_SEND)
      .set('included', selected.get(tray.get('trayId'))))
    .filter(hasIncludedProjects)

  return data.count() === 0
    ? fakeResponse(List())
    : post('/api/projects/interesting', data)
}
