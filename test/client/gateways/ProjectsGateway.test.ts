import {fetchAll, interesting} from '../../../src/client/gateways/ProjectsGateway'
import * as gateway from '../../../src/client/gateways/Gateway'
import {buildProject, buildTray} from '../testHelpers'
import {Prognosis, Project} from '../../../src/client/domain/Project'
import {AuthTypes} from '../../../src/client/domain/Tray'

describe('ProjectsGateway', () => {

  describe('fetchAll', () => {

    it('posts only the required data from the given trays', () => {
      jest.spyOn(gateway, 'post')
      jest.spyOn(gateway, 'fakeRequest')
      const seen: Project[] = [buildProject({trayId: 'some-tray-id', projectId: 'some-project-id'})]
      const trays = [
        buildTray({
          authType: AuthTypes.basic,
          includeNew: true,
          password: 'pword',
          serverType: 'GO',
          trayId: 'some-tray-id',
          url: 'url',
          username: 'uname'
        })
      ]
      const expected = [
        {
          accessToken: '',
          authType: AuthTypes.basic,
          includeNew: true,
          password: 'pword',
          seen: ['some-project-id'],
          serverType: 'GO',
          trayId: 'some-tray-id',
          url: 'url',
          username: 'uname'
        }
      ]

      fetchAll(trays, seen)

      expect(gateway.post).toBeCalledWith('/api/projects', expected)
    })

    it('posts with access token from the given trays', () => {
      jest.spyOn(gateway, 'post')
      jest.spyOn(gateway, 'fakeRequest')
      const seen: Project[] = [buildProject({trayId: 'some-tray-id', projectId: 'some-project-id'})]
      const trays = [
        buildTray({
          accessToken: 'some-dummy-token',
          authType: AuthTypes.token,
          includeNew: true,
          serverType: 'GO',
          trayId: 'some-tray-id',
          url: 'url'
        })
      ]
      const expected = [
        {
          accessToken: 'some-dummy-token',
          authType: AuthTypes.token,
          includeNew: true,
          password: '',
          seen: ['some-project-id'],
          serverType: 'GO',
          trayId: 'some-tray-id',
          url: 'url',
          username: ''
        }
      ]

      fetchAll(trays, seen)

      expect(gateway.post).toBeCalledWith('/api/projects', expected)
    })
  })

  describe('interesting', () => {

    it('maps selected projects to the posted data', () => {
      jest.spyOn(gateway, 'post')
      jest.spyOn(gateway, 'fakeRequest')
      const seen: Project[] = []
      const selected = {'some-tray-id': ['some-project-id']}
      const trays = [
        buildTray({
          authType: AuthTypes.basic,
          includeNew: true,
          password: 'some-pword',
          serverType: 'some-server-type',
          trayId: 'some-tray-id',
          url: 'some-url',
          username: 'some-uname'
        })
      ]
      const expected = [
        {
          accessToken: '',
          authType: AuthTypes.basic,
          included: ['some-project-id'],
          includeNew: true,
          password: 'some-pword',
          prognosis: [Prognosis.sick],
          seen: [],
          serverType: 'some-server-type',
          trayId: 'some-tray-id',
          url: 'some-url',
          username: 'some-uname'
        }
      ]

      interesting(trays, seen, selected, [Prognosis.sick])

      expect(gateway.post).toBeCalledWith('/api/projects', expected)
      expect(gateway.fakeRequest).not.toBeCalled()
    })

    it('does not include trays with no selected projects and not including new', () => {
      jest.spyOn(gateway, 'post')
      jest.spyOn(gateway, 'fakeRequest')
      const seen: Project[] = []
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

      interesting(trays, seen, selected, [])

      expect(gateway.post).toBeCalledWith(expect.anything(), expect.arrayContaining([
        expect.objectContaining({trayId: 'some-tray-id'}),
        expect.objectContaining({trayId: 'none-selected-but-includes-new-id'})
      ]))
      expect(gateway.fakeRequest).not.toBeCalled()
    })

    it('does not call the server at all if no trays have selected projects and new projects are not included', () => {
      jest.spyOn(gateway, 'post')
      jest.spyOn(gateway, 'fakeRequest')
      const seen: Project[] = []
      const selected = {'some-tray-id': []}
      const trays = [buildTray({trayId: 'some-tray-id', includeNew: false})]

      interesting(trays, seen, selected, [])

      expect(gateway.post).not.toBeCalled()
      expect(gateway.fakeRequest).toBeCalledWith([])
    })
  })
})
