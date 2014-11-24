function AdminController(config) {

    this.getProjects = function (handler, showSpinner) {
        var settings = config.load()
        showSpinner(true)
        $.getJSON('/api/projects', {url: settings.cctray}, handler).always(showSpinner(false))
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