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

    it('should abort pending request', function () {
      send.resolves('')
      return testThunk(refreshTray({}, 'some-pending-request')).then(() => {
        expect(abortPendingRequest).to.have.been.calledWith('some-pending-request')
      })
    })

    it('should dispatch projects fetching action', function () {
      send.resolves('')
      fetchAll.returns('some-fetch-all-request')
      const tray = {trayId: 'some-tray-id'}

      return testThunk(refreshTray(tray)).then(() => {
        expect(projectsFetching).to.have.been.calledWith('some-tray-id', 'some-fetch-all-request')
      })
    })

    it('should dispatch projects fetched action when no errors are returned', function () {
      send.resolves([])
      const tray = {trayId: 'some-tray-id'}

      return testThunk(refreshTray(tray)).then(() => {
        expect(projectsFetched).to.have.been.calledWith('some-tray-id', [])
      })
    })

    it('should dispatch projects fetch error action if an error is returned', function () {
      send.resolves([{isError: true, errorMessage: 'some-error'}])
      const tray = {trayId: 'some-tray-id'}

      return testThunk(refreshTray(tray)).then(() => {
        expect(projectsFetchError).to.have.been.calledWith('some-tray-id', ['some-error'])
      })
    })

    it('should dispatch projects fetch error action if the request fails', function () {
      send.rejects({message: 'some-error'})
      const tray = {trayId: 'some-tray-id'}

      return testThunk(refreshTray(tray)).then(() => {
        expect(projectsFetchError).to.have.been.calledWith('some-tray-id', ['some-error'])
      })
    })
  })
})
