function AdminController(config) {

    this.getProjects = function (handler) {
        var settings = config.load()

        $.getJSON("/api/projects", {url: settings.cctray}, handler)
    }

    this.appendProjects = function(projects) {
        $("#projects").append("<ul />")
        projects.forEach(function(project){
            $("#projects ul").append("<li>" + project.name + "</li>")
        })
    }

}