var $ = require('jquery')
var appender = require('./appender')
var styler = require('./styler')

module.exports = function (config) {
    return {
        updateBuildMonitor: function () {
            if (!config.isReady()) {
                window.location.replace('config')
                return
            }

            $.ajax({
                type: 'POST',
                url: '/api/projects',
                timeout: 15000,
                data: config.load(), dataType: "json",
                success: this.updateScreen,
                error: this.onError
            })
        },

        updateScreen: function (data) {
            appender(config, data).addProjects()
            styler.styleProjects()
        },

        onError: function(data) {
            $('#projects').text('Failed to fetch projects: ' + data.status + ' ' + data.statusText)
        }
    }
}
