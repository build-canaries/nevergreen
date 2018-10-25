import {testThunk, withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'

describe('NevergreenThunkActionCreators', function () {

  const init = mocks.stub()
  const load = mocks.stub()
  const wrapConfiguration = mocks.stub()
  const initalised = mocks.spy()
  const initalising = mocks.spy()

  const {initalise} = withMockedImports('client/actions/NevergreenThunkActionCreators', {
    '../common/LocalRepository': {init, load},
    '../reducers/Configuration': {wrapConfiguration},
    './NevergreenActionCreators': {initalised, initalising}
  })

  describe('initalise', function () {

    it('should dispatch initalising action', async function () {
      init.resolves({})
      load.resolves({})
      await testThunk(initalise())
      expect(initalising).to.have.been.called()
    })

    it('should initalise the local repository', async function () {
      init.resolves({})
      load.resolves({})
      await testThunk(initalise())
      expect(init).to.have.been.called()
    })

    it('should dispatch initalised action once configuration is loaded', async function () {
      init.resolves({})
      load.resolves({})
      await testThunk(initalise())
      expect(initalised).to.have.been.called()
    })
  })
})
