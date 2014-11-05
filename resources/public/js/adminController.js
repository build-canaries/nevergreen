function AdminController(config) {

    this.getProjects = function (handler) {
        var settings = config.load()

        $.getJSON("/api/projects", {url: settings.cctray}, handler)
    }

    this.clearProjects = function () {
        $('#projects').empty()
    }

    this.appendProjects = function (projects) {
        $("#projects").append("<ul />")
        projects.forEach(function (project) {
            $("#projects ul").append("<li class='included no-text-selection'>" + project.name + "</li>")
        })
        $("#projects ul li").click(function () {
            $(this).toggleClass("included")
        })
    }

    this.saveIncludedProjects = function () {
        var includedProjects = $("#projects ul li.included").map(function(index, element){return element.textContent}).toArray()

        localStorage.setItem("includedProjects", includedProjects)
    }

}