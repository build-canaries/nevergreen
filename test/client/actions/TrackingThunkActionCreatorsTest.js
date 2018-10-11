import {testThunk, withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'
import {fromJS} from 'immutable'
import {TRAYS_ROOT} from '../../../src/client/reducers/TraysReducer'

describe('TrackingThunkActionCreators', function () {

  const trayAdded = mocks.spy()
  const setTrayId = mocks.spy()
  const encryptPassword = mocks.stub()
  const highlightTray = mocks.spy()
  const refreshTray = mocks.spy()
  const createId = mocks.stub()

  const {updateTrayId, addTray} = withMockedImports('client/actions/TrackingThunkActionCreators', {
    './TrackingActionCreators': {trayAdded, setTrayId, highlightTray},
    './PasswordThunkActionCreators': {encryptPassword},
    './RefreshThunkActionCreators': {refreshTray},
    '../domain/Tray': {createId}
  })

  describe('updateTrayId', function () {

    it('should dispatch set tray id', async function () {
      await testThunk(updateTrayId('old-tray-id', 'new-tray-id'))
      expect(setTrayId).to.have.been.calledWith('old-tray-id', 'new-tray-id')
    })

    it('should dispatch refresh tray', async function () {
      await testThunk(updateTrayId('old-tray-id', 'new-tray-id'))
      expect(refreshTray).to.have.been.calledWith('new-tray-id')
    })
  })

  describe('addTray', function () {

    const requiredState = fromJS({
      [TRAYS_ROOT]: {}
    })

    it('should dispatch highlight tray action if the tray already exists', async function () {
      const state = requiredState.set(TRAYS_ROOT, fromJS({'some-tray-id': {}}))
      createId.withArgs('http://url').returns('some-tray-id')

      await testThunk(addTray('http://url', 'irrelevant', 'irrelevant'), state)

      expect(highlightTray).to.have.been.calledWith('some-tray-id')
    })

    describe('tray does not exist already', function () {

      it('should dispatch tray added action without the password, as that needs to be encrypted', async function () {
        createId.withArgs('http://url').returns('some-tray-id')
        await testThunk(addTray('http://url', 'some-username', 'some-password'), requiredState)
        expect(trayAdded).to.have.been.calledWith('some-tray-id', 'http://url', 'some-username')
      })

      it('should dispatch encrypt password if the password given is not blank', async function () {
        createId.withArgs('http://url').returns('some-tray-id')
        await testThunk(addTray('http://url', 'some-username', 'some-password'), requiredState)
        expect(encryptPassword).to.have.been.calledWith('some-tray-id', 'some-password')
      })

      it('should not dispatch encrypt password if the password given is blank', async function () {
        createId.withArgs('http://url').returns('some-tray-id')
        await testThunk(addTray('http://url', 'irrelevant', ''), requiredState)
        expect(encryptPassword).not.to.have.been.called()
      })

      it('should dispatch refresh tray, with the select all projects flag as true', async function () {
        createId.withArgs('http://url').returns('some-tray-id')
        await testThunk(addTray('http://url', 'some-username', ''), requiredState)
        expect(refreshTray).to.have.been.calledWith('some-tray-id', true)
      })
    })
  })
})
