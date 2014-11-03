describe("Configurable build monitor", function () {
    var config = new Config()

    it("gets the projects using the api", function () {
        var projectNames = ["proj-1", "proj-2"]
        spyOn($, "getJSON").andCallFake(function (_) {
            return $.Deferred().resolve(projectNames).promise()
        })
        spyOn(config, "load").andReturn({cctray: "some-url"})
        var callbackFunction = function (data) {
        }

        var projects = new AdminController(config).getProjects(callbackFunction)

        expect($.getJSON).toHaveBeenCalledWith("/api/projects", {url: "some-url"}, callbackFunction)
    })

})

describe("View", function () {
    var config = new Config()

    beforeEach(function () {
        $("body").append('<div id="projects"/>')
    })

    it("clears projects", function () {
        $("#projects").append('some text')

        new AdminController(config).clearProjects()

        expect($("#projects").is(':empty')).toBeTruthy()
    })

    it("prints a list of project names to the dom", function () {
        new AdminController(config).appendProjects([
            {"name": "foo"},
            {"name": "bar"}
        ])

        expect($("#projects ul li").size()).toBe(2)

        $("#projects").remove()
    })

    it("project gets class added on click", function () {
        new AdminController(config).appendProjects([
            {"name": "foo"},
            {"name": "bar"}
        ])
        var project = $('#projects ul li:first');
        expect(project.hasClass('included')).toBeTruthy()
        expect(project.hasClass('no-text-selection')).toBeTruthy()

        project.click()

        expect(project.hasClass('included')).toBeFalsy()
    })
})
