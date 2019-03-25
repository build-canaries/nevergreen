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

describe('TrackingActionCreators', () => {

  describe(TRAY_ADDED, () => {

    test('should return the correct type', () => {
      const actual = trayAdded()
      expect(actual).toHaveProperty('type', TRAY_ADDED)
    })

    test('should return the tray id', () => {
      const actual = trayAdded('some-tray-id')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
      expect(actual.data.toJS()).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the tray url', () => {
      const actual = trayAdded('irrelevant', 'some-url')
      expect(actual.data.toJS()).toHaveProperty('url', 'some-url')
    })

    test('should return the tray username', () => {
      const actual = trayAdded('irrelevant', 'irrelevant', 'some-username')
      expect(actual.data.toJS()).toHaveProperty('username', 'some-username')
    })

    test('should return a generated tray name', () => {
      const actual = trayAdded()
      expect(actual.data.toJS().name).not.toBeNull()
    })

    test('should return highlight', () => {
      const actual = trayAdded('irrelevant', 'irrelevant', 'some-username')
      expect(actual.data.toJS()).toHaveProperty('highlight', true)
    })
  })

  describe(HIGHLIGHT_TRAY, () => {

    test('should return the correct type', () => {
      const actual = highlightTray()
      expect(actual).toHaveProperty('type', HIGHLIGHT_TRAY)
    })

    test('should return the tray id', () => {
      const actual = highlightTray('some-tray-id')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })
  })

  describe(REMOVE_TRAY, () => {

    test('should return the correct type', () => {
      const actual = removeTray()
      expect(actual).toHaveProperty('type', REMOVE_TRAY)
    })

    test('should return the tray id', () => {
      const actual = removeTray('some-tray-id')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should abort the pending request', () => {
      const abort = jest.fn()
      removeTray('some-tray-id', {abort})
      expect(abort).toBeCalled()
    })
  })

  describe(PROJECTS_FETCHING, () => {

    test('should return the correct type', () => {
      const actual = projectsFetching()
      expect(actual).toHaveProperty('type', PROJECTS_FETCHING)
    })

    test('should return the tray id', () => {
      const actual = projectsFetching('some-tray-id')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the request', () => {
      const actual = projectsFetching('irrelevant', 'some-request')
      expect(actual).toHaveProperty('request', 'some-request')
    })
  })

  describe(PROJECTS_FETCHED, () => {

    test('should return the correct type', () => {
      const actual = projectsFetched('irrelevant', List())
      expect(actual).toHaveProperty('type', PROJECTS_FETCHED)
    })

    test('should return the tray id', () => {
      const actual = projectsFetched('some-tray-id', List())
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the projects', () => {
      const actual = projectsFetched('irrelevant', List.of(
        new Project({webUrl: 'bar'})
      ))
      expect(actual.data.toJS()[0]).toHaveProperty('webUrl', 'bar')
    })

    test('should return a timestamp', () => {
      const actual = projectsFetched('irrelevant', List())
      expect(actual).toHaveProperty('timestamp')
    })

    test('should return the server type', () => {
      const actual = projectsFetched('irrelevant', List.of(
        new Project({serverType: 'some-type'})
      ))
      expect(actual).toHaveProperty('serverType', 'some-type')
    })

    test('should return whether to include new projects or not', () => {
      const actual = projectsFetched('irrelevant', List(), true)
      expect(actual).toHaveProperty('includeNew', true)
    })
  })

  describe(PROJECTS_FETCH_ERROR, () => {

    test('should return the correct type', () => {
      const actual = projectsFetchError()
      expect(actual).toHaveProperty('type', PROJECTS_FETCH_ERROR)
    })

    test('should return the tray id', () => {
      const actual = projectsFetchError('some-tray-id')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the errors', () => {
      const actual = projectsFetchError('some-tray-id', List.of('some-error'))
      expect(actual.errors.toJS()).toEqual(['some-error'])
    })
  })

  describe(SET_TRAY_NAME, () => {

    test('should return the correct type', () => {
      const actual = setTrayName()
      expect(actual).toHaveProperty('type', SET_TRAY_NAME)
    })

    test('should return the tray id', () => {
      const actual = setTrayName('some-tray-id')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the tray name', () => {
      const actual = setTrayName('irrelevant', 'some-name')
      expect(actual).toHaveProperty('name', 'some-name')
    })
  })

  describe(SET_SERVER_TYPE, () => {

    test('should return the correct type', () => {
      const actual = setServerType()
      expect(actual).toHaveProperty('type', SET_SERVER_TYPE)
    })

    test('should return the tray id', () => {
      const actual = setServerType('some-tray-id')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the server type', () => {
      const actual = setServerType('irrelevant', 'some-type')
      expect(actual).toHaveProperty('serverType', 'some-type')
    })
  })

  describe(SET_TRAY_USERNAME, () => {

    test('should return the correct type', () => {
      const actual = setTrayUsername()
      expect(actual).toHaveProperty('type', SET_TRAY_USERNAME)
    })

    test('should return the tray id', () => {
      const actual = setTrayUsername('some-tray-id')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the tray username', () => {
      const actual = setTrayUsername('irrelevant', 'some-username')
      expect(actual).toHaveProperty('username', 'some-username')
    })
  })

  describe(SET_TRAY_URL, () => {

    test('should return the correct type', () => {
      const actual = setTrayUrl()
      expect(actual).toHaveProperty('type', SET_TRAY_URL)
    })

    test('should return the url', () => {
      const actual = setTrayUrl('irrelevant', 'some-url')
      expect(actual).toHaveProperty('url', 'some-url')
    })
  })

  describe(SELECT_PROJECT, () => {

    test('should return the correct type', () => {
      const actual = selectProject()
      expect(actual).toHaveProperty('type', SELECT_PROJECT)
    })

    test('should return the tray id', () => {
      const actual = selectProject('some-tray-id')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the web url', () => {
      const actual = selectProject('irrelevant', 'some-project-url')
      expect(actual).toHaveProperty('projectId', 'some-project-url')
    })

    test('should return if the project was selected', () => {
      const actual = selectProject('irrelevant', 'irrelevant', true)
      expect(actual).toHaveProperty('selected', true)
    })
  })

  describe(SET_INCLUDE_NEW, () => {

    test('should return the correct type', () => {
      const actual = setIncludeNew()
      expect(actual).toHaveProperty('type', SET_INCLUDE_NEW)
    })

    test('should return the value', () => {
      const actual = setIncludeNew('some-tray-id')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the value', () => {
      const actual = setIncludeNew('irrelevant', true)
      expect(actual).toHaveProperty('value', true)
    })
  })
})
