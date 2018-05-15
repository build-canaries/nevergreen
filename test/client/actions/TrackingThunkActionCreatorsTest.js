import {testThunk, withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'

describe('TrackingThunkActionCreators', function () {

  const generateRandomName = mocks.stub()
  const send = mocks.stub()
  const abortPendingRequest = mocks.stub()
  const fetchAll = mocks.stub()
  const trayAdded = mocks.spy()
  const projectsFetching = mocks.spy()
  const projectsFetched = mocks.spy()
  const projectsFetchError = mocks.spy()
  const setTrayId = mocks.spy()
  const encryptPassword = mocks.spy()

  const {updateTrayId, refreshTray} = withMockedImports('client/actions/TrackingThunkActionCreators', {
    '../common/gateways/ProjectsGateway': {fetchAll},
    '../common/gateways/Gateway': {send, abortPendingRequest},
    '../domain/Tray': {generateRandomName},
    './TrackingActionCreators': {
      trayAdded,
      projectsFetching,
      projectsFetched,
      projectsFetchError,
      setTrayId
    },
    './PasswordThunkActionCreators': {encryptPassword}
  })

  describe('updateTrayId', function () {

    it('should dispatch set tray id', function () {
      const tray = {trayId: 'old-tray-id'}
      return testThunk(updateTrayId(tray, 'new-tray-id')).then(() => {
        expect(setTrayId).to.have.been.calledWith('old-tray-id', 'new-tray-id')
      })
    })

    // TODO: [#195] We can't verify refresh tray gets called as its in the same module
    it('should dispatch refresh tray')
  })

  describe.skip('addTray')

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
      send.resolves([{message: 'some-error'}])
      const tray = {trayId: 'some-tray-id'}

      return testThunk(refreshTray(tray)).then(() => {
        expect(projectsFetchError).to.have.been.calledWith('some-tray-id', ['some-error'])
      })
    })

    it('should dispatch projects fetch error action if the request fails', function () {
      send.rejects({message: 'some-error'})
      const tray = {trayId: 'some-tray-id'}

      return testThunk(refreshTray(tray)).then(() => {
        expect(projectsFetchError).to.have.been.calledWith('some-tray-id', ['Nevergreen some-error'])
      })
    })
  })
})
