import {testThunk} from '../testHelpers'
import {fromJS} from 'immutable'
import {GITHUB_ROOT} from '../../../src/client/reducers/GitHubReducer'
import {restoreFromGitHub, uploadToGitHub} from '../../../src/client/actions/GitHubThunkActionCreators'
import * as gitHubActionCreators from '../../../src/client/actions/GitHubActionCreators'
import * as importActionCreators from '../../../src/client/actions/ImportActionCreators'
import * as importThunkActionCreators from '../../../src/client/actions/ImportThunkActionCreators'
import * as exportActionCreators from '../../../src/client/actions/ExportActionCreators'
import * as json from '../../../src/client/common/Json'
import * as configuration from '../../../src/client/reducers/Configuration'
import * as backupGateway from '../../../src/client/gateways/BackupGateway'
import * as nevergreenGateway from '../../../src/client/gateways/NevergreenGateway'

describe('GitHubThunkActionCreators', () => {

  nevergreenGateway.send = jest.fn()
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
  backupGateway.exportConfiguration = jest.fn()
  backupGateway.importConfiguration = jest.fn()

  describe('restoreFromGitHub', () => {

    const validResponse = fromJS({
      id: 'some-id',
      description: 'some-description',
      where: 'github',
      configuration: 'some-configuration'
    })

    test('should dispatch importing', async () => {
      nevergreenGateway.send.mockResolvedValue(validResponse)
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
      nevergreenGateway.send.mockRejectedValue(new Error('some-error'))
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'some-id'}})
      await testThunk(restoreFromGitHub(), state)
      expect(importActionCreators.importError).toBeCalledWith(['Unable to import from GitHub because of an error: some-error'])
    })

    test('should dispatch import data on successful fetch of the gist', async () => {
      nevergreenGateway.send.mockResolvedValue(validResponse)
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'irrelevant'}})
      await testThunk(restoreFromGitHub('irrelevant'), state)
      expect(gitHubActionCreators.gitHubSetDescription).toBeCalledWith('some-description')
      expect(importThunkActionCreators.importData).toBeCalledWith('some-configuration')
    })
  })

  describe('uploadToGitHub', () => {

    test('should dispatch exporting action', async () => {
      nevergreenGateway.send.mockResolvedValue(fromJS({id: 'some-id'}))
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'irrelevant', description: 'irrelevant'}})

      await testThunk(uploadToGitHub('irrelevant'), state)

      expect(exportActionCreators.exporting).toBeCalled()
    })

    test('should dispatch export error action if the gist can not be created', async () => {
      nevergreenGateway.send.mockRejectedValue(new Error('some-error'))
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'irrelevant', description: 'irrelevant'}})

      await testThunk(uploadToGitHub('not-blank'), state)

      expect(exportActionCreators.exportError).toBeCalledWith(['Unable to upload to GitHub because of an error: some-error'])
    })

    test('should dispatch export error action if access token is blank', async () => {
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'irrelevant', description: 'irrelevant'}})
      await testThunk(uploadToGitHub(''), state)
      expect(exportActionCreators.exportError).toBeCalledWith(['You must provide an access token to upload to GitHub'])
    })

    test('should call export configuration', async () => {
      nevergreenGateway.send.mockResolvedValue(fromJS({id: 'irrelevant'}))
      json.toJson.mockImplementation((arg) => arg)
      configuration.filter.mockImplementation((arg) => arg)
      const state = fromJS({[GITHUB_ROOT]: {gistId: null, description: 'some-description'}})

      await testThunk(uploadToGitHub('some-token'), state)

      expect(backupGateway.exportConfiguration).toBeCalledWith('github', null, 'some-description', state.toJS(), 'some-token')
    })

    test('should dispatch export success on successful create of the gist', async () => {
      nevergreenGateway.send.mockResolvedValue(fromJS({id: 'some-id'}))
      const state = fromJS({[GITHUB_ROOT]: {gistId: null, description: 'irrelevant'}})

      await testThunk(uploadToGitHub('not-blank'), state)

      expect(exportActionCreators.exportSuccess).toBeCalledWith(['Successfully created gist some-id'])
    })

    test('should dispatch export success on successful update of the gist', async () => {
      nevergreenGateway.send.mockResolvedValue(fromJS({id: 'some-id'}))
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'irrelevant', description: 'irrelevant'}})

      await testThunk(uploadToGitHub('not-blank'), state)

      expect(exportActionCreators.exportSuccess).toBeCalledWith(['Successfully updated gist some-id'])
    })

    test('should dispatch GitHub set ID with the response ID on successful create/update of the gist', async () => {
      nevergreenGateway.send.mockResolvedValue(fromJS({id: 'some-id'}))
      const state = fromJS({[GITHUB_ROOT]: {gistId: 'irrelevant', description: 'irrelevant'}})

      await testThunk(uploadToGitHub('not-blank'), state)

      expect(gitHubActionCreators.gitHubSetGistId).toBeCalledWith('some-id')
    })
  })
})
