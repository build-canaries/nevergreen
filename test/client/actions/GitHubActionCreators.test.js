import {gitHubSetDescription, gitHubSetGistId} from '../../../src/client/actions/GitHubActionCreators'
import {GITHUB_SET_DESCRIPTION, GITHUB_SET_GIST_ID} from '../../../src/client/actions/Actions'

describe('GitHubActionCreators', () => {

  describe(GITHUB_SET_GIST_ID, () => {

    test('should return the correct type', () => {
      const actual = gitHubSetGistId()
      expect(actual).toHaveProperty('type', GITHUB_SET_GIST_ID)
    })

    test('should return the url', () => {
      const actual = gitHubSetGistId('some-id')
      expect(actual).toHaveProperty('gistId', 'some-id')
    })
  })

  describe(GITHUB_SET_DESCRIPTION, () => {

    test('should return the correct type', () => {
      const actual = gitHubSetDescription()
      expect(actual).toHaveProperty('type', GITHUB_SET_DESCRIPTION)
    })

    test('should return the description', () => {
      const actual = gitHubSetDescription('some-description')
      expect(actual).toHaveProperty('description', 'some-description')
    })
  })
})
