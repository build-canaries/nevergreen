describe("view logic", function () {

    var adminController = { saveIncludedProjects: function(){}, 
                            getProjects: function(){},
                            saveSuccessText: function(){}}

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

    it("does not load projects if cctray is unavailable", function () {
        spyOn(adminController, "getProjects")
        var view = new AdminView(adminController)

        view.init()

        expect(adminController.getProjects).not.toHaveBeenCalled()
    })

    describe("success text", function() {
      
        beforeEach(function() {
            $("body").append("<form>" +
               "<input id='success-text' type=text name=success-text/>" +
               "<input id='save-projects' class=button type=button>" +
               "</form>")
        })
        
        it("saves", function() {
            spyOn(window.location, "replace")
            new AdminView(adminController).init()
            $("#success-text").val("expected")
            spyOn(adminController, "saveSuccessText")

            $("#save-projects").click()

            expect(adminController.saveSuccessText).toHaveBeenCalledWith("expected")
        })

        it("loads", function() {
            localStorage.setItem("successText", "any old value")
            var textInput = $("#success-text")

            new AdminView(adminController).init()

            expect(textInput.val()).toBe("any old value")
        })
    })

    it("prints a list of project names to the dom", function () {
        $("body").append("<div id='project-controls' class='hidden'></div>")
        new AdminView(adminController).appendProjects([
            {"name": "foo"},
            {"name": "bar"}
        ])

        expect($("#projects ul li").size()).toBe(2)
        expect($("#project-controls")).not.toHaveClass("hidden")
    })

    it("clears out the projects before adding them", function () {
        var adminView = new AdminView(adminController);
        adminView.appendProjects([{"name": "foo"}, {"name": "bar"}])
        adminView.appendProjects([{"name": "foo"}, {"name": "bar"}])

        expect($("#projects ul li").size()).toBe(2)
    })

    it("project gets classes added on click", function () {
        new AdminView(adminController).appendProjects([
            {"name": "foo"},
            {"name": "bar"}
        ])
        var project = $('#projects ul li:first')
        expect(project).toHaveClass("included")
        expect(project).toHaveClass("no-text-selection")

        project.click()

        expect(project).not.toHaveClass("included")
    })

    it("projects should only be included if the user has included them", function () {
        localStorage.setItem("includedProjects", ["foo"])
        localStorage.setItem("cctray", "url")
        new AdminView(adminController).appendProjects([
            {"name": "foo"},
            {"name": "bar"}
        ])

        expect($('#projects ul li:first')).toHaveClass("included")
        expect($('#projects ul li:last')).not.toHaveClass("included")
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
