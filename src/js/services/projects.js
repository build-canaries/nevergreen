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
                password: tray.password
            },
            dataType: "json",
            success: successCallback,
            error: errorCallback
        })
    },

    fetchInteresting: function (successCallback, errorCallback) {
        $.ajax({
            type: 'POST',
            url: '/api/projects',
            timeout: 15000,
            data: {
                cctray: trackingRepository.getCctray(),
                username: trackingRepository.getUsername(),
                password: trackingRepository.getPassword(),
                includedProjects: trackingRepository.getIncludedProjects(),
                serverType: trackingRepository.getServerType()
            },
            dataType: "json",
            success: successCallback,
            error: errorCallback
        })
    }
}
