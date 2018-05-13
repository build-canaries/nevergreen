import {testThunk, withMockedImports} from '../TestUtils'
import {after, describe, it} from 'mocha'
import {expect} from 'chai'
import {match} from 'sinon'
import {sandbox} from '../Sandbox'

describe('ExportThunkActionCreators', function () {

  const send = sandbox.stub()
  const createGist = sandbox.stub()
  const updateGist = sandbox.stub()
  const gitHubSetGistId = sandbox.spy()
  const exporting = sandbox.spy()
  const exportSuccess = sandbox.spy()
  const exportError = sandbox.spy()

  const {uploadToGitHub} = withMockedImports('client/actions/ExportThunkActionCreators', {
    '../common/gateways/Gateway': {send},
    '../common/gateways/GitHubGateway': {createGist, updateGist},
    './GitHubActionCreators': {gitHubSetGistId},
    './ExportActionCreators': {exporting, exportSuccess, exportError}
  })

  after(function () {
    sandbox.restore()
  })

  describe('upload to GitHub', function () {

    it('should dispatch exporting action', function () {
      send.resolves({id: 'some-id'})
      return testThunk(uploadToGitHub('irrelevant', 'irrelevant', 'irrelevant', 'irrelevant')).then(() => {
        expect(exporting).to.have.been.called()
      })
    })

    it('should dispatch export error action if the gist can not be created', function () {
      send.rejects({message: 'some-error'})
      return testThunk(uploadToGitHub('irrelevant', 'irrelevant', 'irrelevant', 'not-blank')).then(() => {
        expect(exportError).to.have.been.called()
      })
    })

    it('should dispatch export error action if access token is blank', function () {
      send.rejects({message: 'irrelevant'})
      return testThunk(uploadToGitHub('irrelevant', 'irrelevant', 'irrelevant', '')).then(() => {
        expect(exportError).to.have.been.called()
      })
    })

    it('should create a gist if no id is given', function () {
      send.resolves({id: 'irrelevant'})
      return testThunk(uploadToGitHub(null, 'some-description', 'some-config', 'some-token')).then(() => {
        expect(updateGist).to.not.have.been.called()
        expect(createGist).to.have.been.called('some-description', 'some-config', 'some-token')
      })
    })

    it('should create a gist if a blank id is given', function () {
      send.resolves({id: 'irrelevant'})
      return testThunk(uploadToGitHub(' ', 'some-description', 'some-config', 'some-token')).then(() => {
        expect(updateGist).to.not.have.been.called()
        expect(createGist).to.have.been.called('some-description', 'some-config', 'some-token')
      })
    })

    it('should update the gist if an id is given', function () {
      send.resolves({id: 'irrelevant'})
      return testThunk(uploadToGitHub('some-id', 'some-description', 'some-config', 'some-token')).then(() => {
        expect(updateGist).to.have.been.called('some-id', 'some-description', 'some-config', 'some-token')
        expect(createGist).to.not.have.been.called()
      })
    })

    it('should dispatch export success on successful create of the gist', function () {
      send.resolves({id: 'some-id'})
      return testThunk(uploadToGitHub(null, 'irrelevant', 'irrelevant', 'not-blank')).then(() => {
        expect(exportSuccess).to.have.been.calledWithMatch(match.every(match('created gist some-id')))
      })
    })

    it('should dispatch export success on successful update of the gist', function () {
      send.resolves({id: 'some-id'})
      return testThunk(uploadToGitHub('irrelevant', 'irrelevant', 'irrelevant', 'not-blank')).then(() => {
        expect(exportSuccess).to.have.been.calledWithMatch(match.every(match('updated gist some-id')))
      })
    })

    it('should dispatch GitHub set ID with the response ID on successful create/update of the gist', function () {
      send.resolves({id: 'some-id'})
      return testThunk(uploadToGitHub('irrelevant', 'irrelevant', 'irrelevant', 'not-blank')).then(() => {
        expect(gitHubSetGistId).to.have.been.calledWith('some-id')
      })
    })
  })
})
