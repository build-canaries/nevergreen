import {buildState, buildTray, testThunk} from '../testHelpers'
import {TRAYS_ROOT} from '../../../src/client/reducers/TraysReducer'
import {addTray, addTrayUsingToken, checkRefresh} from '../../../src/client/actions/TrackingThunkActionCreators'
import * as tray from '../../../src/client/domain/Tray'
import * as trackingActionCreators from '../../../src/client/actions/TrackingActionCreators'
import * as authenticationThunkActionCreators from '../../../src/client/actions/AuthenticationThunkActionCreators'
import * as refreshThunkActionCreators from '../../../src/client/actions/RefreshThunkActionCreators'

describe('TrackingThunkActionCreators', () => {

  describe('addTray', () => {

    const requiredState = buildState({
      [TRAYS_ROOT]: {}
    })

    test('should do nothing if the entered URL is blank', async () => {
      jest.spyOn(trackingActionCreators, 'highlightTray')
      jest.spyOn(authenticationThunkActionCreators, 'encryptPassword')
      jest.spyOn(refreshThunkActionCreators, 'refreshTray')

      await testThunk(addTray('', 'irrelevant', 'irrelevant'), requiredState)

      expect(trackingActionCreators.highlightTray).not.toBeCalled()
      expect(authenticationThunkActionCreators.encryptPassword).not.toBeCalled()
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
        jest.spyOn(authenticationThunkActionCreators, 'encryptPassword')
        await testThunk(addTray('http://url', 'some-username', 'some-password'), requiredState)
        expect(authenticationThunkActionCreators.encryptPassword).toBeCalledWith('some-tray-id', 'some-password')
      })

      test('should not dispatch encrypt password if the password given is blank', async () => {
        jest.spyOn(tray, 'createId').mockReturnValue('some-tray-id')
        jest.spyOn(authenticationThunkActionCreators, 'encryptPassword')
        await testThunk(addTray('http://url', 'irrelevant', ''), requiredState)
        expect(authenticationThunkActionCreators.encryptPassword).not.toBeCalled()
      })

      test('should dispatch refresh tray to fetch projects', async () => {
        jest.spyOn(tray, 'createId').mockReturnValue('some-tray-id')
        jest.spyOn(refreshThunkActionCreators, 'refreshTray')
        await testThunk(addTray('http://url', 'some-username', ''), requiredState)
        expect(refreshThunkActionCreators.refreshTray).toBeCalledWith('some-tray-id')
      })
    })
  })

  describe('addTrayUsingToken', () => {

    const requiredState = buildState({
      [TRAYS_ROOT]: {}
    })

    test('should do nothing if the entered URL is blank', async () => {
      jest.spyOn(trackingActionCreators, 'highlightTray')
      jest.spyOn(authenticationThunkActionCreators, 'encryptToken')
      jest.spyOn(refreshThunkActionCreators, 'refreshTray')

      await testThunk(addTrayUsingToken('', 'irrelevant'), requiredState)

      expect(trackingActionCreators.highlightTray).not.toBeCalled()
      expect(authenticationThunkActionCreators.encryptToken).not.toBeCalled()
      expect(refreshThunkActionCreators.refreshTray).not.toBeCalled()
    })

    test('should dispatch highlight tray action if the tray already exists', async () => {
      jest.spyOn(trackingActionCreators, 'highlightTray')
      const t = buildTray({trayId: 'some-tray-id', url: 'http://url'})
      const state = buildState({[TRAYS_ROOT]: {'some-tray-id': t}})

      await testThunk(addTrayUsingToken('http://url', 'irrelevant'), state)

      expect(trackingActionCreators.highlightTray).toBeCalledWith('some-tray-id')
    })

    describe('tray does not exist already', () => {

      test('should dispatch tray added action without the token, as that needs to be encrypted', async () => {
        jest.spyOn(tray, 'createId').mockReturnValue('some-tray-id')
        jest.spyOn(trackingActionCreators, 'trayAdded')
        await testThunk(addTrayUsingToken('http://url', 'some-username'), requiredState)
        expect(trackingActionCreators.trayAdded).toBeCalledWith('some-tray-id', 'http://url', undefined)
      })

      test('should dispatch encrypt token if the token given is not blank', async () => {
        jest.spyOn(tray, 'createId').mockReturnValue('some-tray-id')
        jest.spyOn(authenticationThunkActionCreators, 'encryptToken')
        await testThunk(addTrayUsingToken('http://url', 'some-username'), requiredState)
        expect(authenticationThunkActionCreators.encryptToken).toBeCalledWith('some-tray-id', 'some-username')
      })

      test('should not dispatch encrypt token if the access token given is blank', async () => {
        jest.spyOn(tray, 'createId').mockReturnValue('some-tray-id')
        jest.spyOn(authenticationThunkActionCreators, 'encryptToken')
        await testThunk(addTrayUsingToken('http://url', ''), requiredState)
        expect(authenticationThunkActionCreators.encryptToken).not.toBeCalled()
      })

      test('should dispatch refresh tray to fetch projects', async () => {
        jest.spyOn(tray, 'createId').mockReturnValue('some-tray-id')
        jest.spyOn(refreshThunkActionCreators, 'refreshTray')
        await testThunk(addTrayUsingToken('http://url', 'some-username'), requiredState)
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
