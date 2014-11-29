var config = require('../../../src/js/config/config')

describe('Configurable build monitor', function () {

    beforeEach(function () {
        localStorage.clear()
    })

    it('stores the cctray URL', function () {
        spyOn(localStorage, 'setItem')

        config.save({cctray: 'url'})

        expect(localStorage.setItem).toHaveBeenCalledWith('cctray', 'url')
    })

    describe('load', function () {
        it('gets the correct saved values from local storage', function () {
            localStorage.setItem('cctray', 'some-url')
            localStorage.setItem('includedProjects', ['proj'])
            localStorage.setItem('successText', 'hello world')

            var settings = config.load()

            expect(settings.cctray).toBe('some-url')
            expect(settings.includedProjects).toEqual(['proj'])
            expect(settings.successText).toEqual('hello world')
        })

        it('null if local storage is not set', function () {
            var settings = config.load()

            expect(settings.cctray).toBe(null)
            expect(settings.includedProjects).toBe(null)
        })

        it('default success to cat', function () {
            var settings = config.load()

            expect(settings.successText).toBe('=(^.^)=')
        })
    })

    describe('can tell when it has been set up', function () {
        it('is false', function () {
            spyOn(localStorage, 'hasOwnProperty').and.returnValue(false)

            var ready = config.isReady()

            expect(ready).toBeFalsy()
        })

        it('is true', function () {
            spyOn(localStorage, 'hasOwnProperty').and.returnValue(true)

            var ready = config.isReady()

            expect(ready).toBeTruthy()
        })

        it('has cctray', function () {
            spyOn(localStorage, 'hasOwnProperty').and.returnValue(true)

            var hasCctray = config.hasCctray()

            expect(hasCctray).toBeTruthy()
        })
    })
})
