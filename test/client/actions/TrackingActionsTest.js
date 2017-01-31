import {proxyquire} from '../UnitSpec'
import {describe, it, before, beforeEach} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'

describe('TrackingActions', function () {
  let TrackingActions, SecurityGateway, ProjectsGateway, moment, nameGenerator

  before(function () {
    SecurityGateway = {}
    ProjectsGateway = {}
    moment = sinon.stub().returns({format: sinon.stub()})
    nameGenerator = sinon.stub().returns({spaced: ''})
    TrackingActions = proxyquire('../../src/client/actions/TrackingActions', {
      '../common/gateways/SecurityGateway': SecurityGateway,
      '../common/gateways/ProjectsGateway': ProjectsGateway,
      moment,
      'project-name-generator': nameGenerator
    })
  })

  beforeEach(function () {
    moment().format.reset()
    nameGenerator.reset()
  })

  describe('tray added', function () {

    it('should return the correct type', function () {
      const actual = TrackingActions.trayAdded()
      expect(actual).to.have.property('type', TrackingActions.TRAY_ADDED)
    })

    it('should return the tray id', function () {
      const actual = TrackingActions.trayAdded('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
      expect(actual).to.have.property('data').that.includes.property('trayId', 'some-tray-id')
    })

    it('should return the tray url', function () {
      const actual = TrackingActions.trayAdded('irrelevant', 'some-url')
      expect(actual).to.have.property('data').that.includes.property('url', 'some-url')
    })

    it('should return the tray username', function () {
      const actual = TrackingActions.trayAdded('irrelevant', 'irrelevant', 'some-username')
      expect(actual).to.have.property('data').that.includes.property('username', 'some-username')
    })

    it('should return a lower cased randomly generate tray name', function () {
      nameGenerator.returns({spaced: 'GENERATED NAME'})
      const actual = TrackingActions.trayAdded()
      expect(actual).to.have.property('data').that.includes.property('name', 'generated name')
    })

    it('should return highlight', function () {
      const actual = TrackingActions.trayAdded('irrelevant', 'irrelevant', 'some-username')
      expect(actual).to.have.property('data').that.includes.property('highlight', true)
    })
  })

  describe('highlight tray', function () {

    it('should return the correct type', function () {
      const actual = TrackingActions.highlightTray()
      expect(actual).to.have.property('type', TrackingActions.HIGHLIGHT_TRAY)
    })

    it('should return the tray id', function () {
      const actual = TrackingActions.highlightTray('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })
  })

  describe('clear tray highlight', function () {

    it('should return the correct type', function () {
      const actual = TrackingActions.clearTrayHighlight()
      expect(actual).to.have.property('type', TrackingActions.CLEAR_TRAY_HIGHLIGHT)
    })

    it('should return the tray id', function () {
      const actual = TrackingActions.clearTrayHighlight('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })
  })

  describe('encrypting password', function () {

    it('should return the correct type', function () {
      const actual = TrackingActions.encryptingPassword()
      expect(actual).to.have.property('type', TrackingActions.ENCRYPTING_PASSWORD)
    })

    it('should return the tray id', function () {
      const actual = TrackingActions.encryptingPassword('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the password being encrypted', function () {
      const actual = TrackingActions.encryptingPassword('irrelevant', 'some-password')
      expect(actual).to.have.property('password', 'some-password')
    })
  })

  describe('password encrypted', function () {

    it('should return the correct type', function () {
      const actual = TrackingActions.passwordEncrypted()
      expect(actual).to.have.property('type', TrackingActions.PASSWORD_ENCRYPTED)
    })

    it('should return the tray id', function () {
      const actual = TrackingActions.passwordEncrypted('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the encrypted password', function () {
      const actual = TrackingActions.passwordEncrypted('irrelevant', 'encrypted-password')
      expect(actual).to.have.property('password', 'encrypted-password')
    })
  })

  describe('password encrypt error', function () {

    it('should return the correct type', function () {
      const actual = TrackingActions.passwordEncryptError()
      expect(actual).to.have.property('type', TrackingActions.PASSWORD_ENCRYPT_ERROR)
    })

    it('should return the tray id', function () {
      const actual = TrackingActions.passwordEncryptError('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the errors', function () {
      const actual = TrackingActions.passwordEncryptError('some-tray-id', ['some-error'])
      expect(actual).to.have.property('errors').that.includes('some-error')
    })
  })

  describe('remove tray', function () {

    it('should return the correct type', function () {
      const actual = TrackingActions.removeTray()
      expect(actual).to.have.property('type', TrackingActions.REMOVE_TRAY)
    })

    it('should return the tray id', function () {
      const actual = TrackingActions.removeTray('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })
  })

  describe('projects fetching', function () {

    it('should return the correct type', function () {
      const actual = TrackingActions.projectsFetching()
      expect(actual).to.have.property('type', TrackingActions.PROJECTS_FETCHING)
    })

    it('should return the tray id', function () {
      const actual = TrackingActions.projectsFetching('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })
  })

  describe('projects fetched', function () {

    it('should return the correct type', function () {
      const actual = TrackingActions.projectsFetched('irrelevant', [])
      expect(actual).to.have.property('type', TrackingActions.PROJECTS_FETCHED)
    })

    it('should return the tray id', function () {
      const actual = TrackingActions.projectsFetched('some-tray-id', [])
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the projects', function () {
      const actual = TrackingActions.projectsFetched('irrelevant', [{foo: 'bar', webUrl: ''}])
      expect(actual).to.have.property('data').that.includes.deep.property('[0].foo', 'bar')
    })

    it('should return a timestamp', function () {
      moment().format.returns('some-timestamp')
      const actual = TrackingActions.projectsFetched('irrelevant', [])
      expect(actual).to.have.property('timestamp', 'some-timestamp')
    })
  })

  describe('projects fetch error', function () {

    it('should return the correct type', function () {
      const actual = TrackingActions.projectsFetchError()
      expect(actual).to.have.property('type', TrackingActions.PROJECTS_FETCH_ERROR)
    })

    it('should return the tray id', function () {
      const actual = TrackingActions.projectsFetchError('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the errors', function () {
      const actual = TrackingActions.projectsFetchError('some-tray-id', ['some-error'])
      expect(actual).to.have.property('errors').that.includes('some-error')
    })
  })

  describe('updating tray', function () {

    it('should return the correct type', function () {
      const actual = TrackingActions.updatingTray()
      expect(actual).to.have.property('type', TrackingActions.UPDATING_TRAY)
    })

    it('should return the tray id', function () {
      const actual = TrackingActions.updatingTray('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
      expect(actual).to.have.property('data').that.includes.property('trayId', 'some-tray-id')
    })

    it('should return a timestamp', function () {
      moment().format.returns('some-timestamp')
      const actual = TrackingActions.updatingTray()
      expect(actual).to.have.property('timestamp', 'some-timestamp')
    })

    it('should return the tray name', function () {
      const actual = TrackingActions.updatingTray('irrelevant', 'some-name')
      expect(actual).to.have.property('data').that.includes.property('name', 'some-name')
    })

    it('should return the tray url', function () {
      const actual = TrackingActions.updatingTray('irrelevant', 'irrelevant', 'some-url')
      expect(actual).to.have.property('data').that.includes.property('url', 'some-url')
    })

    it('should return the tray username', function () {
      const actual = TrackingActions.updatingTray('irrelevant', 'irrelevant', 'irrelevant', 'some-username')
      expect(actual).to.have.property('data').that.includes.property('username', 'some-username')
    })
  })

  describe('encrypt password', function () {
    let dispatch

    beforeEach(function () {
      dispatch = sinon.spy()
    })

    it('should dispatch encrypting password action', function () {
      SecurityGateway.encryptPassword = sinon.stub().returns(Promise.resolve(''))
      TrackingActions.encryptPassword()(dispatch)
      expect(dispatch).to.have.been.calledWithMatch({type: TrackingActions.ENCRYPTING_PASSWORD})
    })

    it('should dispatch password encrypted action', function () {
      SecurityGateway.encryptPassword = sinon.stub().returns(Promise.resolve(''))
      return TrackingActions.encryptPassword()(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: TrackingActions.PASSWORD_ENCRYPTED})
      })
    })
  })

  describe('select project', function () {

    it('should return the correct type', function () {
      const actual = TrackingActions.selectProject()
      expect(actual).to.have.property('type', TrackingActions.SELECT_PROJECT)
    })

    it('should return the tray id', function () {
      const actual = TrackingActions.selectProject('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the web url', function () {
      const actual = TrackingActions.selectProject('irrelevant', 'some-project-url')
      expect(actual).to.have.property('projectId', 'some-project-url')
    })

    it('should return if the project was selected', function () {
      const actual = TrackingActions.selectProject('irrelevant', 'irrelevant', true)
      expect(actual).to.have.property('selected', true)
    })
  })

  describe('add tray', function () {
    let dispatch

    beforeEach(function () {
      dispatch = sinon.spy()
    })

    it('should dispatch tray added action', function () {
      ProjectsGateway.fetchAll = sinon.stub().returns(Promise.resolve(''))
      TrackingActions.addTray()(dispatch)
      expect(dispatch).to.have.been.calledWithMatch({type: TrackingActions.TRAY_ADDED})
    })

    it('should automatically append http:// to urls missing a scheme')

    it('should encrypt any password given')

    it('should refresh tray')

    it('should not dispatch anything if the tray has already been added')
  })

  describe('update tray', function () {

    it('should dispatch updating tray action')

    it('should encrypt the password if it has been updated')

    it('should refresh the tray')
  })

  describe('refresh tray', function () {

    it('should dispatch projects fetching action')

    it('should dispatch projects fetched action on success')

    it('should filter projects containing jobs')

    it('should dispatch projects fetch error action on failure')
  })
})
