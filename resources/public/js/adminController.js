function AdminController() {

    this.getProjects = function (config, handler, showSpinner) {
        var settings = config.load()
        showSpinner(true)
        var jqxhr= $.getJSON('/api/projects', {url: settings.cctray}, handler)
        jqxhr.complete(function() {
            showSpinner(false)
        })
    }

    this.clearProjects = function () {
        $('#projects').empty()
    }

    this.saveIncludedProjects = function (includedProjects) {
        localStorage.setItem('includedProjects', includedProjects)
    }

    this.saveSuccessText = function(successText) {
        localStorage.setItem('successText', successText)
    }

}

module.exports = AdminController