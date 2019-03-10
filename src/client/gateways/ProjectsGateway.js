import {fakeResponse, post} from './Gateway'
import {keyIn} from '../common/Utils'
import {List, Map} from 'immutable'

const KEYS_TO_SEND = keyIn('trayId', 'url', 'username', 'password', 'serverType', 'includeNew')

function hasIncludedProjects(tray) {
  return tray.get('includeNew') || tray.get('included').count() > 0
}

export function fetchAll(trays, seen) {
  const data = trays
    .map((tray) => Map(tray)
      .filter(KEYS_TO_SEND)
      .set('seen', seen.get(tray.get('trayId'))))

  return post('/api/projects/all', data)
}

export function interesting(trays, selected, seen) {
  const data = trays
    .map((tray) => Map(tray)
      .filter(KEYS_TO_SEND)
      .set('included', selected.get(tray.get('trayId')))
      .set('seen', seen.get(tray.get('trayId'))))
    .filter(hasIncludedProjects)

  return data.count() === 0
    ? fakeResponse(List())
    : post('/api/projects/interesting', data)
}
