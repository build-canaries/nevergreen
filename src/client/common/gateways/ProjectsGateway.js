import {fakeResponse, post} from './Gateway'
import isEmpty from 'lodash/isEmpty'

function includesProjects(tray) {
  return !isEmpty(tray.included)
}

export function fetchAll(trays) {
  const data = trays.map(({trayId, url, username, password, serverType}) => {
    return {trayId, url, username, password, serverType}
  })

  return post('/api/projects/all', data)
}

export function interesting(trays, selected) {
  const data = trays.map((tray) => {
    return {
      trayId: tray.trayId,
      url: tray.url,
      username: tray.username,
      password: tray.password,
      included: selected[tray.trayId],
      serverType: tray.serverType
    }
  }).filter(includesProjects)

  return isEmpty(data) ? fakeResponse([]) : post('/api/projects/interesting', data)
}
