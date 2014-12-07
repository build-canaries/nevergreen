var $ = require('jquery')

module.exports = {

    getProjects: function (config, handler, showSpinner, hideSpinner, errorHandler) {
        var settings = config.load()

        $.ajax({
            type: 'GET',
            url: '/api/projects',
            timeout: 15000,
            data: {url: settings.cctray}, dataType: "json",
            beforeSend: function() { showSpinner() },
            complete: function () { hideSpinner() },
            success: function(response) {
                localStorage.serverType = response.server
                handler(response.projects) },
            error: function (xhr, ajaxOptions, thrownError) {
                errorHandler(xhr.status, thrownError)
            }
        })
    },

    clearProjects: function () {
        $('#projects').empty()
    },

    saveIncludedProjects: function (includedProjects) {
        localStorage.setItem('includedProjects', includedProjects)
    },

    saveSuccessText: function (successText) {
        localStorage.setItem('successText', successText)
    },

    saveSeenProjects: function (projects) {
        localStorage.setItem('seenProjects', projects)
    }

}