var storageRepository = require('../../../src/js/storage/timingRepository')

describe('timing repository', function () {

    beforeEach(function () {
        localStorage.clear()
    })

    describe('saving to local storage', function () {
        beforeEach(function () {
            spyOn(localStorage, 'setItem')
        })


        it('saves polling time', function () {
            storageRepository.savePollingTime('6')

            expect(localStorage.setItem).toHaveBeenCalledWith('pollingTime', '6')
        })
    })

    describe('loading from local storage', function () {
        it('polling time in seconds', function () {
            localStorage.setItem('pollingTime', '6')

            var pollingTime = storageRepository.getPollingTime();

            expect(pollingTime).toBe('6')
        })

        it('polling time in milliseconds', function () {
            localStorage.setItem('pollingTime', '6')

            var pollingTime = storageRepository.getPollingTimeInMilliseconds();

            expect(pollingTime).toBe(6000)
        })

        it('default polling time', function () {
            expect(storageRepository.getPollingTime()).toBe('5')
        })

        it('default polling time in milliseconds', function () {
            expect(storageRepository.getPollingTimeInMilliseconds()).toBe(5000)
        })
    })
})

