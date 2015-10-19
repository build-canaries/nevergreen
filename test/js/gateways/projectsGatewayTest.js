jest.dontMock('../../../src/js/gateways/projectsGateway')

describe('repository', function () {

  var subject, gateway

  beforeEach(function () {
    subject = require('../../../src/js/gateways/projectsGateway')
    gateway = require('../../../src/js/gateways/gateway')
  })

  describe('getting interesting projects', function () {
    it('has all data', function () {
      var selected = {id: ['some-project-id']}
      var tray = {
        trayId: 'id',
        url: 'url',
        username: 'uname',
        password: 'pword',
        serverType: 'GO'
      }
      var trays = [tray]

      subject.interesting(trays, selected)

      var data = [{
        trayId: tray.trayId,
        url: tray.url,
        username: tray.username,
        password: tray.password,
        included: ['some-project-id'],
        serverType: tray.serverType
      }]
      expect(gateway.post).toBeCalledWith('/api/projects/interesting', data)
    })
  })
})
