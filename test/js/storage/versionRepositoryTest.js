jest.dontMock('../../../src/js/storage/versionRepository')

describe('version repository', function () {

    var repositoryMock, versionRepository

    beforeEach(function () {
        repositoryMock = require('../../../src/js/storage/repository')
        versionRepository = require('../../../src/js/storage/versionRepository')
    })

    describe('loading from local storage', function () {
        it('gets', function () {
            versionRepository.getVersion()
            expect(repositoryMock.getOr).toBeCalledWith('version', '0.0.0')
        })
    })

    describe('saving to local storage', function () {
        it('saves', function () {
            versionRepository.saveVersion('1.0.0')
            expect(repositoryMock.save).toBeCalledWith('version', '1.0.0')
        })
    })

})
