import {FeedRequest, fetchAll, interesting, SortBy} from './ProjectsGateway'
import * as gateway from '../gateways/Gateway'
import {buildSavedProject, buildFeed} from '../testHelpers'
import {Prognosis} from '../domain/Project'
import {AuthTypes} from '../domain/Feed'
import {ProjectState} from '../settings/tracking/ProjectsReducer'

describe('fetchAll', () => {

  it('posts only the required data from the given feeds', () => {
    jest.spyOn(gateway, 'post')
    const seen: ProjectState[] = [
      buildSavedProject({trayId: 'some-tray-id', projectId: 'some-project-id'})
    ]
    const feeds = [
      buildFeed({
        authType: AuthTypes.basic,
        includeNew: true,
        encryptedPassword: 'pword',
        serverType: 'GO',
        trayId: 'some-tray-id',
        url: 'url',
        username: 'uname'
      })
    ]
    const expected = {
      feeds: [{
        authType: AuthTypes.basic,
        includeNew: true,
        included: undefined,
        encryptedPassword: 'pword',
        seen: ['some-project-id'],
        serverType: 'GO',
        trayId: 'some-tray-id',
        url: 'url',
        username: 'uname'
      }],
      sort: SortBy.description
    }

    void fetchAll(feeds, seen)

    expect(gateway.post).toBeCalledWith('/api/projects', expected)
  })

  it('posts with access token from the given feeds', () => {
    jest.spyOn(gateway, 'post')
    const seen: ProjectState[] = [buildSavedProject({trayId: 'some-tray-id', projectId: 'some-project-id'})]
    const feeds = [
      buildFeed({
        encryptedAccessToken: 'some-dummy-token',
        authType: AuthTypes.token,
        includeNew: true,
        serverType: 'GO',
        trayId: 'some-tray-id',
        url: 'url'
      })
    ]
    const expected = {
      feeds: [{
        encryptedAccessToken: 'some-dummy-token',
        authType: AuthTypes.token,
        includeNew: true,
        included: undefined,
        seen: ['some-project-id'],
        serverType: 'GO',
        trayId: 'some-tray-id',
        url: 'url'
      }],
      sort: SortBy.description
    }

    void fetchAll(feeds, seen)

    expect(gateway.post).toBeCalledWith('/api/projects', expected)
  })
})

describe('interesting', () => {

  it('maps selected projects to the posted data', () => {
    jest.spyOn(gateway, 'post')
    jest.spyOn(gateway, 'fakeRequest')
    const seen: ProjectState[] = []
    const selected = {'some-tray-id': ['some-project-id']}
    const feeds = [
      buildFeed({
        authType: AuthTypes.basic,
        includeNew: true,
        encryptedPassword: 'some-pword',
        serverType: 'some-server-type',
        trayId: 'some-tray-id',
        url: 'some-url',
        username: 'some-uname'
      })
    ]
    const expected = {
      feeds: [{
        authType: AuthTypes.basic,
        included: ['some-project-id'],
        includeNew: true,
        encryptedPassword: 'some-pword',
        seen: [],
        serverType: 'some-server-type',
        trayId: 'some-tray-id',
        url: 'some-url',
        username: 'some-uname'
      }],
      prognosis: [Prognosis.sick],
      sort: SortBy.default
    }

    void interesting(feeds, seen, selected, [Prognosis.sick], SortBy.default)

    expect(gateway.post).toBeCalledWith('/api/projects', expected)
    expect(gateway.fakeRequest).not.toBeCalled()
  })

  it('does not include feeds with no selected projects and not including new', () => {
    jest.spyOn(gateway, 'post')
    jest.spyOn(gateway, 'fakeRequest')
    const seen: ProjectState[] = []
    const selected = {
      'some-tray-id': ['some-project-id'],
      'none-selected-id': [],
      'none-selected-but-includes-new-id': []
    }
    const feeds = [
      buildFeed({trayId: 'some-tray-id', includeNew: false}),
      buildFeed({trayId: 'none-selected-id', includeNew: false}),
      buildFeed({trayId: 'none-selected-but-includes-new-id', includeNew: true})
    ]

    void interesting(feeds, seen, selected, [], SortBy.default)

    expect(gateway.post).toBeCalledWith(expect.anything(), expect.objectContaining({
      feeds: expect.not.arrayContaining([
        expect.objectContaining({trayId: 'none-selected-id'})
      ]) as ReadonlyArray<FeedRequest>
    }))
    expect(gateway.fakeRequest).not.toBeCalled()
  })

  it('does not call the server at all if no feeds have selected projects and new projects are not included', () => {
    jest.spyOn(gateway, 'post')
    jest.spyOn(gateway, 'fakeRequest')
    const seen: ProjectState[] = []
    const selected = {'some-tray-id': []}
    const feeds = [buildFeed({trayId: 'some-tray-id', includeNew: false})]

    void interesting(feeds, seen, selected, [], SortBy.default)

    expect(gateway.post).not.toBeCalled()
    expect(gateway.fakeRequest).toBeCalledWith([])
  })
})
