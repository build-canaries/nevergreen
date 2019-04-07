import {testThunk} from '../testHelpers'
import {fromJS, List} from 'immutable'
import {PENDING_REQUESTS_ROOT} from '../../../src/client/reducers/PendingRequestsReducer'
import {encryptPassword} from '../../../src/client/actions/PasswordThunkActionCreators'
import * as securityGateway from '../../../src/client/gateways/SecurityGateway'
import * as gateway from '../../../src/client/gateways/Gateway'
import * as passwordActionCreators from '../../../src/client/actions/PasswordActionCreators'

describe('PasswordThunkActionCreators', () => {

  securityGateway.encryptPassword = jest.fn()
  gateway.send = jest.fn()
  gateway.abortPendingRequest = jest.fn()
  passwordActionCreators.encryptingPassword = jest.fn()
  passwordActionCreators.passwordEncrypted = jest.fn()
  passwordActionCreators.passwordEncryptError = jest.fn()

  describe('encryptPassword', () => {

    test('should abort pending request', async () => {
      gateway.send.mockResolvedValue(fromJS({password: ''}))
      const state = fromJS({
        [PENDING_REQUESTS_ROOT]: {
          'some-tray-id': 'some-pending-request'
        }
      })
      await testThunk(encryptPassword('some-tray-id', 'irrelevant'), state)
      expect(gateway.abortPendingRequest).toBeCalledWith('some-pending-request')
    })

    test('should dispatch encrypting password action', async () => {
      securityGateway.encryptPassword.mockReturnValue({})
      gateway.send.mockResolvedValue(fromJS({password: ''}))
      securityGateway.encryptPassword.mockReturnValue('encryption-request')

      await testThunk(encryptPassword('some-tray-id', 'some-password'))
      expect(passwordActionCreators.encryptingPassword).toBeCalledWith('some-tray-id', 'some-password', 'encryption-request')
    })

    test('should dispatch password encrypted action', async () => {
      gateway.send.mockResolvedValue(fromJS({password: 'some-encrypted-password'}))
      await testThunk(encryptPassword('some-tray-id', 'irrelevant'))
      expect(passwordActionCreators.passwordEncrypted).toBeCalledWith('some-tray-id', 'some-encrypted-password')
    })

    test('should dispatch password encrypted action on success', async () => {
        gateway.send.mockResolvedValue(fromJS({password: 'some-encrypted-password'}))
        await testThunk(encryptPassword('some-tray-id', 'irrelevant'))
        expect(passwordActionCreators.passwordEncrypted).toBeCalledWith('some-tray-id', 'some-encrypted-password')
      }
    )

    test('should dispatch password encrypted action if password is blank without calling the gateway', async () => {
        await testThunk(encryptPassword('some-tray-id', ''))
        expect(passwordActionCreators.passwordEncrypted).toBeCalledWith('some-tray-id', '')
        expect(gateway.send).not.toBeCalled()
      }
    )

    test('should return a blank string if password is blank because add tray needs to use it', async () => {
        await testThunk(encryptPassword('some-tray-id', ''))
        expect(passwordActionCreators.passwordEncrypted).toBeCalledWith('some-tray-id', '')
      }
    )

    test('should dispatch password encrypt error action if the request fails', async () => {
        gateway.send.mockRejectedValue(new Error('some-error'))
        await testThunk(encryptPassword('some-tray-id', 'irrelevant'))
        expect(passwordActionCreators.passwordEncryptError).toBeCalledWith('some-tray-id', List.of('some-error'))
      }
    )
  })
})
