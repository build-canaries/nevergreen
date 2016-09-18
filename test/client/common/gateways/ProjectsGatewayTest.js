import '../../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

describe('projects gateway', () => {

  let subject, Gateway

  before(() => {
    Gateway = {}
    subject = proxyquire('../../../../src/client/common/gateways/ProjectsGateway', {'./Gateway': Gateway})
  })

  beforeEach(() => {
    Gateway.post = sinon.stub().returns(new Promise(() => {}, () => {}))
  })

  describe('getting all projects', () => {
    it('has all data', () => {
      const trays = [{
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

      subject.fetchAll(trays)

      expect(Gateway.post).to.have.been.calledWith('/api/projects/all', trays)
    })
  })

  describe('getting interesting projects', () => {
    it('has all data', () => {
      const selected = {id: ['some-project-id']}
      const tray = {
        trayId: 'id',
        url: 'url',
        username: 'uname',
        password: 'pword',
        serverType: 'GO'
      }
      const trays = [tray]

      subject.interesting(trays, selected)

      const data = [{
        trayId: tray.trayId,
        url: tray.url,
        username: tray.username,
        password: tray.password,
        included: ['some-project-id'],
        serverType: tray.serverType
      }]

      expect(Gateway.post).to.have.been.calledWith('/api/projects/interesting', data)
    })
  })
})
