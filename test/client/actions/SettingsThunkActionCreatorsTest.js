import {describe, it} from 'mocha'
import {expect} from 'chai'
import {testThunk, withMockedImports} from '../TestUtils'
import {mocks} from '../Mocking'

describe('SettingsThunkActionCreators', function () {

  const requestingSystemNotificationPermission = mocks.spy()
  const setShowSystemNotifications = mocks.spy()
  const systemNotificationPermissionDenied = mocks.spy()
  const requestPermission = mocks.stub()
  const permissionGranted = mocks.stub()
  const sendSystemNotification = mocks.stub()

  const {enableSystemNotifications} = withMockedImports('client/actions/SettingsThunkActionCreators', {
    './SettingsActionCreators': {
      requestingSystemNotificationPermission,
      setShowSystemNotifications,
      systemNotificationPermissionDenied
    },
    '../common/SystemNotifications': {requestPermission, permissionGranted, sendSystemNotification}
  })

  describe('enableSystemNotifications', function () {

    it('should just set show browser notifications to false when given false', function () {
      return testThunk(enableSystemNotifications(false)).then(() => {
        expect(setShowSystemNotifications).to.have.been.calledWith(false)
      })
    })

    it('should dispatch system notification permission denied when permission is denied', function () {
      requestPermission.resolves('irrelevant')
      permissionGranted.returns(false)
      return testThunk(enableSystemNotifications(true)).then(() => {
        expect(systemNotificationPermissionDenied).to.have.been.called()
      })
    })

    it('should dispatching requesting permission', function () {
      requestPermission.resolves('irrelevant')
      return testThunk(enableSystemNotifications(true)).then(() => {
        expect(requestingSystemNotificationPermission).to.have.been.called()
      })
    })

    it('should set show browser notifications if permission is given', function () {
      requestPermission.resolves('irrelevant')
      permissionGranted.returns(true)
      return testThunk(enableSystemNotifications(true)).then(() => {
        expect(setShowSystemNotifications).to.have.been.calledWith(true)
      })
    })

    it('should show a browser notification when they are enabled', function () {
      requestPermission.resolves('irrelevant')
      permissionGranted.returns(true)
      return testThunk(enableSystemNotifications(true)).then(() => {
        expect(sendSystemNotification).to.have.been.called()
      })
    })
  })
})
