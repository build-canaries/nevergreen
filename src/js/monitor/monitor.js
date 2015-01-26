var $ = require('jquery')
var appender = require('./appender')
var styler = require('./styler')

module.exports = function (storageRepository) {
    return {
        init: function () {
            showConfigLinkOnMouseMove();
        },

        updateBuildMonitor: function () {
            if (!storageRepository.isReady()) {
                window.location.replace('config')
                return
            }

            $.ajax({
                type: 'POST',
                url: '/api/projects',
                timeout: 15000,
                data: toPayload(storageRepository),
                dataType: "json",
                success: this.updateScreen,
                error: this.onError
            })
        },

        updateScreen: function (data) {
            appender(storageRepository, data).addProjects()
            styler.styleProjects()
        },

        onError: function (data) {
            $('#projects').text('Failed to fetch projects: ' + data.status + ' ' + data.statusText)
        }
    }
}

function toPayload(storageRepository) {
    return {
        cctray: storageRepository.getCctray(),
        includedProjects: storageRepository.getIncludedProjects(),
        serverType: storageRepository.getServerType()
    }
}

function showConfigLinkOnMouseMove() {
    var inprogressTimeout = null;
    $("body").mousemove(function () {
        clearTimeout(inprogressTimeout);
        $("#config-link").fadeIn();
        inprogressTimeout = setTimeout(function () {
            $("#config-link").fadeOut()
        }, 2000);
    })
}