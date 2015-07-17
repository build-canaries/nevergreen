jest.dontMock('../../../src/js/gateways/projectsGateway')

describe('repository', function () {

    var subject, gateway

    beforeEach(function () {
        subject = require('../../../src/js/gateways/projectsGateway')
        gateway = require('../../../src/js/gateways/gateway')
    })

    describe('getting interesting projects', function () {
        it('has all data', function () {
            var tray = {
                id: 'id',
                url: 'url',
                username: 'uname',
                password: 'pword',
                includedProjects: 'inc',
                serverType: 'GO'
            }
            var trays = [tray]

            subject.interesting(trays)

            var data = [{
                tray: tray.id,
                url: tray.url,
                username: tray.username,
                password: tray.password,
                included: tray.includedProjects,
                serverType: tray.serverType
            }]
            expect(gateway.post).toBeCalledWith('/api/projects/interesting', data)
        })
    })
})
