import {fromJS, List, Map} from 'immutable'
import {Tray} from '../../../src/client/domain/Tray'
import {fetchAll, interesting} from '../../../src/client/gateways/ProjectsGateway'
import * as gateway from '../../../src/client/gateways/Gateway'

describe('ProjectsGateway', () => {

  gateway.post = jest.fn()
  gateway.fakeResponse = jest.fn()

  describe('fetchAll', () => {

    test('posts only the required data from the given trays', () => {
      const seen = fromJS({'some-tray-id': []})
      const trays = List([
        new Tray({
          trayId: 'some-tray-id',
          url: 'url',
          username: 'uname',
          password: 'pword',
          serverType: 'GO',
          timestamp: 'some-time-stamp',
          loaded: false,
          highlight: false
        })
      ])
      const expected = List([
        Map({
          url: 'url',
          trayId: 'some-tray-id',
          username: 'uname',
          password: 'pword',
          serverType: 'GO',
          includeNew: true,
          seen: List([])
        })
      ])

      fetchAll(trays, seen)

      expect(gateway.post.mock.calls[0][0]).toEqual('/api/projects/all')
      expect(gateway.post.mock.calls[0][1]).toEqual(expected)
    })
  })

  describe('interesting', () => {

    test('maps selected projects to the posted data', () => {
      const seen = fromJS({'some-tray-id': []})
      const selected = fromJS({
        'some-tray-id': ['some-project-id']
      })
      const trays = List([
        new Tray({
          trayId: 'some-tray-id',
          url: 'some-url',
          username: 'some-uname',
          password: 'some-pword',
          serverType: 'some-server-type'
        })
      ])
      const expected = List([
        Map({
          url: 'some-url',
          trayId: 'some-tray-id',
          username: 'some-uname',
          includeNew: true,
          password: 'some-pword',
          serverType: 'some-server-type',
          included: List(['some-project-id']),
          seen: List([])
        })
      ])

      interesting(trays, selected, seen)

      expect(gateway.post.mock.calls[0][0]).toEqual('/api/projects/interesting')
      expect(gateway.post.mock.calls[0][1]).toEqual(expected)
      expect(gateway.fakeResponse).not.toBeCalled()
    })

    test('does not include trays with no selected projects and not including new', () => {
      const seen = fromJS({'some-tray-id': []})
      const selected = fromJS({
        'some-tray-id': ['some-project-id'],
        'none-selected-id': [],
        'none-selected-but-includes-new-id': []
      })
      const trays = List([
        new Tray({trayId: 'some-tray-id', includeNew: false}),
        new Tray({trayId: 'none-selected-id', includeNew: false}),
        new Tray({trayId: 'none-selected-but-includes-new-id', includeNew: true})
      ])

      interesting(trays, selected, seen)

      expect(gateway.post.mock.calls[0][1].toJS()).toHaveLength(2)
      expect(gateway.post.mock.calls[0][1].first().toJS()).toHaveProperty('trayId', 'some-tray-id')
      expect(gateway.post.mock.calls[0][1].get(1).toJS()).toHaveProperty('trayId', 'none-selected-but-includes-new-id')
      expect(gateway.fakeResponse).not.toBeCalled()
    })

    test('does not call the server at all if no trays have selected projects and new projects are not included', () => {
      const seen = fromJS({'some-tray-id': []})
      const selected = fromJS({'some-tray-id': []})
      const trays = List([new Tray({trayId: 'some-tray-id', includeNew: false})])

      interesting(trays, selected, seen)

      expect(gateway.post).not.toBeCalled()
      expect(gateway.fakeResponse).toBeCalledWith(List())
    })
  })
})
