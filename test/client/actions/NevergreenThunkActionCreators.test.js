import {testThunk} from '../testHelpers'
import {initalise} from '../../../src/client/actions/NevergreenThunkActionCreators'
import * as localRepository from '../../../src/client/common/LocalRepository'
import * as configuration from '../../../src/client/reducers/Configuration'
import * as nevergreenActionCreators from '../../../src/client/actions/NevergreenActionCreators'

describe('NevergreenThunkActionCreators', () => {

  localRepository.init = jest.fn()
  localRepository.load = jest.fn()
  configuration.wrapConfiguration = jest.fn()
  nevergreenActionCreators.initalised = jest.fn()
  nevergreenActionCreators.initalising = jest.fn()

  describe('initalise', () => {

    test('should dispatch initalising action', async () => {
      localRepository.init.mockResolvedValue({})
      localRepository.load.mockResolvedValue({})
      await testThunk(initalise())
      expect(nevergreenActionCreators.initalising).toBeCalled()
    })

    test('should initalise the local repository', async () => {
      localRepository.init.mockResolvedValue({})
      localRepository.load.mockResolvedValue({})
      await testThunk(initalise())
      expect(localRepository.init).toBeCalled()
    })

    test('should dispatch initalised action once configuration is loaded', async () => {
      localRepository.init.mockResolvedValue({})
      localRepository.load.mockResolvedValue({})
      await testThunk(initalise())
      expect(nevergreenActionCreators.initalised).toBeCalled()
    })
  })
})
