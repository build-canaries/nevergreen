var $ = require('jquery')
var _ = require('lodash')

module.exports = {
    fetchAll: function (tray) {
        var data = {
            url: tray.url,
            username: tray.username,
            password: tray.password,
            serverType: tray.serverType
        }

        return $.ajax({
            type: 'GET',
            url: '/api/projects',
            timeout: 15000,
            data: data,
            accepts: 'application/json',
            dataFilter: function (data) {
                return JSON.parse(data)
            }
        })
    },

    interesting: function (trays) {
        var data = _.map(trays, function (tray) {
            return {
                url: tray.url,
                username: tray.username,
                password: tray.password,
                included: tray.includedProjects,
                serverType: tray.serverType
            }
        })

        return $.ajax({
            type: 'POST',
            url: '/api/projects/interesting',
            timeout: 15000,
            data: JSON.stringify(data),
            accepts: 'application/json',
            contentType: 'application/json',
            dataFilter: function (data) {
                return JSON.parse(data)
            }
        })
    }
}
