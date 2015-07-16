jest.dontMock('../../../src/js/storage/trackingRepository')

describe('tracking repository', function () {

    var repositoryMock, trackingRepository

    beforeEach(function () {
        repositoryMock = require('../../../src/js/storage/repository')
        trackingRepository = require('../../../src/js/storage/trackingRepository')
    })

    describe('saving to local storage', function () {
        it('saves tray', function () {
            trackingRepository.saveTray('some-id', {})
            expect(repositoryMock.save).toBeCalledWith('some-id', {})
        })

        it('saves trays', function () {
            trackingRepository.saveTrays(['some-id'])
            expect(repositoryMock.save).toBeCalledWith('trays', ['some-id'])
        })
    })

    describe('loading from local storage', function () {
        it('trays', function () {
            trackingRepository.getTrays()
            expect(repositoryMock.getOr).toBeCalledWith('trays', [])
        })

        it('tray', function () {
            trackingRepository.getTray('some-id')
            expect(repositoryMock.getObjectOr).toBeCalledWith('some-id', {
                url: '',
                username: '',
                password: '',
                includedProjects: [],
                previousProjects: []
            })
        })
    })

})
