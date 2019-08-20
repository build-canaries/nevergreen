import {testThunk} from '../testHelpers'
import {encryptPassword, encryptToken, setAuth} from '../../../src/client/tracking/AuthenticationThunkActionCreators'
import * as securityGateway from '../../../src/client/gateways/SecurityGateway'
import * as gateway from '../../../src/client/gateways/Gateway'
import * as passwordActionCreators from '../../../src/client/tracking/PasswordActionCreators'
import * as accessTokenActionCreators from '../../../src/client/tracking/AccessTokenActionCreators'
import * as nevergreenThunkActionCreators from '../../../src/client/NevergreenThunkActionCreators'
import * as trackingActionCreators from '../../../src/client/tracking/TrackingActionCreators'
import {SuperAgentRequest} from 'superagent'
import {AuthTypes} from '../../../src/client/domain/Tray'

describe('AuthenticationThunkActionCreators', () => {

  describe('encryptPassword', () => {

    test('should abort pending request', async () => {
      jest.spyOn(gateway, 'send').mockResolvedValue({password: ''})
      jest.spyOn(nevergreenThunkActionCreators, 'abortPendingRequest')
      await testThunk(encryptPassword('some-tray-id', 'irrelevant'))
      expect(nevergreenThunkActionCreators.abortPendingRequest).toBeCalledWith('some-tray-id')
    })

    test('should dispatch encrypting password action', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const request = {} as any as SuperAgentRequest
      jest.spyOn(securityGateway, 'encrypt').mockReturnValue(request)
      jest.spyOn(gateway, 'send').mockResolvedValue('')
      jest.spyOn(passwordActionCreators, 'encryptingPassword')

      await testThunk(encryptPassword('some-tray-id', 'some-password'))
      expect(passwordActionCreators.encryptingPassword).toBeCalledWith('some-tray-id', 'some-password', request)
    })

    test('should dispatch password encrypted action', async () => {
      jest.spyOn(gateway, 'send').mockResolvedValue('some-encrypted-password')
      jest.spyOn(passwordActionCreators, 'passwordEncrypted')
      await testThunk(encryptPassword('some-tray-id', 'irrelevant'))
      expect(passwordActionCreators.passwordEncrypted).toBeCalledWith('some-tray-id', 'some-encrypted-password')
    })

    test('should dispatch password encrypted action on success', async () => {
      jest.spyOn(gateway, 'send').mockResolvedValue('some-encrypted-password')
      jest.spyOn(passwordActionCreators, 'passwordEncrypted')
      await testThunk(encryptPassword('some-tray-id', 'irrelevant'))
      expect(passwordActionCreators.passwordEncrypted).toBeCalledWith('some-tray-id', 'some-encrypted-password')
    })

    test('should dispatch password encrypted action if password is blank without calling the gateway', async () => {
      jest.spyOn(passwordActionCreators, 'passwordEncrypted')
      jest.spyOn(gateway, 'send')
      await testThunk(encryptPassword('some-tray-id', ''))
      expect(passwordActionCreators.passwordEncrypted).toBeCalledWith('some-tray-id', '')
      expect(gateway.send).not.toBeCalled()
    })

    test('should return a blank string if password is blank because add tray needs to use it', async () => {
      jest.spyOn(passwordActionCreators, 'passwordEncrypted')
      await testThunk(encryptPassword('some-tray-id', ''))
      expect(passwordActionCreators.passwordEncrypted).toBeCalledWith('some-tray-id', '')
    })

    test('should dispatch password encrypt error action if the request fails', async () => {
      jest.spyOn(gateway, 'send').mockRejectedValue(new Error('some-error'))
      jest.spyOn(passwordActionCreators, 'passwordEncryptError')
      await testThunk(encryptPassword('some-tray-id', 'irrelevant'))
      expect(passwordActionCreators.passwordEncryptError).toBeCalledWith('some-tray-id', ['some-error'])
    })
  })

  describe('encryptToken', () => {

    test('should abort pending request', async () => {
      jest.spyOn(gateway, 'send').mockResolvedValue({password: ''})
      jest.spyOn(nevergreenThunkActionCreators, 'abortPendingRequest')
      await testThunk(encryptToken('some-tray-id', 'irrelevant'))
      expect(nevergreenThunkActionCreators.abortPendingRequest).toBeCalledWith('some-tray-id')
    })

    test('should dispatch encrypting token action', async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const request = {} as any as SuperAgentRequest
      jest.spyOn(securityGateway, 'encrypt').mockReturnValue(request)
      jest.spyOn(gateway, 'send').mockResolvedValue('')
      jest.spyOn(accessTokenActionCreators, 'encryptingToken')

      await testThunk(encryptToken('some-tray-id', 'some-dummy-token'))
      expect(accessTokenActionCreators.encryptingToken).toBeCalledWith('some-tray-id', 'some-dummy-token', request)
    })

    test('should dispatch token encrypted action', async () => {
      jest.spyOn(gateway, 'send').mockResolvedValue('some-dummy-token')
      jest.spyOn(accessTokenActionCreators, 'tokenEncrypted')
      await testThunk(encryptToken('some-tray-id', 'irrelevant'))
      expect(accessTokenActionCreators.tokenEncrypted).toBeCalledWith('some-tray-id', 'some-dummy-token')
    })

    test('should dispatch password encrypted action on success', async () => {
      jest.spyOn(gateway, 'send').mockResolvedValue('some-dummy-token')
      jest.spyOn(accessTokenActionCreators, 'tokenEncrypted')
      await testThunk(encryptToken('some-tray-id', 'irrelevant'))
      expect(accessTokenActionCreators.tokenEncrypted).toBeCalledWith('some-tray-id', 'some-dummy-token')
    })

    test('should dispatch password encrypted action if password is blank without calling the gateway', async () => {
      jest.spyOn(accessTokenActionCreators, 'tokenEncrypted')
      jest.spyOn(gateway, 'send')
      await testThunk(encryptToken('some-tray-id', ''))
      expect(accessTokenActionCreators.tokenEncrypted).toBeCalledWith('some-tray-id', '')
      expect(gateway.send).not.toBeCalled()
    })

    test('should return a blank string if password is blank because add tray needs to use it', async () => {
      jest.spyOn(accessTokenActionCreators, 'tokenEncrypted')
      await testThunk(encryptToken('some-tray-id', ''))
      expect(accessTokenActionCreators.tokenEncrypted).toBeCalledWith('some-tray-id', '')
    })

    test('should dispatch password encrypt error action if the request fails', async () => {
      jest.spyOn(gateway, 'send').mockRejectedValue(new Error('some-error'))
      jest.spyOn(accessTokenActionCreators, 'tokenEncryptError')
      await testThunk(encryptToken('some-tray-id', 'irrelevant'))
      expect(accessTokenActionCreators.tokenEncryptError).toBeCalledWith('some-tray-id', ['some-error'])
    })
  })

  describe('setAuth', () => {

    test('should set the auth type', async () => {
      jest.spyOn(trackingActionCreators, 'setAuthType')
      await testThunk(setAuth('some-tray-id', {type: AuthTypes.none}))
      expect(trackingActionCreators.setAuthType).toHaveBeenCalledWith('some-tray-id', AuthTypes.none)
    })

    describe('no auth', () => {

      test('should clear any previously set password', async () => {
        jest.spyOn(passwordActionCreators, 'passwordEncrypted')
        await testThunk(setAuth('some-tray-id', {type: AuthTypes.none}))
        expect(passwordActionCreators.passwordEncrypted).toHaveBeenCalledWith('some-tray-id', '')
      })

      test('should clear any previously set access token', async () => {
        jest.spyOn(accessTokenActionCreators, 'tokenEncrypted')
        await testThunk(setAuth('some-tray-id', {type: AuthTypes.none}))
        expect(accessTokenActionCreators.tokenEncrypted).toHaveBeenCalledWith('some-tray-id', '')
      })

      test('should clear any previously set username', async () => {
        jest.spyOn(trackingActionCreators, 'setTrayUsername')
        await testThunk(setAuth('some-tray-id', {type: AuthTypes.none}))
        expect(trackingActionCreators.setTrayUsername).toHaveBeenCalledWith('some-tray-id', '')
      })
    })
  })
})
