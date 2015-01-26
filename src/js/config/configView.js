var $ = require('jquery')

module.exports = {
    showSpinner: function () {
        $('#loading-modal').addClass('loading')
        $('#spinner').show()
    },

    hideSpinner: function () {
        $('#loading-modal').removeClass('loading')
        $('#spinner').hide()
    },

    errorHandler: function (code, reason) {
        var $projects = $('#projects');
        $projects.empty()
        $projects.append('<h1 class="config-error">Cannot find projects because<br />' + code + ': ' + reason + '</h1>')
    }
}
