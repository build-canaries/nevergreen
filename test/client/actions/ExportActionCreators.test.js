import {EXPORT_ERROR, EXPORT_SUCCESS, EXPORTING} from '../../../src/client/actions/Actions'
import {exportError, exporting, exportSuccess} from '../../../src/client/actions/ExportActionCreators'

describe('ExportActionCreators', () => {

  describe(EXPORTING, () => {

    test('should return the correct type', () => {
      const actual = exporting()
      expect(actual).toHaveProperty('type', EXPORTING)
    })
  })

  describe(EXPORT_ERROR, () => {

    test('should return the correct type', () => {
      const actual = exportError()
      expect(actual).toHaveProperty('type', EXPORT_ERROR)
    })

    test('should return the errors given', () => {
      const actual = exportError(['some-error'])
      expect(actual.errors.toJS()).toEqual(expect.arrayContaining(['some-error']))
    })
  })

  describe(EXPORT_SUCCESS, () => {

    test('should return the correct type', () => {
      const actual = exportSuccess()
      expect(actual).toHaveProperty('type', EXPORT_SUCCESS)
    })

    test('should return a success message', () => {
      const actual = exportSuccess(['some-message'])
      expect(actual.messages.toJS()).toEqual(expect.arrayContaining(['some-message']))
    })
  })
})
