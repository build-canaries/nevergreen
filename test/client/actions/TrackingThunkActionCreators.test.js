import {testThunk} from '../testHelpers'
import {fromJS} from 'immutable'
import {TRAYS_ROOT} from '../../../src/client/reducers/TraysReducer'
import {addTray, checkRefresh} from '../../../src/client/actions/TrackingThunkActionCreators'
import * as tray from '../../../src/client/domain/Tray'
import * as trackingActionCreators from '../../../src/client/actions/TrackingActionCreators'
import * as passwordThunkActionCreators from '../../../src/client/actions/PasswordThunkActionCreators'
import * as refreshThunkActionCreators from '../../../src/client/actions/RefreshThunkActionCreators'

describe('TrackingThunkActionCreators', () => {

  trackingActionCreators.trayAdded = jest.fn()
  trackingActionCreators.highlightTray = jest.fn()
  passwordThunkActionCreators.encryptPassword = jest.fn()
  refreshThunkActionCreators.refreshTray = jest.fn()
  tray.createId = jest.fn()

  describe('addTray', () => {

    const requiredState = fromJS({
      [TRAYS_ROOT]: {}
    })

    test('should do nothing if the entered URL is blank', async () => {
      await testThunk(addTray('', 'irrelevant', 'irrelevant'), requiredState)
      expect(trackingActionCreators.highlightTray).not.toBeCalled()
      expect(passwordThunkActionCreators.encryptPassword).not.toBeCalled()
      expect(refreshThunkActionCreators.refreshTray).not.toBeCalled()
    })

    test('should dispatch highlight tray action if the tray already exists', async () => {
      const t = new tray.Tray({trayId: 'some-tray-id', url: 'http://url'})
      const state = requiredState.set(TRAYS_ROOT, fromJS({'some-tray-id': t}))
      await testThunk(addTray('http://url', 'irrelevant', 'irrelevant'), state)
      expect(trackingActionCreators.highlightTray).toBeCalledWith('some-tray-id')
    })

    describe('tray does not exist already', () => {

      test('should dispatch tray added action without the password, as that needs to be encrypted', async () => {
        tray.createId.mockReturnValue('some-tray-id')
        await testThunk(addTray('http://url', 'some-username', 'some-password'), requiredState)
        expect(trackingActionCreators.trayAdded).toBeCalledWith('some-tray-id', 'http://url', 'some-username')
      })

      test('should dispatch encrypt password if the password given is not blank', async () => {
        tray.createId.mockReturnValue('some-tray-id')
        await testThunk(addTray('http://url', 'some-username', 'some-password'), requiredState)
        expect(passwordThunkActionCreators.encryptPassword).toBeCalledWith('some-tray-id', 'some-password')
      })

      test('should not dispatch encrypt password if the password given is blank', async () => {
        tray.createId.mockReturnValue('some-tray-id')
        await testThunk(addTray('http://url', 'irrelevant', ''), requiredState)
        expect(passwordThunkActionCreators.encryptPassword).not.toBeCalled()
      })

      test('should dispatch refresh tray to fetch projects', async () => {
        tray.createId.mockReturnValue('some-tray-id')
        await testThunk(addTray('http://url', 'some-username', ''), requiredState)
        expect(refreshThunkActionCreators.refreshTray).toBeCalledWith('some-tray-id')
      })
    })
  })

  describe('checkRefresh', () => {

    const requiredState = fromJS({
      [TRAYS_ROOT]: {
        'some-tray-id': new tray.Tray()
      }
    })

    test('should do nothing if the tray does not require a refresh', async () => {
      await testThunk(checkRefresh('some-tray-id'), requiredState)
      expect(refreshThunkActionCreators.refreshTray).not.toBeCalled()
    })

    test('should refresh the tray if one is required', async () => {
      const state = requiredState.updateIn([TRAYS_ROOT, 'some-tray-id'], (tray) => tray.set('requiresRefresh', true))
      await testThunk(checkRefresh('some-tray-id'), state)
      expect(refreshThunkActionCreators.refreshTray).toBeCalledWith('some-tray-id')
    })
  })
})
