import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'
import {
  ENCRYPTING_PASSWORD,
  HIGHLIGHT_TRAY,
  PASSWORD_ENCRYPT_ERROR,
  PASSWORD_ENCRYPTED,
  PROJECTS_FETCH_ERROR,
  PROJECTS_FETCHED,
  PROJECTS_FETCHING,
  REMOVE_TRAY,
  SELECT_PROJECT,
  SET_SERVER_TYPE,
  SET_TRAY_ID,
  SET_TRAY_NAME,
  SET_TRAY_URL,
  SET_TRAY_USERNAME,
  TRAY_ADDED
} from '../../../src/client/actions/Actions'
import {
  encryptingPassword,
  highlightTray,
  passwordEncrypted,
  passwordEncryptError,
  projectsFetched,
  projectsFetchError,
  projectsFetching,
  removeTray,
  selectProject,
  setServerType,
  setTrayId,
  setTrayName,
  setTrayUrl,
  setTrayUsername,
  trayAdded
} from '../../../src/client/actions/TrackingActionCreators'

describe('TrackingActionCreators', function () {

  describe('tray added', function () {

    it('should return the correct type', function () {
      const actual = trayAdded()
      expect(actual).to.have.property('type', TRAY_ADDED)
    })

    it('should return the tray id', function () {
      const actual = trayAdded('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
      expect(actual).to.have.property('data').that.includes.property('trayId', 'some-tray-id')
    })

    it('should return the tray url', function () {
      const actual = trayAdded('irrelevant', 'some-url')
      expect(actual).to.have.property('data').that.includes.property('url', 'some-url')
    })

    it('should return the tray username', function () {
      const actual = trayAdded('irrelevant', 'irrelevant', 'some-username')
      expect(actual).to.have.property('data').that.includes.property('username', 'some-username')
    })

    it('should return a generated tray name', function () {
      const actual = trayAdded()
      expect(actual).to.have.property('data').that.includes.property('name').that.is.not.null()
    })

    it('should return highlight', function () {
      const actual = trayAdded('irrelevant', 'irrelevant', 'some-username')
      expect(actual).to.have.property('data').that.includes.property('highlight', true)
    })
  })

  describe('highlight tray', function () {

    it('should return the correct type', function () {
      const actual = highlightTray()
      expect(actual).to.have.property('type', HIGHLIGHT_TRAY)
    })

    it('should return the tray id', function () {
      const actual = highlightTray('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })
  })

  describe('encrypting password', function () {

    it('should return the correct type', function () {
      const actual = encryptingPassword()
      expect(actual).to.have.property('type', ENCRYPTING_PASSWORD)
    })

    it('should return the tray id', function () {
      const actual = encryptingPassword('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the password being encrypted', function () {
      const actual = encryptingPassword('irrelevant', 'some-password')
      expect(actual).to.have.property('password', 'some-password')
    })

    it('should return the request', function () {
      const actual = encryptingPassword('irrelevant', 'irrelevant', 'some-request')
      expect(actual).to.have.property('request', 'some-request')
    })
  })

  describe('password encrypted', function () {

    it('should return the correct type', function () {
      const actual = passwordEncrypted()
      expect(actual).to.have.property('type', PASSWORD_ENCRYPTED)
    })

    it('should return the tray id', function () {
      const actual = passwordEncrypted('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the encrypted password', function () {
      const actual = passwordEncrypted('irrelevant', 'encrypted-password')
      expect(actual).to.have.property('password', 'encrypted-password')
    })
  })

  describe('password encrypt error', function () {

    it('should return the correct type', function () {
      const actual = passwordEncryptError()
      expect(actual).to.have.property('type', PASSWORD_ENCRYPT_ERROR)
    })

    it('should return the tray id', function () {
      const actual = passwordEncryptError('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the errors', function () {
      const actual = passwordEncryptError('some-tray-id', ['some-error'])
      expect(actual).to.have.property('errors').that.includes('some-error')
    })
  })

  describe('remove tray', function () {

    it('should return the correct type', function () {
      const actual = removeTray()
      expect(actual).to.have.property('type', REMOVE_TRAY)
    })

    it('should return the tray id', function () {
      const actual = removeTray('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should abort the pending request', function () {
      const abort = mocks.spy()
      removeTray('some-tray-id', {abort})
      expect(abort).to.have.been.called()
    })
  })

  describe('projects fetching', function () {

    it('should return the correct type', function () {
      const actual = projectsFetching()
      expect(actual).to.have.property('type', PROJECTS_FETCHING)
    })

    it('should return the tray id', function () {
      const actual = projectsFetching('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the request', function () {
      const actual = projectsFetching('irrelevant', 'some-request')
      expect(actual).to.have.property('request', 'some-request')
    })
  })

  describe('projects fetched', function () {

    it('should return the correct type', function () {
      const actual = projectsFetched('irrelevant', [])
      expect(actual).to.have.property('type', PROJECTS_FETCHED)
    })

    it('should return the tray id', function () {
      const actual = projectsFetched('some-tray-id', [])
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the projects', function () {
      const actual = projectsFetched('irrelevant', [{foo: 'bar', webUrl: ''}])
      expect(actual).to.have.property('data').that.includes.deep.property('[0].foo', 'bar')
    })

    it('should return a timestamp', function () {
      const actual = projectsFetched('irrelevant', [])
      expect(actual).to.have.property('timestamp').that.is.not.empty()
    })

    it('should return the server type', function () {
      const actual = projectsFetched('irrelevant', [{
        serverType: 'some-type'
      }])
      expect(actual).to.have.property('serverType', 'some-type')
    })
  })

  describe('projects fetch error', function () {

    it('should return the correct type', function () {
      const actual = projectsFetchError()
      expect(actual).to.have.property('type', PROJECTS_FETCH_ERROR)
    })

    it('should return the tray id', function () {
      const actual = projectsFetchError('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the errors', function () {
      const actual = projectsFetchError('some-tray-id', ['some-error'])
      expect(actual).to.have.property('errors').that.includes('some-error')
    })
  })

  describe('set tray name', function () {

    it('should return the correct type', function () {
      const actual = setTrayName()
      expect(actual).to.have.property('type', SET_TRAY_NAME)
    })

    it('should return the tray id', function () {
      const actual = setTrayName('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the tray name', function () {
      const actual = setTrayName('irrelevant', 'some-name')
      expect(actual).to.have.property('name', 'some-name')
    })
  })

  describe('set server type', function () {

    it('should return the correct type', function () {
      const actual = setServerType()
      expect(actual).to.have.property('type', SET_SERVER_TYPE)
    })

    it('should return the tray id', function () {
      const actual = setServerType('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the server type', function () {
      const actual = setServerType('irrelevant', 'some-type')
      expect(actual).to.have.property('serverType', 'some-type')
    })
  })

  describe('set tray username', function () {

    it('should return the correct type', function () {
      const actual = setTrayUsername()
      expect(actual).to.have.property('type', SET_TRAY_USERNAME)
    })

    it('should return the tray id', function () {
      const actual = setTrayUsername('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the tray username', function () {
      const actual = setTrayUsername('irrelevant', 'some-username')
      expect(actual).to.have.property('username', 'some-username')
    })
  })

  describe('set tray url', function () {

    it('should return the correct type', function () {
      const actual = setTrayUrl()
      expect(actual).to.have.property('type', SET_TRAY_URL)
    })

    it('should return the url', function () {
      const actual = setTrayUrl('irrelevant', 'some-url')
      expect(actual).to.have.property('url', 'some-url')
    })
  })

  describe('set tray id', function () {

    it('should return the correct type', function () {
      const actual = setTrayId()
      expect(actual).to.have.property('type', SET_TRAY_ID)
    })

    it('should return the original tray id', function () {
      const actual = setTrayId('some-tray-id')
      expect(actual).to.have.property('originalTrayId', 'some-tray-id')
    })

    it('should return the new tray id', function () {
      const actual = setTrayId('some-tray-id', 'some-url')
      expect(actual).to.have.property('newTrayId', 'some-url')
    })
  })

  describe('select project', function () {

    it('should return the correct type', function () {
      const actual = selectProject()
      expect(actual).to.have.property('type', SELECT_PROJECT)
    })

    it('should return the tray id', function () {
      const actual = selectProject('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the web url', function () {
      const actual = selectProject('irrelevant', 'some-project-url')
      expect(actual).to.have.property('projectId', 'some-project-url')
    })

    it('should return if the project was selected', function () {
      const actual = selectProject('irrelevant', 'irrelevant', true)
      expect(actual).to.have.property('selected', true)
    })
  })
})
