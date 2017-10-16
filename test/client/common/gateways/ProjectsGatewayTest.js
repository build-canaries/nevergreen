import {proxyquire} from '../../UnitSpec'
import {before, beforeEach, describe, it} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'

describe('projects gateway', function () {

  let ProjectsGateway, Gateway

  before(() => {
    Gateway = {}
    ProjectsGateway = proxyquire('../../src/client/common/gateways/ProjectsGateway', {'./Gateway': Gateway})
  })

  beforeEach(() => {
    Gateway.post = sinon.stub().returns(Promise.resolve({}))
  })

  describe('getting all projects', function () {
    it('posts only the required data from the given trays', () => {
      const trays = [{
        trayId: 'url',
        url: 'url',
        username: 'uname',
        password: 'pword',
        serverType: 'GO',
        foo: 'bar'
      }, {
        trayId: 'another-url',
        url: 'another-url',
        username: 'another-uname',
        password: 'another-pword',
        serverType: 'GO',
        extra: 'i-should-get-removed'
      }]
      const expected = [{
        trayId: 'url',
        url: 'url',
        username: 'uname',
        password: 'pword',
        serverType: 'GO'
      }, {
        trayId: 'another-url',
        url: 'another-url',
        username: 'another-uname',
        password: 'another-pword',
        serverType: 'GO'
      }]

      ProjectsGateway.fetchAll(trays)

      expect(Gateway.post).to.have.been.calledWith('/api/projects/all', expected)
    })
  })

  describe('getting interesting projects', function () {
    it('maps selected projects to the posted data', function () {
      const selected = {'some-tray-id': ['some-project-id']}
      const trays = [{
        trayId: 'some-tray-id',
        url: 'some-url',
        username: 'some-uname',
        password: 'some-pword',
        serverType: 'some-server-type'
      }]
      const expected = [{
        trayId: 'some-tray-id',
        url: 'some-url',
        username: 'some-uname',
        password: 'some-pword',
        included: ['some-project-id'],
        serverType: 'some-server-type'
      }]

      ProjectsGateway.interesting(trays, selected)

      expect(Gateway.post).to.have.been.calledWith('/api/projects/interesting', expected)
    })

    it('does not include trays with no selected projects', function () {
      const selected = {'some-tray-id': ['some-project-id'], 'none-selected-id': []}
      const trays = [{trayId: 'some-tray-id'}, {trayId: 'none-selected-id'}]
      const expected = [sinon.match({trayId: 'some-tray-id'})]

      ProjectsGateway.interesting(trays, selected)

      expect(Gateway.post).to.have.been.calledWith('/api/projects/interesting', sinon.match(expected))
    })

    it('does not call the server at all if no trays have selected projectd', function () {
      const selected = {'some-tray-id': []}
      const trays = [{trayId: 'some-tray-id'}]

      ProjectsGateway.interesting(trays, selected)

      expect(Gateway.post).to.not.have.been.called()
    })
  })
})
