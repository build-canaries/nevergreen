import {post} from './Gateway'

export function fetchAll(trays) {
  const data = trays.map((tray) => {
    return {
      url: tray.url,
      username: tray.username,
      password: tray.password,
      serverType: tray.serverType
    }
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
  })

  return post('/api/projects/interesting', data)
}
