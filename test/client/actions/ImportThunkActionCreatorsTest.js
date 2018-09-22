import {testThunk, withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'

describe('ImportThunkActionCreators', function () {

  const migrate = mocks.stub()
  const filter = mocks.stub()
  const validate = mocks.stub()
  const importError = mocks.spy()
  const importSuccess = mocks.spy()
  const importing = mocks.spy()

  const {importData} = withMockedImports('client/actions/ImportThunkActionCreators', {
    '../common/repo/Data': {filter, validate},
    '../common/repo/Migrations': {migrate},
    './ImportActionCreators': {importError, importSuccess, importing}
  })

  describe('importData', function () {

    const validJson = '{}'

    it('should dispatch importing', async function () {
      await testThunk(importData(validJson))
      expect(importing).to.have.been.called()
    })

    it('should dispatch import error action on json parse failure', async function () {
      await testThunk(importData('{invalidJson'))
      expect(importError).to.have.been.called()
    })

    it('should dispatch import error action on validation failure', async function () {
      validate.returns(['some-validation-error'])
      await testThunk(importData(validJson))
      expect(importError).to.have.been.calledWith(['some-validation-error'])
    })

    it('should dispatch import success action on successful validation', async function () {
      filter.returns('some-data')
      validate.returns([])
      await testThunk(importData(validJson))
      expect(importSuccess).to.have.been.calledWith('some-data')
    })
  })
})
