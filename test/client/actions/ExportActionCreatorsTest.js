import {describe, it} from 'mocha'
import {expect} from 'chai'
import {EXPORT_ERROR, EXPORT_SUCCESS, EXPORTING} from '../../../src/client/actions/Actions'
import {exportError, exporting, exportSuccess} from '../../../src/client/actions/ExportActionCreators'

describe('ExportActionCreators', function () {

  describe('exporting', function () {

    it('should return the correct type', function () {
      const actual = exporting()
      expect(actual).to.have.property('type', EXPORTING)
    })
  })

  describe('export error', function () {

    it('should return the correct type', function () {
      const actual = exportError()
      expect(actual).to.have.property('type', EXPORT_ERROR)
    })

    it('should return the errors given', function () {
      const actual = exportError(['some-error'])
      expect(actual).to.have.property('errors').that.contains('some-error')
    })
  })

  describe('export success', function () {

    it('should return the correct type', function () {
      const actual = exportSuccess()
      expect(actual).to.have.property('type', EXPORT_SUCCESS)
    })

    it('should return a success message', function () {
      const actual = exportSuccess(['some-message'])
      expect(actual).to.have.property('messages').that.contains('some-message')
    })
  })
})
