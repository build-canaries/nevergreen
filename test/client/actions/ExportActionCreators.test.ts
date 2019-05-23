import {Actions} from '../../../src/client/actions/Actions'
import {exportError, exporting, exportSuccess} from '../../../src/client/actions/ExportActionCreators'

describe('ExportActionCreators', () => {

  describe(Actions.EXPORTING, () => {

    test('should return the correct type', () => {
      const actual = exporting()
      expect(actual).toHaveProperty('type', Actions.EXPORTING)
    })
  })

  describe(Actions.EXPORT_ERROR, () => {

    test('should return the correct type', () => {
      const actual = exportError([])
      expect(actual).toHaveProperty('type', Actions.EXPORT_ERROR)
    })

    test('should return the errors given', () => {
      const actual = exportError(['some-error'])
      expect(actual.errors).toEqual(expect.arrayContaining(['some-error']))
    })
  })

  describe(Actions.EXPORT_SUCCESS, () => {

    test('should return the correct type', () => {
      const actual = exportSuccess([])
      expect(actual).toHaveProperty('type', Actions.EXPORT_SUCCESS)
    })

    test('should return a success message', () => {
      const actual = exportSuccess(['some-message'])
      expect(actual.messages).toEqual(expect.arrayContaining(['some-message']))
    })
  })
})
