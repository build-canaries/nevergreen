var _ = require('lodash')
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

    interesting: function (trays) {
        var data = _.map(trays, function (tray) {
            return {
                tray: tray.id,
                url: tray.url,
                username: tray.username,
                password: tray.password,
                included: tray.includedProjects,
                serverType: tray.serverType
            }
        })

        return gateway.post('/api/projects/interesting', data)
    }
}
