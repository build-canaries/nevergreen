jest.dontMock('../../../src/js/storage/timingRepository')

var repositoryMock = require('../../../src/js/storage/repository')
var storageRepository = require('../../../src/js/storage/timingRepository')

describe('timing repository', function () {

    describe('saving to local storage', function () {
        it('saves polling time', function () {
            storageRepository.savePollingTime('6')
            expect(repositoryMock.save).toBeCalledWith('pollingTime', '6')
        })
    })

    describe('loading from local storage', function () {
        it('polling time in seconds', function () {
            repositoryMock.getOr.mockReturnValue('6')
            expect(storageRepository.getPollingTime()).toBe(6)
        })

        it('polling time in milliseconds', function () {
            repositoryMock.getOr.mockReturnValue('6')
            expect(storageRepository.getPollingTimeInMilliseconds()).toBe(6000)
        })

        it('default polling time', function () {
            storageRepository.getPollingTime()
            expect(repositoryMock.getOr).toBeCalledWith('pollingTime', 5)
        })
    })
})

