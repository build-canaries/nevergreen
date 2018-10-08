import {withMockedImports} from '../../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../../Mocking'
import {GatewayError} from '../../../../src/client/common/gateways/Gateway'

describe('GitHubGateway', function () {

  const EXPECTED_ACCEPT_HEADER = {Accept: 'application/vnd.github.v3+json'}

  const get = mocks.stub()
  const patch = mocks.stub()
  const post = mocks.stub()
  const gatewaySend = mocks.stub()

  const {createGist, updateGist, getGist, getTruncatedFile, send} = withMockedImports('client/common/gateways/GitHubGateway', {
    './Gateway': {send: gatewaySend, get, patch, post}
  })

  describe('createGist', function () {

    it('should call with the gist URL, updated gist data and the correct headers', function () {
      const expectedData = {
        description: 'some-description',
        public: false,
        files: {'configuration.json': {content: 'some-configuration'}}
      }
      const expectedHeaders = {
        Authorization: 'token some-oauth-token',
        ...EXPECTED_ACCEPT_HEADER
      }

      createGist('some-description', 'some-configuration', 'some-oauth-token')

      expect(post).to.have.been.calledWith('https://api.github.com/gists', expectedData, expectedHeaders)
    })
  })

  describe('updateGist', function () {

    it('should call with the gist URL, updated gist data and the correct headers', function () {
      const expectedData = {
        description: 'some-description',
        files: {'configuration.json': {content: 'some-configuration'}}
      }
      const expectedHeaders = {
        Authorization: 'token some-oauth-token',
        ...EXPECTED_ACCEPT_HEADER
      }

      updateGist('some-gist-id', 'some-description', 'some-configuration', 'some-oauth-token')

      expect(patch).to.have.been.calledWith('https://api.github.com/gists/some-gist-id', expectedData, expectedHeaders)
    })
  })

  describe('getGist', function () {

    it('should call with the gist URL and the correct accept header', function () {
      getGist('some-gist-id')
      expect(get).to.have.been.calledWith('https://api.github.com/gists/some-gist-id', EXPECTED_ACCEPT_HEADER)
    })
  })

  describe('getTruncatedFile', function () {

    it('should call with the given URL and the correct accept header', function () {
      getTruncatedFile('some-url')
      expect(get).to.have.been.calledWith('some-url', {Accept: 'text/plain; charset=utf-8'})
    })
  })

  describe('send', function () {

    it('should return the message from the body including the status on error', async function () {
      gatewaySend.rejects(new GatewayError({status: 500, body: {message: 'some-error'}}))
      try {
        await send()
      } catch (err) {
        expect(err).to.have.property('message', '500 - some-error')
      }
    })

    it('should return the body if it does not contain a message on error', async function () {
      gatewaySend.rejects(new GatewayError({status: 0, body: 'timeout'}))
      try {
        await send()
      } catch (err) {
        expect(err).to.have.property('message', '0 - timeout')
      }
    })

    it('should return the given status on error', async function () {
      gatewaySend.rejects(new GatewayError({status: 500}))
      try {
        await send()
      } catch (err) {
        expect(err).to.have.property('status', 500)
      }
    })
  })
})
