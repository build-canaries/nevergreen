var $ = require('jquery')
var trackingRepository = require('../storage/trackingRepository')

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

    fetchInteresting: function (successCallback, errorCallback) {
        var trays = trackingRepository.getTrays()
        var tray = trackingRepository.getTray(trays[0]) // Hardcoded assuming a single tray for now

        $.ajax({
            type: 'POST',
            url: '/api/projects',
            timeout: 15000,
            data: {
                cctray: tray.url,
                username: tray.username,
                password: tray.password,
                includedProjects: tray.includedProjects,
                serverType: tray.serverType
            },
            dataType: 'json',
            success: successCallback,
            error: errorCallback
        })
    }
}
