import {fetchAll, interesting} from '../../../src/client/gateways/ProjectsGateway'
import * as gateway from '../../../src/client/gateways/Gateway'
import {buildTray} from '../testHelpers'

describe('ProjectsGateway', () => {

  describe('fetchAll', () => {

    test('posts only the required data from the given trays', () => {
      jest.spyOn(gateway, 'post')
      jest.spyOn(gateway, 'fakeRequest')
      const seen = {'some-tray-id': {}}
      const trays = [
        buildTray({
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
          includeNew: true,
          password: 'pword',
          seen: [],
          serverType: 'GO',
          trayId: 'some-tray-id',
          url: 'url',
          username: 'uname'
        }
      ]

      fetchAll(trays, seen)

      expect(gateway.post).toBeCalledWith('/api/projects/all', expected)
    })
  })

  describe('interesting', () => {

    test('maps selected projects to the posted data', () => {
      jest.spyOn(gateway, 'post')
      jest.spyOn(gateway, 'fakeRequest')
      const seen = {'some-tray-id': {}}
      const selected = {'some-tray-id': ['some-project-id']}
      const trays = [
        buildTray({
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
          included: ['some-project-id'],
          includeNew: true,
          password: 'some-pword',
          seen: [],
          serverType: 'some-server-type',
          trayId: 'some-tray-id',
          url: 'some-url',
          username: 'some-uname'
        }
      ]

      interesting(trays, selected, seen)

      expect(gateway.post).toBeCalledWith('/api/projects/interesting', expected)
      expect(gateway.fakeRequest).not.toBeCalled()
    })

    test('does not include trays with no selected projects and not including new', () => {
      jest.spyOn(gateway, 'post')
      jest.spyOn(gateway, 'fakeRequest')
      const seen = {
        'some-tray-id': {},
        'none-selected-id': {},
        'none-selected-but-includes-new-id': {}
      }
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

      interesting(trays, selected, seen)

      expect(gateway.post).toBeCalledWith(expect.anything(), expect.arrayContaining([
        expect.objectContaining({trayId: 'some-tray-id'}),
        expect.objectContaining({trayId: 'none-selected-but-includes-new-id'})
      ]))
      expect(gateway.fakeRequest).not.toBeCalled()
    })

    test('does not call the server at all if no trays have selected projects and new projects are not included', () => {
      jest.spyOn(gateway, 'post')
      jest.spyOn(gateway, 'fakeRequest')
      const seen = {'some-tray-id': {}}
      const selected = {'some-tray-id': []}
      const trays = [buildTray({trayId: 'some-tray-id', includeNew: false})]

      interesting(trays, selected, seen)

      expect(gateway.post).not.toBeCalled()
      expect(gateway.fakeRequest).toBeCalledWith([])
    })
  })
})
