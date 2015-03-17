var $ = require('jquery')
var repo = require('../storage/repository')
var trackingRepository = require('../storage/trackingRepository')(repo)

module.exports = {
    fetchAll: function (tray, successCallback, errorCallback) {
        $.ajax({
            type: 'GET',
            url: '/api/projects',
            timeout: 15000,
            data: {
                url: tray.url
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
            data: toPayload(trackingRepository),
            dataType: "json",
            success: successCallback,
            error: errorCallback
        })
    }
}

function toPayload(trackingRepository) {
    var options = function () {
        if (trackingRepository.getUsername() && trackingRepository.getPassword()) {
            return {
                username: trackingRepository.getUsername(),
                password: trackingRepository.getPassword()
            }
        }
    }

    var defaults = {
        cctray: trackingRepository.getCctray(),
        includedProjects: trackingRepository.getIncludedProjects(),
        serverType: trackingRepository.getServerType()
    }

    return $.extend({}, defaults, options())
}