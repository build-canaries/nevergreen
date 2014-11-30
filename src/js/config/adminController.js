var $ = require('jquery')

module.exports = {

    getProjects: function (config, handler, showSpinner) {
        var settings = config.load()
        showSpinner(true)
        var jqxhr = $.getJSON('/api/projects', {url: settings.cctray}, handler)
        jqxhr.complete(function () {
            showSpinner(false)
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

    saveAllProjects: function (projects) {
        localStorage.setItem('allProjects', projects)
    }

}