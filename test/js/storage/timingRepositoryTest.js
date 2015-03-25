/* global describe, it, beforeEach, spyOn, expect */

var repositoryMock = require('../../../src/js/storage/repository')
var storageRepository = require('../../../src/js/storage/timingRepository')

describe('timing repository', function () {

    describe('saving to local storage', function () {
        beforeEach(function () {
            spyOn(repositoryMock, 'save')
        })

        it('saves polling time', function () {
            storageRepository.savePollingTime('6')

            expect(repositoryMock.save).toHaveBeenCalledWith('pollingTime', '6')
        })
    })

    describe('loading from local storage', function () {
        it('polling time in seconds', function () {
            spyOn(repositoryMock, 'getOr').and.returnValue('6')

            expect(storageRepository.getPollingTime()).toBe(6)
        })

        it('polling time in milliseconds', function () {
            spyOn(repositoryMock, 'getOr').and.returnValue('6')

            expect(storageRepository.getPollingTimeInMilliseconds()).toBe(6000)
        })

        it('default polling time', function () {
            spyOn(repositoryMock, 'getOr')

            storageRepository.getPollingTime()

            expect(repositoryMock.getOr).toHaveBeenCalledWith('pollingTime', 5)
        })
    })
})

