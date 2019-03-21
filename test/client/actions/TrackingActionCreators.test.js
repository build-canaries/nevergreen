import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'
import {
  HIGHLIGHT_TRAY,
  PROJECTS_FETCH_ERROR,
  PROJECTS_FETCHED,
  PROJECTS_FETCHING,
  REMOVE_TRAY,
  SELECT_PROJECT,
  SET_INCLUDE_NEW,
  SET_SERVER_TYPE,
  SET_TRAY_NAME,
  SET_TRAY_URL,
  SET_TRAY_USERNAME,
  TRAY_ADDED
} from '../../../src/client/actions/Actions'
import {
  highlightTray,
  projectsFetched,
  projectsFetchError,
  projectsFetching,
  removeTray,
  selectProject,
  setIncludeNew,
  setServerType,
  setTrayName,
  setTrayUrl,
  setTrayUsername,
  trayAdded
} from '../../../src/client/actions/TrackingActionCreators'
import {List} from 'immutable'
import {Project} from '../../../src/client/domain/Project'

describe('TrackingActionCreators', function () {

  describe(TRAY_ADDED, function () {

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

  describe(HIGHLIGHT_TRAY, function () {

    it('should return the correct type', function () {
      const actual = highlightTray()
      expect(actual).to.have.property('type', HIGHLIGHT_TRAY)
    })

    it('should return the tray id', function () {
      const actual = highlightTray('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })
  })

  describe(REMOVE_TRAY, function () {

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

  describe(PROJECTS_FETCHING, function () {

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

  describe(PROJECTS_FETCHED, function () {

    it('should return the correct type', function () {
      const actual = projectsFetched('irrelevant', List())
      expect(actual).to.have.property('type', PROJECTS_FETCHED)
    })

    it('should return the tray id', function () {
      const actual = projectsFetched('some-tray-id', List())
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the projects', function () {
      const actual = projectsFetched('irrelevant', List.of(
        new Project({webUrl: 'bar'})
      ))
      expect(actual).to.have.property('data').that.includes.nested.property('[0].webUrl', 'bar')
    })

    it('should return a timestamp', function () {
      const actual = projectsFetched('irrelevant', List())
      expect(actual).to.have.property('timestamp').that.is.not.empty()
    })

    it('should return the server type', function () {
      const actual = projectsFetched('irrelevant', List.of(
        new Project({serverType: 'some-type'})
      ))
      expect(actual).to.have.property('serverType', 'some-type')
    })

    it('should return whether to include new projects or not', function () {
      const actual = projectsFetched('irrelevant', List(), true)
      expect(actual).to.have.property('includeNew', true)
    })
  })

  describe(PROJECTS_FETCH_ERROR, function () {

    it('should return the correct type', function () {
      const actual = projectsFetchError()
      expect(actual).to.have.property('type', PROJECTS_FETCH_ERROR)
    })

    it('should return the tray id', function () {
      const actual = projectsFetchError('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the errors', function () {
      const actual = projectsFetchError('some-tray-id', List.of('some-error'))
      expect(actual).to.have.property('errors').that.includes('some-error')
    })
  })

  describe(SET_TRAY_NAME, function () {

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

  describe(SET_SERVER_TYPE, function () {

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

  describe(SET_TRAY_USERNAME, function () {

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

  describe(SET_TRAY_URL, function () {

    it('should return the correct type', function () {
      const actual = setTrayUrl()
      expect(actual).to.have.property('type', SET_TRAY_URL)
    })

    it('should return the url', function () {
      const actual = setTrayUrl('irrelevant', 'some-url')
      expect(actual).to.have.property('url', 'some-url')
    })
  })

  describe(SELECT_PROJECT, function () {

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

  describe(SET_INCLUDE_NEW, function () {

    it('should return the correct type', function () {
      const actual = setIncludeNew()
      expect(actual).to.have.property('type', SET_INCLUDE_NEW)
    })

    it('should return the value', function () {
      const actual = setIncludeNew('some-tray-id')
      expect(actual).to.have.property('trayId', 'some-tray-id')
    })

    it('should return the value', function () {
      const actual = setIncludeNew('irrelevant', true)
      expect(actual).to.have.property('value', true)
    })
  })
})
