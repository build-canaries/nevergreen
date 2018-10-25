import {testThunk, withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'

describe('ImportThunkActionCreators', function () {

  const wrapConfiguration = mocks.stub()
  const validate = mocks.stub()
  const importError = mocks.spy()
  const importSuccess = mocks.spy()
  const importing = mocks.spy()

  const {importData} = withMockedImports('client/actions/ImportThunkActionCreators', {
    '../reducers/Configuration': {wrapConfiguration, validate},
    './ImportActionCreators': {importError, importSuccess, importing}
  })

  describe('importData', function () {

    it('should dispatch importing', async function () {
      await testThunk(importData(''))
      expect(importing).to.have.been.called()
    })

    it('should dispatch import error action if wrap configuration throws an error', async function () {
      wrapConfiguration.throws(new Error('some-error'))
      await testThunk(importData(''))
      expect(importError).to.have.been.called()
    })

    it('should dispatch import error action on validation failure', async function () {
      validate.returns(['some-validation-error'])
      await testThunk(importData(''))
      expect(importError).to.have.been.calledWith(['some-validation-error'])
    })

    it('should dispatch import success action on successful validation', async function () {
      const configuration = {}
      wrapConfiguration.returns(configuration)
      validate.returns([])
      await testThunk(importData(''))
      expect(importSuccess).to.have.been.calledWith(configuration)
    })
  })
})
