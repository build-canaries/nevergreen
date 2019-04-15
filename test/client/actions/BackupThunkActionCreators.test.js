import {testThunk} from '../testHelpers'
import {fromJS} from 'immutable'
import {BACKUP_ROOT} from '../../../src/client/reducers/BackupReducer'
import {restore, upload} from '../../../src/client/actions/BackupThunkActionCreators'
import * as backupActionCreators from '../../../src/client/actions/BackupActionCreators'
import * as importActionCreators from '../../../src/client/actions/ImportActionCreators'
import * as importThunkActionCreators from '../../../src/client/actions/ImportThunkActionCreators'
import * as exportActionCreators from '../../../src/client/actions/ExportActionCreators'
import * as json from '../../../src/client/common/Json'
import * as configuration from '../../../src/client/reducers/Configuration'
import * as backupGateway from '../../../src/client/gateways/BackupGateway'
import * as gateway from '../../../src/client/gateways/Gateway'

describe('GitHubThunkActionCreators', () => {

  gateway.send = jest.fn()
  importActionCreators.importError = jest.fn()
  importActionCreators.importing = jest.fn()
  importThunkActionCreators.importData = jest.fn()
  backupActionCreators.backupSetId = jest.fn()
  backupActionCreators.backupSetDescription = jest.fn()
  exportActionCreators.exporting = jest.fn()
  exportActionCreators.exportSuccess = jest.fn()
  exportActionCreators.exportError = jest.fn()
  json.toJson = jest.fn()
  configuration.filter = jest.fn()
  backupGateway.exportConfiguration = jest.fn()
  backupGateway.importConfiguration = jest.fn()

  function backupState(existing) {
    return fromJS({[BACKUP_ROOT]: existing})
  }

  describe('restore', () => {

    const validResponse = fromJS({
      id: 'some-id',
      description: 'some-description',
      where: 'github',
      configuration: 'some-configuration'
    })

    test('should dispatch importing', async () => {
      gateway.send.mockResolvedValue(validResponse)
      const state = backupState({github: {id: 'irrelevant'}})
      await testThunk(restore('github'), state)
      expect(importActionCreators.importing).toBeCalled()
    })

    test('should dispatch import error if ID is null', async () => {
      const state = backupState({github: {id: null}})
      await testThunk(restore('github'), state)
      expect(importActionCreators.importError).toBeCalledWith(['You must provide an ID to import'])
    })

    test('should dispatch import error if ID is blank', async () => {
      const state = backupState({github: {id: ' '}})
      await testThunk(restore('github'), state)
      expect(importActionCreators.importError).toBeCalledWith(['You must provide an ID to import'])
    })

    test('should dispatch import error if the configuration can not be fetched', async () => {
      gateway.send.mockRejectedValue(new Error('some-error'))
      const state = backupState({github: {id: 'some-id'}})
      await testThunk(restore('github'), state)
      expect(importActionCreators.importError).toBeCalledWith(['Unable to import from github because of an error: some-error'])
    })

    test('should call import configuration', async () => {
      gateway.send.mockResolvedValue(validResponse)
      const state = backupState({github: {id: 'some-id', url: 'some-url'}})
      await testThunk(restore('github', 'some-token'), state)
      expect(backupGateway.importConfiguration).toBeCalledWith('github', 'some-id', 'some-token', 'some-url')
    })

    test('should dispatch import data on successful fetch of the', async () => {
      gateway.send.mockResolvedValue(validResponse)
      const state = backupState({github: {id: 'some-id', url: 'some-url'}})

      await testThunk(restore('github'), state)

      expect(backupActionCreators.backupSetDescription).toBeCalledWith('some-description')
      expect(importThunkActionCreators.importData).toBeCalledWith('some-configuration')
    })
  })

  describe('upload', () => {

    test('should dispatch exporting action', async () => {
      gateway.send.mockResolvedValue(fromJS({id: 'some-id'}))
      const state = backupState({github: {id: 'irrelevant', description: 'irrelevant'}})

      await testThunk(upload('irrelevant'), state)

      expect(exportActionCreators.exporting).toBeCalled()
    })

    test('should dispatch export error action if the can not be created', async () => {
      gateway.send.mockRejectedValue(new Error('some-error'))
      const state = backupState({github: {id: 'irrelevant', description: 'irrelevant'}})

      await testThunk(upload('github', 'not-blank'), state)

      expect(exportActionCreators.exportError).toBeCalledWith(['Unable to upload to github because of an error: some-error'])
    })

    test('should dispatch export error action if access token is blank', async () => {
      const state = backupState({github: {id: 'irrelevant', description: 'irrelevant'}})
      await testThunk(upload('github', ''), state)
      expect(exportActionCreators.exportError).toBeCalledWith(['You must provide an access token to upload'])
    })

    test('should call export configuration', async () => {
      gateway.send.mockResolvedValue(fromJS({id: 'irrelevant'}))
      json.toJson.mockImplementation((arg) => arg)
      configuration.filter.mockImplementation((arg) => arg)
      const state = backupState({github: {id: null, description: 'some-description', url: 'some-url'}})

      await testThunk(upload('github', 'some-token'), state)

      expect(backupGateway.exportConfiguration).toBeCalledWith('github', null, 'some-description', state.toJS(), 'some-token', 'some-url')
    })

    test('should dispatch export success on success', async () => {
      gateway.send.mockResolvedValue(fromJS({id: 'some-id'}))
      const state = backupState({github: {id: null, description: 'irrelevant'}})

      await testThunk(upload('github', 'not-blank'), state)

      expect(exportActionCreators.exportSuccess).toBeCalledWith(['Successfully exported configuration'])
    })

    test('should dispatch set ID with the response ID on successful create/update', async () => {
      gateway.send.mockResolvedValue(fromJS({id: 'some-id'}))
      const state = backupState({github: {id: 'irrelevant', description: 'irrelevant'}})

      await testThunk(upload('github', 'not-blank'), state)

      expect(backupActionCreators.backupSetId).toBeCalledWith('github', 'some-id')
    })
  })
})
