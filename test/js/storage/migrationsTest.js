jest.dontMock('semver')
    .dontMock('jquery')
    .dontMock('../../../src/js/storage/migrations')

function resolve(promiseMock, args) {
    promiseMock.done.mock.calls[0][0](args)
}

describe('migrations', function () {

    var migrations, repositoryMock, versionRepositoryMock, versionGatewayMock

    beforeEach(function () {
        repositoryMock = require('../../../src/js/storage/repository')
        versionRepositoryMock = require('../../../src/js/storage/versionRepository')
        versionGatewayMock = require('../../../src/js/gateways/versionGateway')

        migrations = require('../../../src/js/storage/migrations')
    })

    it('clears local storage if settings were saved in a version older than 0.7.0', function () {
        var promiseMock = {done: jest.genMockFunction()}
        versionRepositoryMock.getVersion.mockReturnValueOnce('0.6.1')
        versionGatewayMock.getVersion.mockReturnValueOnce(promiseMock)

        migrations.migrate()

        resolve(promiseMock, 'x.y.z')

        expect(repositoryMock.clear).toBeCalled()
        expect(versionRepositoryMock.saveVersion).toBeCalledWith('x.y.z')
    })

    it('does not clear local storage if settings were saved in version 0.7.0', function () {
        versionRepositoryMock.getVersion.mockReturnValueOnce('0.7.0')

        migrations.migrate()

        expect(repositoryMock.clear).not.toBeCalled()
        expect(versionRepositoryMock.saveVersion).not.toBeCalled()
    })

    it('does not clear local storage if settings were saved in a version greater than 0.7.0', function () {
        versionRepositoryMock.getVersion.mockReturnValueOnce('1.0.0')

        migrations.migrate()

        expect(repositoryMock.clear).not.toBeCalled()
        expect(versionRepositoryMock.saveVersion).not.toBeCalled()
    })

})
