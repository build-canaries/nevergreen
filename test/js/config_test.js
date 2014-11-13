describe("Configurable build monitor", function () {

    beforeEach(function () {
        localStorage.clear()
    })

    it("stores the cctray URL", function () {
        spyOn(localStorage, "setItem")

        new Config().save({cctray: "url"})

        expect(localStorage.setItem).toHaveBeenCalledWith("cctray", "url")
    })

    it("gets the cctray url from settings", function () {
        localStorage.setItem("cctray", "some-url")
        localStorage.setItem("includedProjects", ["proj"])

        var settings = new Config().load()

        expect(settings.cctray).toBe("some-url")
        expect(settings.includedProjects[0]).toBe("proj")
    })

    it("loads config as null if local storage is not set", function () {
        var settings = new Config().load()

        expect(settings.cctray).toBe(null)
        expect(settings.includedProjects).toBe(null)
    })

    describe("can tell when it has been set up", function () {
        it("is false", function () {
            spyOn(localStorage, "hasOwnProperty").and.returnValue(false)

            var ready = new Config().isReady()

            expect(ready).toBeFalsy()
        })

        it("is true", function () {
            spyOn(localStorage, "hasOwnProperty").and.returnValue(true)

            var ready = new Config().isReady()

            expect(ready).toBeTruthy()
        })

        it("has cctray", function () {
            spyOn(localStorage, "hasOwnProperty").and.returnValue(true)

            var hasCctray = new Config().hasCctray()

            expect(hasCctray).toBeTruthy()
        })
    })
})
