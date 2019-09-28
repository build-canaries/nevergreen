import {Actions} from '../../src/client/Actions'
import {setConfiguration} from '../../src/client/NevergreenActionCreators'
import {buildState} from './testHelpers'
import {SUCCESS_ROOT} from '../../src/client/success/SuccessReducer'

describe('NevergreenActionCreators', () => {

  describe(Actions.SET_CONFIGURATION, () => {

    it('should return the correct type', () => {
      const actual = setConfiguration(buildState())
      expect(actual).toHaveProperty('type', Actions.SET_CONFIGURATION)
    })

    it('should return the configuration', () => {
      const actual = setConfiguration(buildState({[SUCCESS_ROOT]: ['bar']}))
      expect(actual.configuration).toHaveProperty(SUCCESS_ROOT, ['bar'])
    })
  })
})
