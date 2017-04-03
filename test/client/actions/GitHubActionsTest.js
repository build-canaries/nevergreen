import {describe, it} from 'mocha'
import {expect} from 'chai'
import {GITHUB_SET_DESCRIPTION, GITHUB_SET_URL, gitHubSetDescription, gitHubSetUrl} from '../../../src/client/actions/GitHubActions'

describe('GitHubActions', function () {

  describe('set url', function () {

    it('should return the correct type', function () {
      const actual = gitHubSetUrl()
      expect(actual).to.have.property('type', GITHUB_SET_URL)
    })

    it('should return the url', function () {
      const actual = gitHubSetUrl('some-url')
      expect(actual).to.have.property('url', 'some-url')
    })
  })

  describe('set description', function () {

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
