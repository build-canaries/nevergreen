import {FeedRequest, fetchAll, interesting, SortBy} from './ProjectsGateway'
import * as gateway from '../gateways/Gateway'
import {buildSavedProject, buildTray} from '../testHelpers'
import {Prognosis} from '../domain/Project'
import {AuthTypes} from '../domain/Tray'
import {ProjectState} from '../tracking/ProjectsReducer'

describe('fetchAll', () => {

  it('posts only the required data from the given trays', () => {
    jest.spyOn(gateway, 'post')
    const seen: ProjectState[] = [
      buildSavedProject({trayId: 'some-tray-id', projectId: 'some-project-id'})
    ]
    const trays = [
      buildTray({
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
        accessToken: '',
        authType: AuthTypes.basic,
        includeNew: true,
        included: undefined,
        password: 'pword',
        seen: ['some-project-id'],
        serverType: 'GO',
        trayId: 'some-tray-id',
        url: 'url',
        username: 'uname'
      }],
      sort: SortBy.description
    }

    void fetchAll(trays, seen)

    expect(gateway.post).toBeCalledWith('/api/projects', expected)
  })

  it('posts with access token from the given trays', () => {
    jest.spyOn(gateway, 'post')
    const seen: ProjectState[] = [buildSavedProject({trayId: 'some-tray-id', projectId: 'some-project-id'})]
    const trays = [
      buildTray({
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
        accessToken: 'some-dummy-token',
        authType: AuthTypes.token,
        includeNew: true,
        included: undefined,
        password: '',
        seen: ['some-project-id'],
        serverType: 'GO',
        trayId: 'some-tray-id',
        url: 'url',
        username: ''
      }],
      sort: SortBy.description
    }

    void fetchAll(trays, seen)

    expect(gateway.post).toBeCalledWith('/api/projects', expected)
  })
})

describe('interesting', () => {

  it('maps selected projects to the posted data', () => {
    jest.spyOn(gateway, 'post')
    jest.spyOn(gateway, 'fakeRequest')
    const seen: ProjectState[] = []
    const selected = {'some-tray-id': ['some-project-id']}
    const trays = [
      buildTray({
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
        accessToken: '',
        authType: AuthTypes.basic,
        included: ['some-project-id'],
        includeNew: true,
        password: 'some-pword',
        seen: [],
        serverType: 'some-server-type',
        trayId: 'some-tray-id',
        url: 'some-url',
        username: 'some-uname'
      }],
      prognosis: [Prognosis.sick],
      sort: SortBy.default
    }

    void interesting(trays, seen, selected, [Prognosis.sick], SortBy.default)

    expect(gateway.post).toBeCalledWith('/api/projects', expected)
    expect(gateway.fakeRequest).not.toBeCalled()
  })

  it('does not include trays with no selected projects and not including new', () => {
    jest.spyOn(gateway, 'post')
    jest.spyOn(gateway, 'fakeRequest')
    const seen: ProjectState[] = []
    const selected = {
      'some-tray-id': ['some-project-id'],
      'none-selected-id': [],
      'none-selected-but-includes-new-id': []
    }
    const trays = [
      buildTray({trayId: 'some-tray-id', includeNew: false}),
      buildTray({trayId: 'none-selected-id', includeNew: false}),
      buildTray({trayId: 'none-selected-but-includes-new-id', includeNew: true})
    ]

    void interesting(trays, seen, selected, [], SortBy.default)

    expect(gateway.post).toBeCalledWith(expect.anything(), expect.objectContaining({
      feeds: expect.not.arrayContaining([
        expect.objectContaining({trayId: 'none-selected-id'})
      ]) as ReadonlyArray<FeedRequest>
    }))
    expect(gateway.fakeRequest).not.toBeCalled()
  })

  it('does not call the server at all if no trays have selected projects and new projects are not included', () => {
    jest.spyOn(gateway, 'post')
    jest.spyOn(gateway, 'fakeRequest')
    const seen: ProjectState[] = []
    const selected = {'some-tray-id': []}
    const trays = [buildTray({trayId: 'some-tray-id', includeNew: false})]

    void interesting(trays, seen, selected, [], SortBy.default)

    expect(gateway.post).not.toBeCalled()
    expect(gateway.fakeRequest).toBeCalledWith([])
  })
})
