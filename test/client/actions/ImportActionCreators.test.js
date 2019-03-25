import {List} from 'immutable'
import {IMPORT_ERROR, IMPORT_SUCCESS, IMPORTING} from '../../../src/client/actions/Actions'
import {importError, importing, importSuccess} from '../../../src/client/actions/ImportActionCreators'

describe('ImportActionCreators', () => {

  describe(IMPORTING, () => {

    test('should return the correct type', () => {
      const actual = importing()
      expect(actual).toHaveProperty('type', IMPORTING)
    })
  })

  describe(IMPORT_ERROR, () => {

    test('should return the correct type', () => {
      const actual = importError()
      expect(actual).toHaveProperty('type', IMPORT_ERROR)
    })

    test('should return the errors given', () => {
      const actual = importError(['some-error'])
      expect(actual.errors.toJS()).toEqual(expect.arrayContaining(['some-error']))
    })
  })

  describe(IMPORT_SUCCESS, () => {

    test('should return the correct type', () => {
      const actual = importSuccess()
      expect(actual).toHaveProperty('type', IMPORT_SUCCESS)
    })

    test('should return the configuration given', () => {
      const actual = importSuccess({foo: 'bar'})
      expect(actual.data.toJS()).toHaveProperty('foo', 'bar')
    })

    test('should return a success message', () => {
      const actual = importSuccess()
      expect(actual.messages).toBeInstanceOf(List)
    })
  })
})
