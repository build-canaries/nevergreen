describe("view logic", function () {

    var adminController = {saveIncludedProjects: null, getProjects: function(){}}

    beforeEach(function () {
        $("body").empty()
        $("body").append('<div id="projects"/>')
        localStorage.clear()
    })

    it("adds click listener to page", function () {
        localStorage.setItem("includedProjects", ["foo", "bar"])
        localStorage.setItem("cctray", "some-url")
        spyOn(window.location, "replace")
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
        expect(window.location.replace).toHaveBeenCalledWith("/")
    })

    it("autoloads projects if cctray is available", function () {
        localStorage.setItem("cctray", "some-url")
        spyOn(adminController, "getProjects")
        var view = new AdminView(adminController)

        view.init()

        expect(adminController.getProjects).toHaveBeenCalledWith(view.appendProjects)
    })

    it("autoloads projects if cctray is available", function () {
        spyOn(adminController, "getProjects")
        var view = new AdminView(adminController)

        view.init()

        expect(adminController.getProjects).not.toHaveBeenCalled()
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
        expect(project).toHaveClass("included")
        expect(project).toHaveClass("no-text-selection")

        project.click()

        expect(project).not.toHaveClass("included")
    })

    describe("include and exclude all buttons", function () {
        beforeEach(function () {
            spyOn(window.location, "replace")
            $("body").empty()
        })

        it("includes all click will add class included to all projects", function () {
            spyOn(adminController, "saveIncludedProjects")
            $("body").append("<input id='save-projects'/>")
            $("body").append("<input id='include-all'/>")
            $("body").append('<div id="projects"><ul>' +
            '<li>proj-1</li>' +
            '<li>proj-2</li>' +
            '<li>proj-3</li>' +
            '</ul></div>')

            new AdminView(adminController).init()
            $("#include-all").click()

            expect($('#projects ul li:last')).toHaveClass("included")
        })

        it("excludes all click will remove class included from all projects", function () {
            spyOn(adminController, "saveIncludedProjects")
            $("body").append("<input id='save-projects'/>")
            $("body").append("<input id='exclude-all'/>")
            $("body").append('<div id="projects"><ul>' +
            '<li class="included">proj-1</li>' +
            '<li class="included">proj-2</li>' +
            '<li class="included">proj-3</li>' +
            '</ul></div>')

            new AdminView(adminController).init()
            $("#exclude-all").click()

            expect($('#projects ul li:first')).not.toHaveClass("included")
        })
    })

})
