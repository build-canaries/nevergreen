var $ = require('jquery')

module.exports = {

    getProjects: function (config, handler, showSpinner, hideSpinner) {
        var settings = config.load()
        showSpinner()
        var jqxhr = $.getJSON('/api/projects', {url: settings.cctray}, handler)
        jqxhr.complete(function () {
            hideSpinner()
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