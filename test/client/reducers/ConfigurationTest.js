import {expect} from 'chai'
import {describe, it} from 'mocha'
import {filter, validate} from '../../../src/client/reducers/Configuration'

describe('Data', function () {

  describe('validate', function () {

    it('allows an empty object as any data not provided gets defaulted', function () {
      const data = {}
      expect(validate(data)).to.be.empty()
    })

    it('rejects a tray with a missing ID, as this is required to match projects to the owning tray', function () {
      const data = {
        trays: {
          'some-key': {
            url: 'some-url'
          }
        }
      }
      expect(validate(data)).to.not.be.empty()
    })

    it('rejects a tray with a missing URL, as this is required to actually contact the CI server', function () {
      const data = {
        trays: {
          'some-key': {
            id: 'some-id'
          }
        }
      }
      expect(validate(data)).to.not.be.empty()
    })

    it('rejects a project with a missing ID, as this is required to select projects', function () {
      const data = {
        projects: {
          'some-key': {
            name: 'some-name'
          }
        }
      }
      expect(validate(data)).to.not.be.empty()
    })

    it('rejects a project with a missing name, as this is required to display projects on the UI', function () {
      const data = {
        projects: {
          'some-key': {
            projectId: 'some-id'
          }
        }
      }
      expect(validate(data)).to.not.be.empty()
    })
  })

  describe('filter', function () {

    it('removes unknown properties', function () {
      const data = {foo: 'bar'}
      expect(filter(data)).to.deep.equal({})
    })

    it('keeps known properties', function () {
      const data = {trays: {}}
      expect(filter(data)).to.deep.equal({trays: {}})
    })
  })
})
