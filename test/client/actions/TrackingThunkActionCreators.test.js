import {testThunk, withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'
import {fromJS} from 'immutable'
import {TRAYS_ROOT} from '../../../src/client/reducers/TraysReducer'
import {Tray} from '../../../src/client/domain/Tray'

describe('TrackingThunkActionCreators', function () {

  const trayAdded = mocks.spy()
  const setTrayId = mocks.spy()
  const encryptPassword = mocks.stub()
  const highlightTray = mocks.spy()
  const refreshTray = mocks.spy()
  const createId = mocks.stub()

  const {addTray, checkRefresh} = withMockedImports('client/actions/TrackingThunkActionCreators', {
    './TrackingActionCreators': {trayAdded, setTrayId, highlightTray},
    './PasswordThunkActionCreators': {encryptPassword},
    './RefreshThunkActionCreators': {refreshTray},
    '../domain/Tray': {createId}
  })

  describe('addTray', function () {

    const requiredState = fromJS({
      [TRAYS_ROOT]: {}
    })

    it('should do nothing if the entered URL is blank', async function () {
      await testThunk(addTray('', 'irrelevant', 'irrelevant'), requiredState)
      expect(highlightTray).to.have.not.been.called()
      expect(encryptPassword).to.have.not.been.called()
      expect(refreshTray).to.have.not.been.called()
    })

    it('should dispatch highlight tray action if the tray already exists', async function () {
      const tray = new Tray({trayId: 'some-tray-id', url: 'http://url'})
      const state = requiredState.set(TRAYS_ROOT, fromJS({'some-tray-id': tray}))
      await testThunk(addTray('http://url', 'irrelevant', 'irrelevant'), state)
      expect(highlightTray).to.have.been.calledWith('some-tray-id')
    })

    describe('tray does not exist already', function () {

      it('should dispatch tray added action without the password, as that needs to be encrypted', async function () {
        createId.returns('some-tray-id')
        await testThunk(addTray('http://url', 'some-username', 'some-password'), requiredState)
        expect(trayAdded).to.have.been.calledWith('some-tray-id', 'http://url', 'some-username')
      })

      it('should dispatch encrypt password if the password given is not blank', async function () {
        createId.returns('some-tray-id')
        await testThunk(addTray('http://url', 'some-username', 'some-password'), requiredState)
        expect(encryptPassword).to.have.been.calledWith('some-tray-id', 'some-password')
      })

      it('should not dispatch encrypt password if the password given is blank', async function () {
        createId.returns('some-tray-id')
        await testThunk(addTray('http://url', 'irrelevant', ''), requiredState)
        expect(encryptPassword).not.to.have.been.called()
      })

      it('should dispatch refresh tray to fetch projects', async function () {
        createId.returns('some-tray-id')
        await testThunk(addTray('http://url', 'some-username', ''), requiredState)
        expect(refreshTray).to.have.been.calledWith('some-tray-id')
      })
    })
  })

  describe('checkRefresh', function () {

    const requiredState = fromJS({
      [TRAYS_ROOT]: {
        'some-tray-id': new Tray()
      }
    })

    it('should do nothing if the tray does not require a refresh', async function () {
      await testThunk(checkRefresh('some-tray-id'), requiredState)
      expect(refreshTray).to.have.not.been.called()
    })

    it('should refresh the tray if one is required', async function () {
      const state = requiredState.updateIn([TRAYS_ROOT, 'some-tray-id'], (tray) => tray.set('requiresRefresh', true))
      await testThunk(checkRefresh('some-tray-id'), state)
      expect(refreshTray).to.have.been.calledWith('some-tray-id')
    })
  })
})
