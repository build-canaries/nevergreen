var $ = require('jquery')

module.exports = {
    showSpinner: function () {
        $('#projects').empty()
        $('#spinner').show()
    },

    hideSpinner: function () {
        $('#spinner').hide()
    },

    errorHandler: function (reason) {
        var $projects = $('#projects');
        $projects.empty()
        $projects.append('<h1 class="config-error">Cannot find projects because the remote server returned a ' + reason + '</h1>')
    }
}
