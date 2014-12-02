var $ = require('jquery')

module.exports = {

    getProjects: function (config, handler, showSpinner, hideSpinner, errorHandler) {
        var settings = config.load()
        showSpinner()
        var jqxhr = $.getJSON('/api/projects', {url: settings.cctray}, handler)
        jqxhr.complete(function () {
            hideSpinner()
        })
        jqxhr.error(function (xhr, ajaxOptions, thrownError) {
            errorHandler(xhr.status, thrownError)
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