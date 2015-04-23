var $ = require('jquery')
var _ = require('lodash')

module.exports = {
    fetchAll: function (tray, successCallback, errorCallback) {
        $.ajax({
            type: 'GET',
            url: '/api/projects',
            timeout: 15000,
            data: {
                url: tray.url,
                username: tray.username,
                password: tray.password,
                serverType: tray.serverType
            },
            dataType: 'json',
            success: successCallback,
            error: errorCallback
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
            contentType: 'application/json'
        })
    }
}
