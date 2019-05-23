import {Actions} from '../../../src/client/actions/Actions'
import {importError, importing, importSuccess} from '../../../src/client/actions/ImportActionCreators'
import {buildState} from '../testHelpers'

describe('ImportActionCreators', () => {

  describe(Actions.IMPORTING, () => {

    test('should return the correct type', () => {
      const actual = importing()
      expect(actual).toHaveProperty('type', Actions.IMPORTING)
    })
  })

  describe(Actions.IMPORT_ERROR, () => {

    test('should return the correct type', () => {
      const actual = importError([])
      expect(actual).toHaveProperty('type', Actions.IMPORT_ERROR)
    })

    test('should return the errors given', () => {
      const actual = importError(['some-error'])
      expect(actual.errors).toEqual(expect.arrayContaining(['some-error']))
    })
  })

  describe(Actions.IMPORT_SUCCESS, () => {

    test('should return the correct type', () => {
      const actual = importSuccess(buildState())
      expect(actual).toHaveProperty('type', Actions.IMPORT_SUCCESS)
    })

    test('should return the configuration given', () => {
      const actual = importSuccess(buildState({success: ['bar']}))
      expect(actual.data).toHaveProperty('success', ['bar'])
    })

    test('should return a success message', () => {
      const actual = importSuccess(buildState())
      expect(actual.messages).toEqual(['Successfully imported'])
    })
  })
})
