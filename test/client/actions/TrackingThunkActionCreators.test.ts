import {buildState, buildTray, testThunk} from '../testHelpers'
import {TRAYS_ROOT} from '../../../src/client/reducers/TraysReducer'
import {addTray, checkRefresh} from '../../../src/client/actions/TrackingThunkActionCreators'
import * as tray from '../../../src/client/domain/Tray'
import * as trackingActionCreators from '../../../src/client/actions/TrackingActionCreators'
import * as passwordThunkActionCreators from '../../../src/client/actions/PasswordThunkActionCreators'
import * as refreshThunkActionCreators from '../../../src/client/actions/RefreshThunkActionCreators'

describe('TrackingThunkActionCreators', () => {

  describe('addTray', () => {

    const requiredState = buildState({
      [TRAYS_ROOT]: {}
    })

    test('should do nothing if the entered URL is blank', async () => {
      jest.spyOn(trackingActionCreators, 'highlightTray')
      jest.spyOn(passwordThunkActionCreators, 'encryptPassword')
      jest.spyOn(refreshThunkActionCreators, 'refreshTray')

      await testThunk(addTray('', 'irrelevant', 'irrelevant'), requiredState)

      expect(trackingActionCreators.highlightTray).not.toBeCalled()
      expect(passwordThunkActionCreators.encryptPassword).not.toBeCalled()
      expect(refreshThunkActionCreators.refreshTray).not.toBeCalled()
    })

    test('should dispatch highlight tray action if the tray already exists', async () => {
      jest.spyOn(trackingActionCreators, 'highlightTray')
      const t = buildTray({trayId: 'some-tray-id', url: 'http://url'})
      const state = buildState({[TRAYS_ROOT]: {'some-tray-id': t}})

      await testThunk(addTray('http://url', 'irrelevant', 'irrelevant'), state)

      expect(trackingActionCreators.highlightTray).toBeCalledWith('some-tray-id')
    })

    describe('tray does not exist already', () => {

      test('should dispatch tray added action without the password, as that needs to be encrypted', async () => {
        jest.spyOn(tray, 'createId').mockReturnValue('some-tray-id')
        jest.spyOn(trackingActionCreators, 'trayAdded')
        await testThunk(addTray('http://url', 'some-username', 'some-password'), requiredState)
        expect(trackingActionCreators.trayAdded).toBeCalledWith('some-tray-id', 'http://url', 'some-username')
      })

      test('should dispatch encrypt password if the password given is not blank', async () => {
        jest.spyOn(tray, 'createId').mockReturnValue('some-tray-id')
        jest.spyOn(passwordThunkActionCreators, 'encryptPassword')
        await testThunk(addTray('http://url', 'some-username', 'some-password'), requiredState)
        expect(passwordThunkActionCreators.encryptPassword).toBeCalledWith('some-tray-id', 'some-password')
      })

      test('should not dispatch encrypt password if the password given is blank', async () => {
        jest.spyOn(tray, 'createId').mockReturnValue('some-tray-id')
        jest.spyOn(passwordThunkActionCreators, 'encryptPassword')
        await testThunk(addTray('http://url', 'irrelevant', ''), requiredState)
        expect(passwordThunkActionCreators.encryptPassword).not.toBeCalled()
      })

      test('should dispatch refresh tray to fetch projects', async () => {
        jest.spyOn(tray, 'createId').mockReturnValue('some-tray-id')
        jest.spyOn(refreshThunkActionCreators, 'refreshTray')
        await testThunk(addTray('http://url', 'some-username', ''), requiredState)
        expect(refreshThunkActionCreators.refreshTray).toBeCalledWith('some-tray-id')
      })
    })
  })

  describe('checkRefresh', () => {

    test('should do nothing if the tray does not require a refresh', async () => {
      jest.spyOn(refreshThunkActionCreators, 'refreshTray')
      const state = buildState({
        [TRAYS_ROOT]: {
          'some-tray-id': buildTray({requiresRefresh: false})
        }
      })
      await testThunk(checkRefresh('some-tray-id'), state)
      expect(refreshThunkActionCreators.refreshTray).not.toBeCalled()
    })

    test('should refresh the tray if one is required', async () => {
      jest.spyOn(refreshThunkActionCreators, 'refreshTray')
      const state = buildState({
        [TRAYS_ROOT]: {
          'some-tray-id': buildTray({requiresRefresh: true})
        }
      })
      await testThunk(checkRefresh('some-tray-id'), state)
      expect(refreshThunkActionCreators.refreshTray).toBeCalledWith('some-tray-id')
    })
  })
})
