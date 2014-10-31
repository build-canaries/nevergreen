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

    it("prints a list of project names to the dom", function () {
        $("body").append('<div id="projects"/>')

        new AdminController(config).appendProjects([{"name": "foo"}, {"name": "bar"}])

        expect($("#projects ul li").size()).toBe(2)

        $("#projects").remove()
    })
})
