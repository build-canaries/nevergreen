describe("Configurable build monitor", function () {
    var config = new Config()

    it("gets the projects using the api", function () {
        var projectNames = ["proj-1", "proj-2"]
        spyOn($, "get").andCallFake(function (_) {
            var d = $.Deferred();
            d.resolve(projectNames);
            return d.promise();
        })
        spyOn(config, "load").andReturn({cctray: "some-url"})
        var callbackFunction = function(data){}

        var projects = new ProjectsFinder(config).getProjects(callbackFunction)

        expect($.get).toHaveBeenCalledWith("/api/projects", {url: "some-url"}, callbackFunction)
    })
})
