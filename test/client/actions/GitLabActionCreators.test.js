import {gitLabSetUrl, gitLabSetSnippetId} from '../../../src/client/actions/GitLabActionCreators'
import {GITLAB_SET_URL, GITLAB_SET_SNIPPET_ID} from '../../../src/client/actions/Actions'

describe('GitLabActionCreators', () => {

  describe(GITLAB_SET_SNIPPET_ID, () => {

    test('should return the correct type', () => {
      const actual = gitLabSetSnippetId()
      expect(actual).toHaveProperty('type', GITLAB_SET_SNIPPET_ID)
    })

    test('should return the url', () => {
      const actual = gitLabSetSnippetId('some-id')
      expect(actual).toHaveProperty('snippetId', 'some-id')
    })
  })

  describe(GITLAB_SET_URL, () => {

    test('should return the correct type', () => {
      const actual = gitLabSetUrl()
      expect(actual).toHaveProperty('type', GITLAB_SET_URL)
    })

    test('should return the url', () => {
      const actual = gitLabSetUrl('some-url')
      expect(actual).toHaveProperty('url', 'some-url')
    })
  })
})
