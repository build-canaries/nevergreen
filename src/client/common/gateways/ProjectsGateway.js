import {fakeResponse, post} from './Gateway'
import {keyIn} from '../Utils'

function hasIncludedProjects(tray) {
  return tray.get('included').count() > 0
}

export function fetchAll(trays) {
  const data = trays.map((tray) =>
    tray.filter(keyIn('trayId', 'url', 'username', 'password', 'serverType')))

  return post('/api/projects/all', data.toJS())
}

export function interesting(trays, selected) {
  const data = trays
    .map((tray) => tray
      .filter(keyIn('trayId', 'url', 'username', 'password', 'serverType'))
      .set('included', selected.get(tray.get('trayId'))))
    .filter(hasIncludedProjects)

  return data.count() === 0
    ? fakeResponse([])
    : post('/api/projects/interesting', data.toJS())
}
