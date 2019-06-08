import {buildState, testThunk} from '../testHelpers'
import {initalise} from '../../../src/client/actions/NevergreenThunkActionCreators'
import * as localRepository from '../../../src/client/common/LocalRepository'
import * as nevergreenActionCreators from '../../../src/client/actions/NevergreenActionCreators'

describe('NevergreenThunkActionCreators', () => {

  describe('initalise', () => {

    test('should dispatch initalising action', async () => {
      jest.spyOn(localRepository, 'init').mockResolvedValue()
      jest.spyOn(localRepository, 'load').mockResolvedValue(buildState())
      jest.spyOn(nevergreenActionCreators, 'initalising')
      await testThunk(initalise())
      expect(nevergreenActionCreators.initalising).toBeCalled()
    })

    test('should initalise the local repository', async () => {
      jest.spyOn(localRepository, 'init').mockResolvedValue()
      jest.spyOn(localRepository, 'load').mockResolvedValue(buildState())
      await testThunk(initalise())
      expect(localRepository.init).toBeCalled()
    })

    test('should dispatch initalised action once configuration is loaded', async () => {
      jest.spyOn(localRepository, 'init').mockResolvedValue()
      jest.spyOn(localRepository, 'load').mockResolvedValue(buildState())
      jest.spyOn(nevergreenActionCreators, 'setConfiguration')
      await testThunk(initalise())
      expect(nevergreenActionCreators.setConfiguration).toBeCalled()
    })
  })
})
