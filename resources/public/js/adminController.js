function AdminController(config) {

    this.getProjects = function (handler) {
        var settings = config.load()

        $.getJSON("/api/projects", {url: settings.cctray}, handler)
    }

    this.clearProjects = function () {
        $('#projects').empty()
    }

    this.saveIncludedProjects = function (includedProjects) {
        localStorage.setItem("includedProjects", includedProjects)
    }

    this.saveSuccessText = function(successText) {
        localStorage.setItem("successText", successText)
    }

}