import {describe, it} from 'mocha'
import {expect} from 'chai'
import {gitHubSetDescription, gitHubSetGistId} from '../../../src/client/actions/GitHubActionCreators'
import {GITHUB_SET_DESCRIPTION, GITHUB_SET_GIST_ID} from '../../../src/client/actions/Actions'

describe('GitHubActionCreators', function () {

  describe(GITHUB_SET_GIST_ID, function () {

    it('should return the correct type', function () {
      const actual = gitHubSetGistId()
      expect(actual).to.have.property('type', GITHUB_SET_GIST_ID)
    })

    it('should return the url', function () {
      const actual = gitHubSetGistId('some-id')
      expect(actual).to.have.property('gistId', 'some-id')
    })
  })

  describe(GITHUB_SET_DESCRIPTION, function () {

    it('should return the correct type', function () {
      const actual = gitHubSetDescription()
      expect(actual).to.have.property('type', GITHUB_SET_DESCRIPTION)
    })

    it('should return the description', function () {
      const actual = gitHubSetDescription('some-description')
      expect(actual).to.have.property('description', 'some-description')
    })
  })
})
