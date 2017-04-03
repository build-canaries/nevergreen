import {proxyquire} from '../UnitSpec'
import {before, beforeEach, describe, it} from 'mocha'
import {expect} from 'chai'
import Immutable from 'immutable'
import sinon from 'sinon'

describe('ImportActions', function () {
  let ImportActions, LocalRepository, Data, Migrations, Gateway, GitHubGateway

  before(function () {
    LocalRepository = {}
    Data = {}
    Migrations = {}
    Gateway = {}
    GitHubGateway = {}
    ImportActions = proxyquire('../../src/client/actions/ImportActions', {
      '../common/repo/LocalRepository': LocalRepository,
      '../common/repo/Data': Data,
      '../common/repo/Migrations': Migrations,
      '../common/gateways/Gateway': Gateway,
      '../common/gateways/GitHubGateway': GitHubGateway
    })
  })

  describe('importing', function () {

    it('should return the correct type', function () {
      const actual = ImportActions.importing()
      expect(actual).to.have.property('type', ImportActions.IMPORTING)
    })
  })

  describe('import error', function () {

    it('should return the correct type', function () {
      const actual = ImportActions.importError()
      expect(actual).to.have.property('type', ImportActions.IMPORT_ERROR)
    })

    it('should return the errors given', function () {
      const actual = ImportActions.importError(['some-error'])
      expect(actual).to.have.property('errors').that.contains('some-error')
    })
  })

  describe('import success', function () {

    it('should return the correct type', function () {
      const actual = ImportActions.importSuccess()
      expect(actual).to.have.property('type', ImportActions.IMPORT_SUCCESS)
    })

    it('should return the configuration given', function () {
      const actual = ImportActions.importSuccess({foo: 'bar'})
      expect(actual).to.have.property('data').that.contains.property('foo', 'bar')
    })

    it('should return a success message', function () {
      const actual = ImportActions.importSuccess()
      expect(actual).to.have.property('messages').that.is.an.instanceof(Immutable.List)
    })
  })

  describe('import data', function () {
    const validJson = '{}'
    let dispatch

    beforeEach(function () {
      dispatch = sinon.spy()
      Migrations.migrate = (data) => data
      Data.filter = (data) => data
    })

    it('should dispatch import error action on json parse failure', function () {
      ImportActions.importData('{invalidJson')(dispatch)
      expect(dispatch).to.have.been.calledWithMatch({type: ImportActions.IMPORT_ERROR})
    })

    it('should dispatch import error action on validation failure', function () {
      Data.validate = sinon.stub().returns(['some-validation-error'])
      ImportActions.importData(validJson)(dispatch)
      expect(dispatch).to.have.been.calledWithMatch({type: ImportActions.IMPORT_ERROR})
    })

    it('should dispatch import success action on successful validation', function () {
      Data.validate = sinon.stub().returns([])
      ImportActions.importData(validJson)(dispatch)
      expect(dispatch).to.have.been.calledWithMatch({type: ImportActions.IMPORT_SUCCESS})
    })
  })

  describe('restore from GitHub', function () {
    let dispatch

    beforeEach(function () {
      dispatch = sinon.spy()
      GitHubGateway.getGist = () => {
      }
    })

    it('should dispatch importing action', function () {
      Gateway.send = () => Promise.resolve({files: {'configuration.json': {content: ''}}})
      return ImportActions.restoreFromGitHub('some-location', 'some-oauth-token')(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: ImportActions.IMPORTING})
      })
    })

    it('should dispatch import error action if the gist can not be fetched', function () {
      Gateway.send = () => Promise.reject({message: '{"message": "some-error"}'})
      return ImportActions.restoreFromGitHub('some-location', 'some-oauth-token')(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: ImportActions.IMPORT_ERROR})
      })
    })

    it('should dispatch import data on successful fetch of the gist')
  })
})
