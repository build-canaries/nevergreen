/* global describe, it, beforeEach, spyOn, expect */

var repositoryMock = require('../../../src/js/storage/repository')
var storageRepository = require('../../../src/js/storage/trackingRepository')

describe('tracking repository', function () {

    describe('saving to local storage', function () {
        beforeEach(function () {
            spyOn(repositoryMock, 'save')
        })

        it('saves tray', function () {
            storageRepository.saveTray('some-id', {})
            expect(repositoryMock.save).toHaveBeenCalledWith('some-id', {})
        })

        it('saves trays', function () {
            storageRepository.saveTrays(['some-id'])
            expect(repositoryMock.save).toHaveBeenCalledWith('trays', ['some-id'])
        })
    })

    describe('loading from local storage', function () {
        beforeEach(function () {
            spyOn(repositoryMock, 'getOr')
            spyOn(repositoryMock, 'getObjectOr')
        })

        it('trays', function () {
            storageRepository.getTrays()
            expect(repositoryMock.getOr).toHaveBeenCalledWith('trays', [])
        })

        it('tray', function () {
            storageRepository.getTray('some-id')
            expect(repositoryMock.getObjectOr).toHaveBeenCalledWith('some-id', {
                url: '',
                username: '',
                password: '',
                includedProjects: [],
                previousProjects: []
            })
        })
    })

})
