import gateway from './gateway'

module.exports = {
  fetchAll(trays) {
    const data = trays.map((tray) => {
      return {
        url: tray.url,
        username: tray.username,
        password: tray.password,
        serverType: tray.serverType
      }
    })

    return gateway.post('/api/projects/all', data)
  },

  interesting(trays, selected) {
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

    return gateway.post('/api/projects/interesting', data)
  }
}
