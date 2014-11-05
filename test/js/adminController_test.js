describe("Configurable build monitor", function () {
    var config = new Config()

    it("gets the projects using the api", function () {
        var projectNames = ["proj-1", "proj-2"]
        spyOn($, "getJSON").and.callFake(function (_) {
            return $.Deferred().resolve(projectNames).promise()
        })
        spyOn(config, "load").and.returnValue({cctray: "some-url"})
        var callbackFunction = function (data) {
        }

        var projects = new AdminController(config).getProjects(callbackFunction)

        expect($.getJSON).toHaveBeenCalledWith("/api/projects", {url: "some-url"}, callbackFunction)
    })

    it("saves the included projects to local storage", function () {
        spyOn(localStorage, "setItem")
        $("body").append('<div id="projects"><ul>' +
            '<li class="included">proj-1</li>' +
            '<li class="included">proj-2</li>' +
            '<li>proj-3</li>' +
            '</ul></div>')

        var projects = new AdminController(config).saveIncludedProjects()

        expect(localStorage.setItem).toHaveBeenCalledWith("includedProjects", ["proj-1", "proj-2"])
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

        expect($("#projects")).toBeEmpty()
    })

    it("prints a list of project names to the dom", function () {
        new AdminController(config).appendProjects([
            {"name": "foo"},
            {"name": "bar"}
        ])

        expect($("#projects ul li").size()).toBe(2)

        $("#projects").remove()
    })

    it("project gets classes added on click", function () {
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
