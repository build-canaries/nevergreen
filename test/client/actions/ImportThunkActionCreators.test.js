import {testThunk} from '../testHelpers'
import {importData} from '../../../src/client/actions/ImportThunkActionCreators'
import * as configuration from '../../../src/client/reducers/Configuration'
import * as importActionCreators from '../../../src/client/actions/ImportActionCreators'

describe('ImportThunkActionCreators', () => {

  configuration.wrapConfiguration = jest.fn()
  configuration.validate = jest.fn()
  importActionCreators.importError = jest.fn()
  importActionCreators.importSuccess = jest.fn()
  importActionCreators.importing = jest.fn()

  describe('importData', () => {

    test('should dispatch importing', async () => {
      await testThunk(importData(''))
      expect(importActionCreators.importing).toBeCalled()
    })

    test('should dispatch import error action if wrap configuration throws an error', async () => {
      configuration.wrapConfiguration.mockImplementation(() => {
        throw new Error('some-error')
      })
      await testThunk(importData(''))
      expect(importActionCreators.importError).toBeCalled()
    })

    test('should dispatch import error action on validation failure', async () => {
      configuration.validate.mockReturnValue(['some-validation-error'])
      await testThunk(importData(''))
      expect(importActionCreators.importError).toBeCalledWith(['some-validation-error'])
    })

    test('should dispatch import success action on successful validation', async () => {
      const config = {}
      configuration.wrapConfiguration.mockReturnValue(config)
      configuration.validate.mockReturnValue([])
      await testThunk(importData(''))
      expect(importActionCreators.importSuccess).toBeCalledWith(config)
    })
  })
})
