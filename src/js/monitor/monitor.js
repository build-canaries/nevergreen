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

            $.post('/api/projects', config.load(), this.updateScreen, 'json')
        },

        updateScreen: function (data) {
            appender(config, data).addProjects()
            styler.styleProjects()
        }
    }
}
