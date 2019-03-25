import * as gateway from '../../../src/client/gateways/Gateway'
import {GatewayError} from '../../../src/client/gateways/Gateway'
import {createGist, getGist, getTruncatedFile, send, updateGist} from '../../../src/client/gateways/GitHubGateway'

describe('GitHubGateway', () => {

  const EXPECTED_ACCEPT_HEADER = {Accept: 'application/vnd.github.v3+json'}

  gateway.get = jest.fn()
  gateway.patch = jest.fn()
  gateway.post = jest.fn()
  gateway.send = jest.fn()

  describe('createGist', () => {

    test('should call with the gist URL, updated gist data and the correct headers', () => {
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

      expect(gateway.post).toBeCalledWith('https://api.github.com/gists', expectedData, expectedHeaders)
    })
  })

  describe('updateGist', () => {

    test('should call with the gist URL, updated gist data and the correct headers', () => {
      const expectedData = {
        description: 'some-description',
        files: {'configuration.json': {content: 'some-configuration'}}
      }
      const expectedHeaders = {
        Authorization: 'token some-oauth-token',
        ...EXPECTED_ACCEPT_HEADER
      }

      updateGist('some-gist-id', 'some-description', 'some-configuration', 'some-oauth-token')

      expect(gateway.patch).toBeCalledWith('https://api.github.com/gists/some-gist-id', expectedData, expectedHeaders)
    })
  })

  describe('getGist', () => {

    test('should call with the gist URL and the correct accept header', () => {
      getGist('some-gist-id')
      expect(gateway.get).toBeCalledWith('https://api.github.com/gists/some-gist-id', EXPECTED_ACCEPT_HEADER)
    })
  })

  describe('getTruncatedFile', () => {

    test('should call with the given URL and the correct accept header', () => {
      getTruncatedFile('some-url')
      expect(gateway.get).toBeCalledWith('some-url', {Accept: 'text/plain; charset=utf-8'})
    })
  })

  describe('send', () => {

    test('should return the message from the body including the status on error', async () => {
      gateway.send.mockRejectedValue(new GatewayError('', 500, {message: 'some-error'}))
      try {
        await send()
      } catch (err) {
        expect(err).toHaveProperty('message', '500 - some-error')
      }
    })

    test('should return the body if it does not contain a message on error', async () => {
      gateway.send.mockRejectedValue(new GatewayError('', 0, 'timeout'))
      try {
        await send()
      } catch (err) {
        expect(err).toHaveProperty('message', '0 - timeout')
      }
    })
  })
})
