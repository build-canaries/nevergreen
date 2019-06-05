import {buildState, testThunk} from '../testHelpers'
import {BACKUP_ROOT, BackupState} from '../../../src/client/reducers/BackupReducer'
import {restore} from '../../../src/client/actions/BackupThunkActionCreators'
import * as backupActionCreators from '../../../src/client/actions/BackupActionCreators'
import {BackupLocation} from '../../../src/client/actions/BackupActionCreators'
import * as importActionCreators from '../../../src/client/actions/ImportActionCreators'
import * as importThunkActionCreators from '../../../src/client/actions/ImportThunkActionCreators'
import * as backupGateway from '../../../src/client/gateways/BackupGateway'
import * as gateway from '../../../src/client/gateways/Gateway'
import {RecursivePartial} from '../../../src/client/common/Types'

describe('BackupThunkActionCreators', () => {

  function backupState(backupState?: RecursivePartial<BackupState>) {
    return buildState({[BACKUP_ROOT]: backupState})
  }

  describe('restore', () => {

    const validResponse = {
      id: 'some-id',
      description: 'some-description',
      where: 'github',
      configuration: 'some-configuration'
    }

    test('should dispatch importing', async () => {
      jest.spyOn(gateway, 'send').mockResolvedValue(validResponse)
      jest.spyOn(importActionCreators, 'importing')
      const state = backupState()
      await testThunk(restore(BackupLocation.GITHUB, 'some-token'), state)
      expect(importActionCreators.importing).toBeCalled()
    })

    test('should dispatch import error if ID is empty', async () => {
      jest.spyOn(importActionCreators, 'importError')
      const state = backupState({github: {id: ''}})
      await testThunk(restore(BackupLocation.GITHUB, 'some-token'), state)
      expect(importActionCreators.importError).toBeCalledWith(['You must provide an ID to import'])
    })

    test('should dispatch import error if ID is blank', async () => {
      jest.spyOn(importActionCreators, 'importError')
      const state = backupState({github: {id: ' '}})
      await testThunk(restore(BackupLocation.GITHUB, 'some-token'), state)
      expect(importActionCreators.importError).toBeCalledWith(['You must provide an ID to import'])
    })

    test('should dispatch import error if the configuration can not be fetched', async () => {
      jest.spyOn(gateway, 'send').mockRejectedValue(new Error('some-error'))
      jest.spyOn(importActionCreators, 'importError')
      const state = backupState({github: {id: 'some-id', description: '', url: ''}})
      await testThunk(restore(BackupLocation.GITHUB, 'some-token'), state)
      expect(importActionCreators.importError).toBeCalledWith(['Unable to import from github because of an error: some-error'])
    })

    test('should call import configuration', async () => {
      jest.spyOn(gateway, 'send').mockResolvedValue(validResponse)
      jest.spyOn(backupGateway, 'importConfiguration')
      const state = backupState({github: {id: 'some-id', url: 'some-url', description: ''}})
      await testThunk(restore(BackupLocation.GITHUB, 'some-token'), state)
      expect(backupGateway.importConfiguration).toBeCalledWith('github', 'some-id', 'some-token', 'some-url')
    })

    test('should dispatch import data on successful fetch', async () => {
      jest.spyOn(gateway, 'send').mockResolvedValue(validResponse)
      jest.spyOn(backupActionCreators, 'backupSetDescription')
      jest.spyOn(importThunkActionCreators, 'importData')
      const state = backupState({github: {id: 'some-id', url: 'some-url', description: ''}})

      await testThunk(restore(BackupLocation.GITHUB, 'irrelevant'), state)

      expect(backupActionCreators.backupSetDescription).toBeCalledWith('github', 'some-description')
      expect(importThunkActionCreators.importData).toBeCalledWith('some-configuration')
    })
  })

})
