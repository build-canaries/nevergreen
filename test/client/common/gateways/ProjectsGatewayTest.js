import {withMockedImports} from '../../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../../Mocking'

describe('ProjectsGateway', function () {

  const post = mocks.stub()
  const fakeResponse = mocks.stub()

  const {fetchAll, interesting} = withMockedImports('client/common/gateways/ProjectsGateway', {
    './Gateway': {post, fakeResponse}
  })

  describe('fetchAll', function () {

    it('posts only the required data from the given trays', () => {
      const trays = [{
        trayId: 'url',
        url: 'url',
        username: 'uname',
        password: 'pword',
        serverType: 'GO',
        foo: 'bar'
      }, {
        trayId: 'another-url',
        url: 'another-url',
        username: 'another-uname',
        password: 'another-pword',
        serverType: 'GO',
        extra: 'i-should-get-removed'
      }]
      const expected = [{
        trayId: 'url',
        url: 'url',
        username: 'uname',
        password: 'pword',
        serverType: 'GO'
      }, {
        trayId: 'another-url',
        url: 'another-url',
        username: 'another-uname',
        password: 'another-pword',
        serverType: 'GO'
      }]

      fetchAll(trays)

      expect(post).to.have.been.calledWith('/api/projects/all', expected)
    })
  })

  describe('interesting', function () {

    it('maps selected projects to the posted data', function () {
      const selected = {'some-tray-id': ['some-project-id']}
      const trays = [{
        trayId: 'some-tray-id',
        url: 'some-url',
        username: 'some-uname',
        password: 'some-pword',
        serverType: 'some-server-type'
      }]
      const expected = [{
        trayId: 'some-tray-id',
        url: 'some-url',
        username: 'some-uname',
        password: 'some-pword',
        included: ['some-project-id'],
        serverType: 'some-server-type'
      }]

      interesting(trays, selected)

      expect(post).to.have.been.calledWith('/api/projects/interesting', expected)
      expect(fakeResponse).to.not.have.been.called()
    })

    it('does not include trays with no selected projects', function () {
      const selected = {'some-tray-id': ['some-project-id'], 'none-selected-id': []}
      const trays = [{trayId: 'some-tray-id'}, {trayId: 'none-selected-id'}]
      const expected = [mocks.match({trayId: 'some-tray-id'})]

      interesting(trays, selected)

      expect(post).to.have.been.calledWithMatch('/api/projects/interesting', mocks.match(expected))
      expect(fakeResponse).to.not.have.been.called()
    })

    it('does not call the server at all if no trays have selected projects', function () {
      const selected = {'some-tray-id': []}
      const trays = [{trayId: 'some-tray-id'}]

      interesting(trays, selected)

      expect(post).to.not.have.been.called()
      expect(fakeResponse).to.have.been.called()
    })
  })
})
