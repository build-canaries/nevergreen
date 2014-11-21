describe("Monitor page", function () {
    it("loads index page", function () {
        var config = {load: null, isReady: null}
        spyOn(config, "load").and.returnValue({cctray: "url", includedProjects: ["foo"]})
        spyOn(config, "isReady").and.returnValue(true)
        spyOn($, "post")
        var updater = new Updater(10, config)

        updater.start()

        expect($.post).toHaveBeenCalledWith("/interesting", jasmine.any(Object), jasmine.any(Function), "json")
    })

    it("loads config page", function () {
        var config = {load: null, isReady: null}
        spyOn(config, "load").and.returnValue({cctray: null, includedProjects: null})
        spyOn(config, "isReady").and.returnValue(false)
        spyOn(window.location, "replace")
        spyOn($, "post")
        var updater = new Updater(10, config)

        updater.start()

        expect($.post).not.toHaveBeenCalled()
        expect(window.location.replace).toHaveBeenCalledWith("config.html")
    })
})
