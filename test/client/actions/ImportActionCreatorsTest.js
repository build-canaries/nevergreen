import {describe, it} from 'mocha'
import {expect} from 'chai'
import Immutable from 'immutable'
import {IMPORT_ERROR, IMPORT_SUCCESS, IMPORTING} from '../../../src/client/actions/Actions'
import {importError, importing, importSuccess} from '../../../src/client/actions/ImportActionCreators'

describe('ImportActionCreators', function () {

  describe('importing', function () {

    it('should return the correct type', function () {
      const actual = importing()
      expect(actual).to.have.property('type', IMPORTING)
    })
  })

  describe('import error', function () {

    it('should return the correct type', function () {
      const actual = importError()
      expect(actual).to.have.property('type', IMPORT_ERROR)
    })

    it('should return the errors given', function () {
      const actual = importError(['some-error'])
      expect(actual).to.have.property('errors').that.contains('some-error')
    })
  })

  describe('import success', function () {

    it('should return the correct type', function () {
      const actual = importSuccess()
      expect(actual).to.have.property('type', IMPORT_SUCCESS)
    })

    it('should return the configuration given', function () {
      const actual = importSuccess({foo: 'bar'})
      expect(actual).to.have.property('data').that.contains.property('foo', 'bar')
    })

    it('should return a success message', function () {
      const actual = importSuccess()
      expect(actual).to.have.property('messages').that.is.an.instanceof(Immutable.List)
    })
  })
})
