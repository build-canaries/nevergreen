var gateway = require('../gateways/gateway')

module.exports = {
  fetchAll: function (tray) {
    var data = {
      url: tray.url,
      username: tray.username,
      password: tray.password,
      serverType: tray.serverType
    }

    return gateway.post('/api/projects/all', data)
  },

  interesting: function (trays, selected) {
    var data = trays.map(function (tray) {
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
