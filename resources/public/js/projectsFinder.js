function ProjectsFinder(config) {

    this.getProjects = function (handler) {
        var settings = config.load()

        $.get("/api/projects", {url: settings.cctray}, handler)
    }


}