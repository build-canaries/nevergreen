import {testThunk, withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'

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

    it('should abort pending request', async function () {
      send.resolves('')
      await testThunk(refreshTray({}, 'some-pending-request'))
      expect(abortPendingRequest).to.have.been.calledWith('some-pending-request')
    })

    it('should dispatch projects fetching action', async function () {
      send.resolves('')
      fetchAll.returns('some-fetch-all-request')
      const tray = {trayId: 'some-tray-id'}

      await testThunk(refreshTray(tray))
      expect(projectsFetching).to.have.been.calledWith('some-tray-id', 'some-fetch-all-request')
    })

    it('should dispatch projects fetched action when no errors are returned', async function () {
      send.resolves([])
      const tray = {trayId: 'some-tray-id'}

      await testThunk(refreshTray(tray))
      expect(projectsFetched).to.have.been.calledWith('some-tray-id', [])
    })

    it('should dispatch projects fetch error action if an error is returned', async function () {
      send.resolves([{isError: true, errorMessage: 'some-error'}])
      const tray = {trayId: 'some-tray-id'}

      await testThunk(refreshTray(tray))
      expect(projectsFetchError).to.have.been.calledWith('some-tray-id', ['some-error'])
    })

    it('should dispatch projects fetch error action if the request fails', async function () {
      send.rejects({message: 'some-error'})
      const tray = {trayId: 'some-tray-id'}

      await testThunk(refreshTray(tray))
      expect(projectsFetchError).to.have.been.calledWith('some-tray-id', ['some-error'])
    })
  })
})
