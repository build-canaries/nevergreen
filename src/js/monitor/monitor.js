var $ = require('jquery')
var styler = require('./styler')

module.exports = function (trackingRepository, appender) {
    return {
        init: function () {
            showConfigLinkOnMouseMove();
        },

        updateBuildMonitor: function () {
            if (!trackingRepository.isReady()) {
                window.location.replace('config')
                return
            }

            $.ajax({
                type: 'POST',
                url: '/api/projects',
                timeout: 15000,
                data: toPayload(trackingRepository),
                dataType: "json",
                success: this.updateScreen,
                error: this.onError
            })
        },

        updateScreen: function (data) {
            appender.addProjects(data)
            styler.styleProjects()
        },

        onError: function (data) {
            $('#projects').text('Failed to fetch projects: ' + data.status + ' ' + data.statusText)
        }
    }
}

function toPayload(trackingRepository) {
    return {
        cctray: trackingRepository.getCctray(),
        includedProjects: trackingRepository.getIncludedProjects(),
        serverType: trackingRepository.getServerType()
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