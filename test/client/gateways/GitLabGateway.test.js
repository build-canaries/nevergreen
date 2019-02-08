import {withMockedImports} from '../TestUtils'
import {describe, it} from 'mocha'
import {expect} from 'chai'
import {mocks} from '../Mocking'
import {GatewayError} from '../../../src/client/gateways/Gateway'

describe('GitLabGateway', function () {

  const get = mocks.stub()
  const put = mocks.stub()
  const post = mocks.stub()
  const gatewaySend = mocks.stub()

  const {createSnippet, updateSnippet, getSnippetMeta, getSnippetContent, send} = withMockedImports('client/gateways/GitLabGateway', {
    './Gateway': {send: gatewaySend, get, put, post}
  })

  describe('createSnippet', function () {

    it('should call with the snippet api URL, updated snippet data', function () {
      createSnippet('some-url', 'some-configuration', 'some-token')

      expect(post).to.have.been.calledWith('some-url/api/v4/snippets?private_token=some-token', {
        title: 'Nevergreen configuration backup',
        visibility: 'public',
        file_name: 'configuration.json',  
        content: 'some-configuration'
      })
    })
  })

  describe('updateSnippet', function () {

    it('should call with the snippet URL, updated gist data', function () {
      updateSnippet('some-url', 'some-snippet-id', 'some-configuration', 'some-token')

      expect(put).to.have.been.calledWith(
        'some-url/api/v4/snippets/some-snippet-id/?private_token=some-token', {
        file_name: 'configuration.json',  
        content: 'some-configuration'
      })
    })
  })

  describe('getSnippetMeta', function () {

    it('should call with the snippet URL for meta info', function () {
      getSnippetMeta('some-url', 'some-snippet-id', 'some-token')
      expect(get).to.have.been.calledWith('some-url/api/v4/snippets/some-snippet-id?private_token=some-token')
    })
  })

  describe('getSnippetContent', function () {

    it('should call with the snippet URL for contents', function () {
      getSnippetContent('some-url', 'some-snippet-id', 'some-token')
      expect(get).to.have.been.calledWith('some-url/api/v4/snippets/some-snippet-id/raw?private_token=some-token')
    })
  })

  describe('send', function () {

    it('should return the message from the body including the status on error', async function () {
      gatewaySend.rejects(new GatewayError('', 500, {message: 'some-message'}))
      try {
        await send()
      } catch (err) {
        expect(err).to.have.property('message', '500 - some-message')
      }
    })

    it('should return the message from the body including the status on alternative error', async function () {
      gatewaySend.rejects(new GatewayError('', 500, {error: 'some-error'}))
      try {
        await send()
      } catch (err) {
        expect(err).to.have.property('message', '500 - some-error')
      }
    })

    it('should return the body if it does not contain a message on error', async function () {
      gatewaySend.rejects(new GatewayError('', 0, 'timeout'))
      try {
        await send()
      } catch (err) {
        expect(err).to.have.property('message', '0 - timeout')
      }
    })
  })
})
