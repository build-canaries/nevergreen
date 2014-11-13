function AdminView(controller) {
    var config = new Config();

    this.init = function () {
        load()
        $("#cctray-save").click(saveCctray)
        $("#save-projects").click(saveProjects)
        $("#include-all").click(includeAll)
    }

    function appendProjects(projects) {
        $("#projects").append("<ul />")
        projects.forEach(function (project) {
            $("#projects ul").append("<li class='included no-text-selection'>" + project.name + "</li>")
        })
        $("#projects ul li").click(function () {
            $(this).toggleClass("included")
        })
    }

    this.appendProjects = appendProjects

    function load() {
        var settings = config.load()
        $("#cctray-url").val(settings.cctray)
    }

    function saveCctray() {
        config.save({cctray: $("#cctray-url").val()})
        controller.getProjects(appendProjects)
    }

    function saveProjects() {
        var includedProjects = $("#projects ul li.included").map(function(index, element){return element.textContent}).toArray()
        controller.saveIncludedProjects(includedProjects)
        window.location.replace("/")
    }

    function includeAll() {
        $("#projects ul li").addClass("included")
    }
}