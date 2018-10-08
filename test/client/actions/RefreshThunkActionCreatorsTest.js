import {testThunk, withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'
import {fromJS, List, Map} from 'immutable'
import {Tray} from '../../../src/client/domain/Tray'
import {NevergreenError} from '../../../src/client/common/gateways/NevergreenGateway'

describe('RefreshThunkActionCreators', function () {

  const send = mocks.stub()
  const abortPendingRequest = mocks.stub()
  const fetchAll = mocks.stub()
  const projectsFetching = mocks.spy()
  const projectsFetched = mocks.spy()
  const projectsFetchError = mocks.spy()

  const {refreshTray} = withMockedImports('client/actions/RefreshThunkActionCreators', {
    '../common/gateways/ProjectsGateway': {fetchAll},
    '../common/gateways/Gateway': {abortPendingRequest},
    '../common/gateways/NevergreenGateway': {send},
    './TrackingActionCreators': {projectsFetching, projectsFetched, projectsFetchError}
  })

  describe('refreshTray', function () {

    const tray = new Tray({
      pendingRequest: 'some-pending-request'
    })

    const requiredState = Map({
      trays: Map({
        'some-tray-id': tray
      })
    })

    it('should abort pending request', async function () {
      send.resolves(List())
      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(abortPendingRequest).to.have.been.calledWith('some-pending-request')
    })

    it('should create a fetch all request with the tray', async function () {
      send.resolves(List())
      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(fetchAll).to.have.been.calledWith(List.of(tray))
    })

    it('should dispatch projects fetching action', async function () {
      send.resolves(List())
      fetchAll.returns('some-fetch-all-request')

      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(projectsFetching).to.have.been.calledWith('some-tray-id', 'some-fetch-all-request')
    })

    it('should dispatch projects fetched action when no errors are returned', async function () {
      send.resolves(List())
      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(projectsFetched).to.have.been.calledWith('some-tray-id', List())
    })

    it('should dispatch projects fetch error action if an error is returned', async function () {
      send.resolves(fromJS([{isError: true, errorMessage: 'some-error'}]))
      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(projectsFetchError.getCall(0).args[0]).to.equal('some-tray-id')
      expect(projectsFetchError.getCall(0).args[1]).to.equal(List.of('some-error'))
    })

    it('should dispatch projects fetch error action if the request fails', async function () {
      send.rejects(new NevergreenError({message: 'some-error'}))
      await testThunk(refreshTray('some-tray-id'), requiredState)
      expect(projectsFetchError).to.have.been.calledWith('some-tray-id', List.of('some-error'))
    })
  })
})
