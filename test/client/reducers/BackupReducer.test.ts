import {BACKUP_ROOT, BackupState, reduce} from '../../../src/client/reducers/BackupReducer'
import {Actions} from '../../../src/client/actions/Actions'
import {getBackupDescription, getBackupId, getBackupUrl} from '../../../src/client/reducers/Selectors'
import {initalised} from '../../../src/client/actions/NevergreenActionCreators'
import {
  BackupLocation,
  backupSetDescription,
  backupSetId,
  backupSetUrl
} from '../../../src/client/actions/BackupActionCreators'
import {buildState, testReducer} from '../testHelpers'
import {State} from '../../../src/client/reducers/Reducer'
import {RecursivePartial} from '../../../src/client/common/Types'

describe('BackupReducer', () => {

  const reducer = testReducer({
    [BACKUP_ROOT]: reduce
  })

  function state(existing?: RecursivePartial<BackupState>): State {
    return buildState({[BACKUP_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state()
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(Actions.INITIALISED, () => {

    test('should merge the id', () => {
      const existingState = state()
      const action = initalised({[BACKUP_ROOT]: {github: {id: 'some-id'}}})
      const newState = reducer(existingState, action)
      expect(getBackupId(BackupLocation.GITHUB, newState)).toEqual('some-id')
    })

    test('should merge the description', () => {
      const existingState = state()
      const action = initalised({[BACKUP_ROOT]: {github: {description: 'some-description'}}})
      const newState = reducer(existingState, action)
      expect(getBackupDescription(BackupLocation.GITHUB, newState)).toEqual('some-description')
    })

    test('should handle no github data', () => {
      const existingState = state({github: {id: 'some-id', description: 'some-description'}})
      const action = initalised({})
      const newState = reducer(existingState, action)
      expect(getBackupId(BackupLocation.GITHUB, newState)).toEqual('some-id')
      expect(getBackupDescription(BackupLocation.GITHUB, newState)).toEqual('some-description')
    })

    test('should only merge for the correct backup location', () => {
      const existingState = state({github: {id: 'some-id'}})
      const action = initalised({[BACKUP_ROOT]: {github: {id: 'some-id'}}})
      const newState = reducer(existingState, action)
      expect(getBackupId(BackupLocation.GITLAB, newState)).toEqual('')
    })
  })

  describe(Actions.BACKUP_SET_DESCRIPTION, () => {

    test('should set the description property', () => {
      const existingState = state({github: {}})
      const action = backupSetDescription(BackupLocation.GITHUB, 'some-description')
      const newState = reducer(existingState, action)
      expect(getBackupDescription(BackupLocation.GITHUB, newState)).toEqual('some-description')
    })
  })

  describe(Actions.BACKUP_SET_ID, () => {

    test('should set the id property', () => {
      const existingState = state({github: {}})
      const action = backupSetId(BackupLocation.GITHUB, 'some-id')
      const newState = reducer(existingState, action)
      expect(getBackupId(BackupLocation.GITHUB, newState)).toEqual('some-id')
    })
  })

  describe(Actions.BACKUP_SET_URL, () => {

    test('should set the id property', () => {
      const existingState = state({github: {}})
      const action = backupSetUrl(BackupLocation.GITHUB, 'some-url')
      const newState = reducer(existingState, action)
      expect(getBackupUrl(BackupLocation.GITHUB, newState)).toEqual('some-url')
    })
  })
})
