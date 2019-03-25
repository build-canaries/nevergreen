import * as gateway from '../../../src/client/gateways/Gateway'
import {GatewayError} from '../../../src/client/gateways/Gateway'
import {
  createSnippet,
  getSnippetContent,
  getSnippetMeta,
  send,
  updateSnippet
} from '../../../src/client/gateways/GitLabGateway'

describe('GitLabGateway', () => {

  gateway.get = jest.fn()
  gateway.put = jest.fn()
  gateway.post = jest.fn()
  gateway.send = jest.fn()

  describe('createSnippet', () => {

    test('should call with the snippet api URL, updated snippet data', () => {
        createSnippet('some-url', 'some-configuration', 'some-token')

        expect(gateway.post).toBeCalledWith('some-url/api/v4/snippets?private_token=some-token', {
          title: 'Nevergreen configuration backup',
          visibility: 'public',
          file_name: 'configuration.json',
          content: 'some-configuration'
        })
      }
    )
  })

  describe('updateSnippet', () => {

    test('should call with the snippet URL, updated gist data', () => {
      updateSnippet('some-url', 'some-snippet-id', 'some-configuration', 'some-token')

      expect(gateway.put).toBeCalledWith(
        'some-url/api/v4/snippets/some-snippet-id/?private_token=some-token', {
          file_name: 'configuration.json',
          content: 'some-configuration'
        })
    })
  })

  describe('getSnippetMeta', () => {

    test('should call with the snippet URL for meta info', () => {
      getSnippetMeta('some-url', 'some-snippet-id', 'some-token')
      expect(gateway.get).toBeCalledWith('some-url/api/v4/snippets/some-snippet-id?private_token=some-token')
    })
  })

  describe('getSnippetContent', () => {

    test('should call with the snippet URL for contents', () => {
      getSnippetContent('some-url', 'some-snippet-id', 'some-token')
      expect(gateway.get).toBeCalledWith('some-url/api/v4/snippets/some-snippet-id/raw?private_token=some-token')
    })
  })

  describe('send', () => {

    test('should return the message from the body including the status on error', async () => {
      gateway.send.mockRejectedValue(new GatewayError('', 500, {message: 'some-message'}))
      try {
        await send()
      } catch (err) {
        expect(err).toHaveProperty('message', '500 - some-message')
      }
    })

    test('should return the message from the body including the status on alternative error', async () => {
      gateway.send.mockRejectedValue(new GatewayError('', 500, {error: 'some-error'}))
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
