import '../../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'
import proxyquire from 'proxyquire'

describe('projects gateway', () => {

  let subject, Gateway, projects, promised

  before(() => {
    Gateway = {}
    subject = proxyquire('../../../../src/client/common/gateways/ProjectsGateway', {'./Gateway': Gateway})
  })

  beforeEach(() => {
    projects = [{
      trayId: 'id',
      projectId: 'some-id',
      name: 'name',
      stage: 'stage',
      prognosis: 'some-prognosis',
      lastBuildTime: 'some-last-build-time'
    }]
    promised = new Promise((resolve) => {
      setTimeout(() => {
        resolve(projects)
      }, 0)
    })
    Gateway.post = sinon.stub().returns(promised)
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
        name: 'foo',
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

    it('injects tray name into interesting projects', (done) => {
      const selected = {id: ['some-project-id']}
      const trays = [{
        trayId: 'id',
        name: 'foo',
        url: 'url',
        username: 'uname',
        password: 'pword',
        serverType: 'GO'
      }]

      subject.interesting(trays, selected).then((data) => {
        expect(data).to.deep.equal([{
          trayId: 'id',
          trayName: 'foo',
          projectId: 'some-id',
          name: 'name',
          stage: 'stage',
          prognosis: 'some-prognosis',
          lastBuildTime: 'some-last-build-time'
        }])
        done()
      })
    })
  })
})
