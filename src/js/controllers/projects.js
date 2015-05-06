var $ = require('jquery')
var _ = require('lodash')

function postJson(url, data) {
    return $.ajax({
        type: 'POST',
        url: url,
        timeout: 15000,
        data: JSON.stringify(data),
        headers: {
            Accept: 'application/json; charset=utf-8',
            'Content-Type': 'application/json; charset=utf-8'
        },
        dataFilter: function (data) {
            return JSON.parse(data)
        }
    })
}

module.exports = {
    fetchAll: function (tray) {
        var data = {
            url: tray.url,
            username: tray.username,
            password: tray.password,
            serverType: tray.serverType
        }

        return postJson('/api/projects/all', data)
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

        return postJson('/api/projects/interesting', data)
    }
}
