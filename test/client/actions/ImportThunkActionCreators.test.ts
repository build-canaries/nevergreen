import {buildState, testThunk} from '../testHelpers'
import {importData} from '../../../src/client/actions/ImportThunkActionCreators'
import * as configuration from '../../../src/client/reducers/Configuration'
import * as importActionCreators from '../../../src/client/actions/ImportActionCreators'

describe('ImportThunkActionCreators', () => {

  describe('importData', () => {

    test('should dispatch importing', async () => {
      jest.spyOn(importActionCreators, 'importing')
      await testThunk(importData(buildState()))
      expect(importActionCreators.importing).toBeCalled()
    })

    test('should dispatch import error action if filter configuration throws an error', async () => {
      jest.spyOn(configuration, 'filter').mockImplementation(() => {
        throw new Error('some-error')
      })
      jest.spyOn(importActionCreators, 'importError')
      await testThunk(importData(buildState()))
      expect(importActionCreators.importError).toBeCalled()
    })

    test('should dispatch import error action on validation failure', async () => {
      jest.spyOn(configuration, 'validate').mockReturnValue(['some-validation-error'])
      jest.spyOn(importActionCreators, 'importError')
      await testThunk(importData(buildState()))
      expect(importActionCreators.importError).toBeCalledWith(['some-validation-error'])
    })

    test('should dispatch import success action on successful validation', async () => {
      const config = buildState()
      jest.spyOn(configuration, 'filter').mockReturnValue(config)
      jest.spyOn(configuration, 'validate').mockReturnValue([])
      jest.spyOn(importActionCreators, 'importSuccess')
      await testThunk(importData(buildState()))
      expect(importActionCreators.importSuccess).toBeCalledWith(config)
    })
  })
})
