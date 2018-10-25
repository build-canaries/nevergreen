import {withMockedImports} from '../../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../../Mocking'
import {fromJS, List, Map} from 'immutable'
import {Tray} from '../../../../src/client/domain/Tray'

describe('ProjectsGateway', function () {

  const post = mocks.stub()
  const fakeResponse = mocks.stub()

  const {fetchAll, interesting} = withMockedImports('client/common/gateways/ProjectsGateway', {
    './Gateway': {post, fakeResponse}
  })

  describe('fetchAll', function () {

    it('posts only the required data from the given trays', () => {
      const trays = List([
        new Tray({
          trayId: 'url',
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
          trayId: 'url',
          username: 'uname',
          password: 'pword',
          serverType: 'GO'
        })
      ])

      fetchAll(trays)

      expect(post.getCall(0).args[0]).to.equal('/api/projects/all')
      expect(post.getCall(0).args[1]).to.equal(expected)
    })
  })

  describe('interesting', function () {

    it('maps selected projects to the posted data', function () {
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
          password: 'some-pword',
          serverType: 'some-server-type',
          included: List(['some-project-id'])
        })
      ])

      interesting(trays, selected)

      expect(post.getCall(0).args[0]).to.equal('/api/projects/interesting')
      expect(post.getCall(0).args[1]).to.equal(expected)
      expect(fakeResponse).to.not.have.been.called()
    })

    it('does not include trays with no selected projects', function () {
      const selected = fromJS({
        'some-tray-id': ['some-project-id'],
        'none-selected-id': []
      })
      const trays = List([
        new Tray({trayId: 'some-tray-id'}),
        new Tray({trayId: 'none-selected-id'})
      ])

      interesting(trays, selected)

      expect(post.getCall(0).args[1]).to.have.size(1)
      expect(post.getCall(0).args[1].first()).to.have.property('trayId', 'some-tray-id')
      expect(fakeResponse).to.not.have.been.called()
    })

    it('does not call the server at all if no trays have selected projects', function () {
      const selected = fromJS({'some-tray-id': []})
      const trays = List([new Tray({trayId: 'some-tray-id'})])

      interesting(trays, selected)

      expect(post).to.not.have.been.called()
      expect(fakeResponse).to.have.been.calledWith(List())
    })
  })
})
