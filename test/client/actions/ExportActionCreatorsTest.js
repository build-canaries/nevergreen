import {withMockedImports} from '../TestUtils'
import {beforeEach, describe, it} from 'mocha'
import {expect} from 'chai'
import {sandbox} from '../Sandbox'
import {EXPORT_ERROR, EXPORT_SUCCESS, EXPORTING} from '../../../src/client/actions/Actions'

describe('ExportActionCreators', function () {

  const Gateway = {}
  const GitHubGateway = {}
  const GitHubActions = {}
  const ExportActions = withMockedImports('client/actions/ExportActionCreators', {
    '../common/gateways/Gateway': Gateway,
    '../common/gateways/GitHubGateway': GitHubGateway,
    './GitHubActionCreators': GitHubActions
  })

  describe('exporting', function () {

    it('should return the correct type', function () {
      const actual = ExportActions.exporting()
      expect(actual).to.have.property('type', EXPORTING)
    })
  })

  describe('export error', function () {

    it('should return the correct type', function () {
      const actual = ExportActions.exportError()
      expect(actual).to.have.property('type', EXPORT_ERROR)
    })

    it('should return the errors given', function () {
      const actual = ExportActions.exportError(['some-error'])
      expect(actual).to.have.property('errors').that.contains('some-error')
    })
  })

  describe('export success', function () {

    it('should return the correct type', function () {
      const actual = ExportActions.exportSuccess()
      expect(actual).to.have.property('type', EXPORT_SUCCESS)
    })

    it('should return a success message', function () {
      const actual = ExportActions.exportSuccess(['some-message'])
      expect(actual).to.have.property('messages').that.contains('some-message')
    })
  })

  describe('upload to GitHub', function () {

    const dispatch = sandbox.spy()

    beforeEach(function () {
      GitHubGateway.createGist = sandbox.stub().returns({})
      GitHubGateway.updateGist = sandbox.stub().returns({})
      GitHubActions.gitHubSetGistId = sandbox.spy()
    })

    it('should dispatch exporting action', function () {
      Gateway.send = () => Promise.resolve({id: 'some-id'})
      return ExportActions.uploadToGitHub('irrelevant', 'irrelevant', 'irrelevant', 'irrelevant')(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: EXPORTING})
      })
    })

    it('should dispatch export error action if the gist can not be created', function () {
      Gateway.send = () => Promise.reject({message: 'some-error'})
      return ExportActions.uploadToGitHub('irrelevant', 'irrelevant', 'irrelevant', 'irrelevant')(dispatch).then(() => {
        expect(dispatch).to.have.been.calledWithMatch({type: EXPORT_ERROR})
      })
    })

    it('should dispatch export error action if access token is blank', function () {
      Gateway.send = () => Promise.reject({message: 'some-error'})
      ExportActions.uploadToGitHub('irrelevant', 'irrelevant', 'irrelevant', '')(dispatch)
      expect(dispatch).to.have.been.calledWithMatch({type: EXPORT_ERROR})
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
        expect(dispatch).to.have.been.calledWithMatch({type: EXPORT_SUCCESS})
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
