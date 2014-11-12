describe("view logic", function () {

    var adminController = {saveIncludedProjects: null}

    beforeEach(function () {
        $("body").empty()
        $("body").append('<div id="projects"/>')
    })

    it("adds click listener to page", function () {
        localStorage.setItem("includedProjects", ["foo", "bar"])
        localStorage.setItem("cctray", "some-url")
        spyOn(adminController, "saveIncludedProjects")
        $("body").append("<input id='save-projects'/>")

        $("body").append('<div id="projects"><ul>' +
            '<li class="included">proj-1</li>' +
            '<li class="included">proj-2</li>' +
            '<li>proj-3</li>' +
            '</ul></div>')

        new AdminView(adminController).init()
        $("#save-projects").click()

        expect(adminController.saveIncludedProjects).toHaveBeenCalledWith(["proj-1", "proj-2"])
    })

    it("prints a list of project names to the dom", function () {
        new AdminView(adminController).appendProjects([
            {"name": "foo"},
            {"name": "bar"}
        ])

        expect($("#projects ul li").size()).toBe(2)

        $("#projects").remove()
    })

    it("project gets classes added on click", function () {
        new AdminView(adminController).appendProjects([
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
