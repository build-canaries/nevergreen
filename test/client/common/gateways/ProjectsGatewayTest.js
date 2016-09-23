import {proxyquire} from '../../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'

describe('projects gateway', () => {

  let ProjectsGateway, Gateway

  before(() => {
    Gateway = {}
    ProjectsGateway = proxyquire('../../src/client/common/gateways/ProjectsGateway', {'./Gateway': Gateway})
  })

  beforeEach(() => {
    Gateway.post = sinon.spy()
  })

  describe('getting all projects', () => {
    it('posts only the required data from the given trays', () => {
      const trays = [{
        url: 'url',
        username: 'uname',
        password: 'pword',
        serverType: 'GO',
        foo: 'bar'
      }, {
        url: 'another-url',
        username: 'another-uname',
        password: 'another-pword',
        serverType: 'GO',
        extra: 'i-should-get-removed'
      }]
      const expected = [{
        url: 'url',
        username: 'uname',
        password: 'pword',
        serverType: 'GO'
      }, {
        url: 'another-url',
        username: 'another-uname',
        password: 'another-pword',
        serverType: 'GO'
      }]

      ProjectsGateway.fetchAll(trays)

      expect(Gateway.post).to.have.been.calledWith('/api/projects/all', expected)
    })
  })

  describe('getting interesting projects', () => {
    it('maps selected projects to the posted data', () => {
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
  })
})
