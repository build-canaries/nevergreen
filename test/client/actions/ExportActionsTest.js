import {proxyquire} from '../UnitSpec'
import {before, beforeEach, describe, it} from 'mocha'
import {expect} from 'chai'
import sinon from 'sinon'

describe('ExportActions', function () {
  let ExportActions, Gateway, GitHubGateway, GitHubActions

  before(function () {
    Gateway = {}
    GitHubGateway = {}
    GitHubActions = {}
    ExportActions = proxyquire('../../src/client/actions/ExportActions', {
      '../common/gateways/Gateway': Gateway,
      '../common/gateways/GitHubGateway': GitHubGateway,
      './GitHubActions': GitHubActions
    })
  })

  describe('exporting', function () {

    it('should return the correct type', function () {
      const actual = ExportActions.exporting()
      expect(actual).to.have.property('type', ExportActions.EXPORTING)
    })
  })

  describe('export error', function () {

    it('should return the correct type', function () {
      const actual = ExportActions.exportError()
      expect(actual).to.have.property('type', ExportActions.EXPORT_ERROR)
    })

    it('should return the errors given', function () {
      const actual = ExportActions.exportError(['some-error'])
      expect(actual).to.have.property('errors').that.contains('some-error')
    })
  })

  describe('export success', function () {

    it('should return the correct type', function () {
      const actual = ExportActions.exportSuccess()
      expect(actual).to.have.property('type', ExportActions.EXPORT_SUCCESS)
    })

    it('should return a success message', function () {
      const actual = ExportActions.exportSuccess(['some-message'])
      expect(actual).to.have.property('messages').that.contains('some-message')
    })
  })

  describe('upload to GitHub', function () {
    let dispatch

    beforeEach(function () {
      dispatch = sinon.spy()
      GitHubGateway.createGist = sinon.stub().returns({})
      GitHubGateway.updateGist = sinon.stub().returns({})
      GitHubActions.gitHubSetGistId = sinon.spy()
    })

    it('should dispatch exporting action', function () {
      Gateway.send = () => Promise.resolve({id: 'some-id'})
      return ExportActions.uploadToGitHub('irrelevant', 'irrelevant', 'irrelevant', 'irrelevant')(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: ExportActions.EXPORTING})
      })
    })

    it('should dispatch export error action if the gist can not be created', function () {
      Gateway.send = () => Promise.reject({message: '{"message": "some-error"}'})
      return ExportActions.uploadToGitHub('irrelevant', 'irrelevant', 'irrelevant', 'irrelevant')(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: ExportActions.EXPORT_ERROR})
      })
    })

    it('should create a gist if no id is given', function () {
      Gateway.send = () => Promise.resolve({id: 'some-id'})
      return ExportActions.uploadToGitHub(null, 'irrelevant', 'irrelevant', 'irrelevant')(dispatch).then(() => {
        expect(GitHubGateway.updateGist).to.not.have.been.called()
        expect(GitHubGateway.createGist).to.have.been.called()
      })
    })

    it('should create a gist if a blank id is given', function () {
      Gateway.send = () => Promise.resolve({id: 'some-id'})
      return ExportActions.uploadToGitHub(' ', 'irrelevant', 'irrelevant', 'irrelevant')(dispatch).then(() => {
        expect(GitHubGateway.updateGist).to.not.have.been.called()
        expect(GitHubGateway.createGist).to.have.been.called()
      })
    })

    it('should update the gist if an id is given', function () {
      Gateway.send = () => Promise.resolve({id: 'some-id'})
      return ExportActions.uploadToGitHub('some-id', 'irrelevant', 'irrelevant', 'irrelevant')(dispatch).then(() => {
        expect(GitHubGateway.updateGist).to.have.been.called()
        expect(GitHubGateway.createGist).to.not.have.been.called()
      })
    })

    it('should dispatch export success on successful create/update of the gist', function () {
      Gateway.send = () => Promise.resolve({id: 'some-id'})
      return ExportActions.uploadToGitHub('some-id', 'irrelevant', 'irrelevant', 'irrelevant')(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: ExportActions.EXPORT_SUCCESS})
      })
    })

    it('should dispatch GitHub set id successful create/update of the gist', function () {
      Gateway.send = () => Promise.resolve({id: 'some-id'})
      return ExportActions.uploadToGitHub('some-id', 'irrelevant', 'irrelevant', 'irrelevant')(dispatch).then(() => {
        expect(GitHubActions.gitHubSetGistId).to.have.been.calledWith('some-id')
      })
    })
  })
})
