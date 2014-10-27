describe("Configurable build monitor", function () {

    it("stores the cctray URL", function () {
        spyOn(localStorage, "setItem")

        new Config().save({cctray: "url"})

        expect(localStorage.setItem).toHaveBeenCalledWith("cctray", "url")
    })

    it("gets the cctray url from settings", function () {
        spyOn(localStorage, "getItem").andReturn("some-url")

        var settings = new Config().load()

        expect(localStorage.getItem).toHaveBeenCalledWith("cctray")
        expect(settings.cctray).toBe("some-url")
    })

    describe("can tell when it has been set up", function () {
        it("is false", function () {
            spyOn(localStorage, "hasOwnProperty").andReturn(false)

            var ready = new Config().isReady()

            expect(ready).toBeFalsy()
        })

        it("is true", function () {
            spyOn(localStorage, "hasOwnProperty").andReturn(true)

            var ready = new Config().isReady()

            expect(ready).toBeTruthy()
        })
    })
})
