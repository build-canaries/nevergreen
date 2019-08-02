import {Actions} from '../../../src/client/actions/Actions'
import {
  highlightTray,
  projectsFetched,
  projectsFetchError,
  projectsFetching,
  removeTray,
  selectProject,
  setAuthType,
  setIncludeNew,
  setServerType,
  setTrayName,
  setTrayUrl,
  setTrayUsername,
  trayAdded
} from '../../../src/client/actions/TrackingActionCreators'
import {fakeRequest} from '../../../src/client/gateways/Gateway'
import {buildProject} from '../testHelpers'
import {AuthTypes} from '../../../src/client/domain/Tray'

describe('TrackingActionCreators', () => {

  describe(Actions.TRAY_ADDED, () => {

    test('should return the correct type', () => {
      const actual = trayAdded('irrelevant', 'irrelevant', {type: AuthTypes.none})
      expect(actual).toHaveProperty('type', Actions.TRAY_ADDED)
    })

    test('should return the tray id', () => {
      const actual = trayAdded('some-tray-id', 'irrelevant', {type: AuthTypes.none})
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
      expect(actual.data).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the tray url', () => {
      const actual = trayAdded('irrelevant', 'some-url', {type: AuthTypes.none})
      expect(actual.data).toHaveProperty('url', 'some-url')
    })

    test('should return the tray username', () => {
      const username = 'some-username'
      const password = 'irrelevant'
      const auth = {type: AuthTypes.basic as AuthTypes.basic, username, password}
      const actual = trayAdded('irrelevant', 'irrelevant', auth)
      expect(actual.data).toHaveProperty('username', 'some-username')
    })

    test('should return a generated tray name', () => {
      const actual = trayAdded('irrelevant', 'irrelevant', {type: AuthTypes.none})
      expect(actual.data.name).not.toBeNull()
    })

    test('should return highlight', () => {
      const actual = trayAdded('irrelevant', 'irrelevant', {type: AuthTypes.none})
      expect(actual.data).toHaveProperty('highlight', true)
    })
  })

  describe(Actions.HIGHLIGHT_TRAY, () => {

    test('should return the correct type', () => {
      const actual = highlightTray('irrelevant')
      expect(actual).toHaveProperty('type', Actions.HIGHLIGHT_TRAY)
    })

    test('should return the tray id', () => {
      const actual = highlightTray('some-tray-id')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })
  })

  describe(Actions.REMOVE_TRAY, () => {

    test('should return the correct type', () => {
      const actual = removeTray('irrelevant')
      expect(actual).toHaveProperty('type', Actions.REMOVE_TRAY)
    })

    test('should return the tray id', () => {
      const actual = removeTray('some-tray-id')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })
  })

  describe(Actions.PROJECTS_FETCHING, () => {

    test('should return the correct type', () => {
      const actual = projectsFetching('irrelevant', fakeRequest('irrelevant'))
      expect(actual).toHaveProperty('type', Actions.PROJECTS_FETCHING)
    })

    test('should return the tray id', () => {
      const actual = projectsFetching('some-tray-id', fakeRequest('irrelevant'))
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the request', () => {
      const request = fakeRequest('irrelevant')
      const actual = projectsFetching('irrelevant', request)
      expect(actual).toHaveProperty('request', request)
    })
  })

  describe(Actions.PROJECTS_FETCHED, () => {

    test('should return the correct type', () => {
      const actual = projectsFetched('irrelevant', [], false)
      expect(actual).toHaveProperty('type', Actions.PROJECTS_FETCHED)
    })

    test('should return the tray id', () => {
      const actual = projectsFetched('some-tray-id', [], false)
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the projects', () => {
      const actual = projectsFetched('irrelevant', [buildProject({url: 'bar'})], false)
      expect(actual.data[0]).toHaveProperty('url', 'bar')
    })

    test('should return a timestamp', () => {
      const actual = projectsFetched('irrelevant', [], false)
      expect(actual).toHaveProperty('timestamp')
    })

    test('should return the server type', () => {
      const actual = projectsFetched('irrelevant', [buildProject({serverType: 'some-type'})], false)
      expect(actual).toHaveProperty('serverType', 'some-type')
    })

    test('should return whether to include new projects or not', () => {
      const actual = projectsFetched('irrelevant', [], true)
      expect(actual).toHaveProperty('includeNew', true)
    })
  })

  describe(Actions.PROJECTS_FETCH_ERROR, () => {

    test('should return the correct type', () => {
      const actual = projectsFetchError('irrelevant', [])
      expect(actual).toHaveProperty('type', Actions.PROJECTS_FETCH_ERROR)
    })

    test('should return the tray id', () => {
      const actual = projectsFetchError('some-tray-id', [])
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the errors', () => {
      const actual = projectsFetchError('some-tray-id', ['some-error'])
      expect(actual.errors).toEqual(['some-error'])
    })
  })

  describe(Actions.SET_TRAY_NAME, () => {

    test('should return the correct type', () => {
      const actual = setTrayName('irrelevant', 'irrelevant')
      expect(actual).toHaveProperty('type', Actions.SET_TRAY_NAME)
    })

    test('should return the tray id', () => {
      const actual = setTrayName('some-tray-id', 'irrelevant')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the tray name', () => {
      const actual = setTrayName('irrelevant', 'some-name')
      expect(actual).toHaveProperty('name', 'some-name')
    })
  })

  describe(Actions.SET_SERVER_TYPE, () => {

    test('should return the correct type', () => {
      const actual = setServerType('irrelevant', 'irrelevant')
      expect(actual).toHaveProperty('type', Actions.SET_SERVER_TYPE)
    })

    test('should return the tray id', () => {
      const actual = setServerType('some-tray-id', 'irrelevant')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the server type', () => {
      const actual = setServerType('irrelevant', 'some-type')
      expect(actual).toHaveProperty('serverType', 'some-type')
    })
  })

  describe(Actions.SET_TRAY_AUTH_TYPE, () => {

    test('should return the correct type', () => {
      const actual = setAuthType('irrelevant', AuthTypes.basic)
      expect(actual).toHaveProperty('type', Actions.SET_TRAY_AUTH_TYPE)
    })

    test('should return the tray id', () => {
      const actual = setAuthType('some-tray-id', AuthTypes.basic)
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the auth type', () => {
      const actual = setAuthType('irrelevant', AuthTypes.basic)
      expect(actual).toHaveProperty('authType', AuthTypes.basic)
    })
  })

  describe(Actions.SET_TRAY_USERNAME, () => {

    test('should return the correct type', () => {
      const actual = setTrayUsername('irrelevant', 'irrelevant')
      expect(actual).toHaveProperty('type', Actions.SET_TRAY_USERNAME)
    })

    test('should return the tray id', () => {
      const actual = setTrayUsername('some-tray-id', 'irrelevant')
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the tray username', () => {
      const actual = setTrayUsername('irrelevant', 'some-username')
      expect(actual).toHaveProperty('username', 'some-username')
    })
  })

  describe(Actions.SET_TRAY_URL, () => {

    test('should return the correct type', () => {
      const actual = setTrayUrl('irrelevant', 'irrelevant')
      expect(actual).toHaveProperty('type', Actions.SET_TRAY_URL)
    })

    test('should return the url', () => {
      const actual = setTrayUrl('irrelevant', 'some-url')
      expect(actual).toHaveProperty('url', 'some-url')
    })
  })

  describe(Actions.SELECT_PROJECT, () => {

    test('should return the correct type', () => {
      const actual = selectProject('irrelevant', 'irrelevant', false)
      expect(actual).toHaveProperty('type', Actions.SELECT_PROJECT)
    })

    test('should return the tray id', () => {
      const actual = selectProject('some-tray-id', 'irrelevant', false)
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the web url', () => {
      const actual = selectProject('irrelevant', 'some-project-url', false)
      expect(actual).toHaveProperty('projectId', 'some-project-url')
    })

    test('should return if the project was selected', () => {
      const actual = selectProject('irrelevant', 'irrelevant', true)
      expect(actual).toHaveProperty('selected', true)
    })
  })

  describe(Actions.SET_INCLUDE_NEW, () => {

    test('should return the correct type', () => {
      const actual = setIncludeNew('irrelevant', false)
      expect(actual).toHaveProperty('type', Actions.SET_INCLUDE_NEW)
    })

    test('should return the value', () => {
      const actual = setIncludeNew('some-tray-id', false)
      expect(actual).toHaveProperty('trayId', 'some-tray-id')
    })

    test('should return the value', () => {
      const actual = setIncludeNew('irrelevant', true)
      expect(actual).toHaveProperty('value', true)
    })
  })
})
