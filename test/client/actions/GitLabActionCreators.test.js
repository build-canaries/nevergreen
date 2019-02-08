import {describe, it} from 'mocha'
import {expect} from 'chai'
import {gitLabSetUrl, gitLabSetSnippetId} from '../../../src/client/actions/GitLabActionCreators'
import {GITLAB_SET_URL, GITLAB_SET_SNIPPET_ID} from '../../../src/client/actions/Actions'

describe('GitLabActionCreators', function () {

  describe(GITLAB_SET_SNIPPET_ID, function () {

    it('should return the correct type', function () {
      const actual = gitLabSetSnippetId()
      expect(actual).to.have.property('type', GITLAB_SET_SNIPPET_ID)
    })

    it('should return the url', function () {
      const actual = gitLabSetSnippetId('some-id')
      expect(actual).to.have.property('snippetId', 'some-id')
    })
  })

  describe(GITLAB_SET_URL, function () {

    it('should return the correct type', function () {
      const actual = gitLabSetUrl()
      expect(actual).to.have.property('type', GITLAB_SET_URL)
    })

    it('should return the url', function () {
      const actual = gitLabSetUrl('some-url')
      expect(actual).to.have.property('url', 'some-url')
    })
  })
})
