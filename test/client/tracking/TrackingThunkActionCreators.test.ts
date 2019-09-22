import {buildState, buildTray, testThunk} from '../testHelpers'
import {TRAYS_ROOT} from '../../../src/client/tracking/TraysReducer'
import {checkRefresh} from '../../../src/client/tracking/TrackingThunkActionCreators'
import * as refreshThunkActionCreators from '../../../src/client/tracking/RefreshThunkActionCreators'

describe('TrackingThunkActionCreators', () => {

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
