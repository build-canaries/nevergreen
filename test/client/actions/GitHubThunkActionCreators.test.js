import {testThunk} from '../testHelpers'
import {fromJS} from 'immutable'
import {GITHUB_ROOT} from '../../../src/client/reducers/GitHubReducer'
import {restoreFromGitHub, uploadToGitHub} from '../../../src/client/actions/GitHubThunkActionCreators'
import * as gitHubGateway from '../../../src/client/gateways/GitHubGateway'
import * as gitHubActionCreators from '../../../src/client/actions/GitHubActionCreators'
import * as importActionCreators from '../../../src/client/actions/ImportActionCreators'
import * as importThunkActionCreators from '../../../src/client/actions/ImportThunkActionCreators'
import * as exportActionCreators from '../../../src/client/actions/ExportActionCreators'
import * as json from '../../../src/client/common/Json'
import * as configuration from '../../../src/client/reducers/Configuration'

describe('GitHubThunkActionCreators', () => {

  gitHubGateway.send = jest.fn()
  gitHubGateway.getGist = jest.fn()
  gitHubGateway.getTruncatedFile = jest.fn()
  gitHubGateway.createGist = jest.fn()
  gitHubGateway.updateGist = jest.fn()
  importActionCreators.importError = jest.fn()
  importActionCreators.importing = jest.fn()
  importThunkActionCreators.importData = jest.fn()
  gitHubActionCreators.gitHubSetGistId = jest.fn()
  gitHubActionCreators.gitHubSetDescription = jest.fn()
  exportActionCreators.exporting = jest.fn()
  exportActionCreators.exportSuccess = jest.fn()
  exportActionCreators.exportError = jest.fn()
  json.toJson = jest.fn()
  configuration.filter = jest.fn()

  describe('restoreFromGitHub', () => {

    const validResponse = fromJS({
      files: {
        'configuration.json': {
          content: 'some-content',
          truncated: false,
          size: 12,
          raw_url: 'some-url'
        }
      },
      description: 'some-description'
    })

    test('should dispatch importing', async () => {
      gitHubGateway.send.mockResolvedValue(validResponse)
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'irrelevant'}})
      await testThunk(restoreFromGitHub(), state)
      expect(importActionCreators.importing).toBeCalled()
    })

    test('should dispatch import error if gist ID is null', async () => {
      const state = fromJS({[GITHUB_ROOT]: {gistId: null}})
      await testThunk(restoreFromGitHub(), state)
      expect(importActionCreators.importError).toBeCalledWith(['You must provide a gist ID to import from GitHub'])
    })

    test('should dispatch import error if gist ID is blank', async () => {
      const state = fromJS({[GITHUB_ROOT]: {gistId: ' '}})
      await testThunk(restoreFromGitHub(), state)
      expect(importActionCreators.importError).toBeCalledWith(['You must provide a gist ID to import from GitHub'])
    })

    test('should dispatch import error if the gist can not be fetched', async () => {
      gitHubGateway.send.mockRejectedValue(new Error('some-error'))
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'some-id'}})
      await testThunk(restoreFromGitHub(), state)
      expect(importActionCreators.importError).toBeCalledWith(['Unable to import from GitHub because of an error: some-error'])
    })

    test('should dispatch import error if the gist does not contain a configuration.json file', async () => {
      gitHubGateway.send.mockResolvedValue(fromJS({files: {}}))
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'some-id'}})
      await testThunk(restoreFromGitHub(), state)
      expect(importActionCreators.importError).toBeCalledWith(['Unable to import from GitHub because of an error: gist does not contain the required configuration.json file'])
    })

    test('should dispatch import error if the gist configuration.json is over 10mb as it can only be fetched via git cloning', async () => {
      gitHubGateway.send.mockResolvedValue(fromJS({
        files: {
          'configuration.json': {
            content: '{}',
            truncated: true,
            size: 10485761
          }
        }
      }))
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'some-id'}})
      await testThunk(restoreFromGitHub(), state)
      expect(importActionCreators.importError).toBeCalledWith(['Unable to import from GitHub because of an error: gist configuration.json file is too big to fetch without git cloning, size 10485761 bytes'])
    })

    test('should fetch the gist configuration.json if it is truncated but under 10mb', async () => {
      gitHubGateway.send.mockResolvedValueOnce(fromJS({
        files: {
          'configuration.json': {
            content: 'truncated-content',
            truncated: true,
            size: 10485759,
            raw_url: 'some-raw-url'
          }
        },
        description: 'some-description'
      })).mockResolvedValueOnce('some-raw-file-content')
      gitHubGateway.getTruncatedFile.mockReturnValue('some-request')
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'some-id'}})

      await testThunk(restoreFromGitHub(), state)
      expect(gitHubActionCreators.gitHubSetDescription).toBeCalledWith('some-description')
      expect(gitHubGateway.getTruncatedFile).toBeCalledWith('some-raw-url')
      expect(gitHubGateway.send).toBeCalledWith('some-request')
      expect(importThunkActionCreators.importData).toBeCalledWith('some-raw-file-content')
    })

    test('should dispatch import data on successful fetch of the gist', async () => {
      gitHubGateway.send.mockResolvedValue(validResponse)
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'irrelevant'}})
      await testThunk(restoreFromGitHub('irrelevant'), state)
      expect(gitHubActionCreators.gitHubSetDescription).toBeCalledWith('some-description')
      expect(importThunkActionCreators.importData).toBeCalledWith('some-content')
    })
  })

  describe('uploadToGitHub', () => {

    test('should dispatch exporting action', async () => {
      gitHubGateway.send.mockResolvedValue(fromJS({id: 'some-id'}))
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'irrelevant', description: 'irrelevant'}})

      await testThunk(uploadToGitHub('irrelevant'), state)

      expect(exportActionCreators.exporting).toBeCalled()
    })

    test('should dispatch export error action if the gist can not be created', async () => {
      gitHubGateway.send.mockRejectedValue(new Error('some-error'))
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'irrelevant', description: 'irrelevant'}})

      await testThunk(uploadToGitHub('not-blank'), state)

      expect(exportActionCreators.exportError).toBeCalledWith(['Unable to upload to GitHub because of an error: some-error'])
    })

    test('should dispatch export error action if access token is blank', async () => {
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'irrelevant', description: 'irrelevant'}})
      await testThunk(uploadToGitHub(''), state)
      expect(exportActionCreators.exportError).toBeCalledWith(['You must provide an access token to upload to GitHub'])
    })

    test('should create a gist if no ID is given', async () => {
      gitHubGateway.send.mockResolvedValue(fromJS({id: 'irrelevant'}))
      json.toJson.mockImplementation((arg) => arg)
      configuration.filter.mockImplementation((arg) => arg)
      const state = fromJS({[GITHUB_ROOT]: {gistId: null, description: 'some-description'}})

      await testThunk(uploadToGitHub('some-token'), state)

      expect(gitHubGateway.updateGist).not.toBeCalled()
      expect(gitHubGateway.createGist).toBeCalledWith('some-description', state.toJS(), 'some-token')
    })

    test('should create a gist if a blank ID is given', async () => {
      gitHubGateway.send.mockResolvedValue(fromJS({id: 'irrelevant'}))
      json.toJson.mockImplementation((arg) => arg)
      configuration.filter.mockImplementation((arg) => arg)
      const state = fromJS({[GITHUB_ROOT]: {gistId: ' ', description: 'some-description'}})

      await testThunk(uploadToGitHub('some-token'), state)

      expect(gitHubGateway.updateGist).not.toBeCalled()
      expect(gitHubGateway.createGist).toBeCalledWith('some-description', state.toJS(), 'some-token')
    })

    test('should update the gist if an id is given', async () => {
      gitHubGateway.send.mockResolvedValue(fromJS({id: 'irrelevant'}))
      json.toJson.mockImplementation((arg) => arg)
      configuration.filter.mockImplementation((arg) => arg)
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'some-id', description: 'some-description'}})

      await testThunk(uploadToGitHub('some-token'), state)

      expect(gitHubGateway.updateGist).toBeCalledWith('some-id', 'some-description', state.toJS(), 'some-token')
      expect(gitHubGateway.createGist).not.toBeCalled()
    })

    test('should dispatch export success on successful create of the gist', async () => {
      gitHubGateway.send.mockResolvedValue(fromJS({id: 'some-id'}))
      const state = fromJS({[GITHUB_ROOT]: {gistId: null, description: 'irrelevant'}})

      await testThunk(uploadToGitHub('not-blank'), state)

      expect(exportActionCreators.exportSuccess).toBeCalledWith(['Successfully created gist some-id'])
    })

    test('should dispatch export success on successful update of the gist', async () => {
      gitHubGateway.send.mockResolvedValue(fromJS({id: 'some-id'}))
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'irrelevant', description: 'irrelevant'}})

      await testThunk(uploadToGitHub('not-blank'), state)

      expect(exportActionCreators.exportSuccess).toBeCalledWith(['Successfully updated gist some-id'])
    })

    test('should dispatch GitHub set ID with the response ID on successful create/update of the gist', async () => {
      gitHubGateway.send.mockResolvedValue(fromJS({id: 'some-id'}))
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'irrelevant', description: 'irrelevant'}})

      await testThunk(uploadToGitHub('not-blank'), state)

      expect(gitHubActionCreators.gitHubSetGistId).toBeCalledWith('some-id')
    })
  })
})
