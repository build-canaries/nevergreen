import {BACKUP_ROOT, reduce} from '../../../src/client/reducers/BackupReducer'
import {BACKUP_SET_DESCRIPTION, BACKUP_SET_ID, BACKUP_SET_URL, INITIALISED} from '../../../src/client/actions/Actions'
import {fromJS} from 'immutable'
import {combineReducers} from 'redux-immutable'
import {getBackupDescription, getBackupId, getBackupUrl} from '../../../src/client/reducers/Selectors'
import {initalised} from '../../../src/client/actions/NevergreenActionCreators'
import {backupSetDescription, backupSetId, backupSetUrl} from '../../../src/client/actions/BackupActionCreators'

describe('BackupReducer', () => {

  const reducer = combineReducers({
    [BACKUP_ROOT]: reduce
  })

  function state(existing) {
    return fromJS({[BACKUP_ROOT]: existing})
  }

  test('should return the state unmodified for an unknown action', () => {
    const existingState = state({foo: 'bar'})
    const newState = reducer(existingState, {type: 'not-a-real-action'})
    expect(newState).toEqual(existingState)
  })

  describe(INITIALISED, () => {

    test('should merge the id', () => {
      const existingState = state({})
      const action = initalised({[BACKUP_ROOT]: {github: {id: 'some-id'}}})
      const newState = reducer(existingState, action)
      expect(getBackupId('github', newState)).toEqual('some-id')
    })

    test('should merge the description', () => {
      const existingState = state({})
      const action = initalised({[BACKUP_ROOT]: {github: {description: 'some-description'}}})
      const newState = reducer(existingState, action)
      expect(getBackupDescription('github', newState)).toEqual('some-description')
    })

    test('should handle no github data', () => {
      const existingState = state({github: {id: 'some-id', description: 'some-description'}})
      const action = initalised({})
      const newState = reducer(existingState, action)
      expect(getBackupId('github', newState)).toEqual('some-id')
      expect(getBackupDescription('github', newState)).toEqual('some-description')
    })
  })

  describe(BACKUP_SET_DESCRIPTION, () => {

    test('should set the description property', () => {
      const existingState = state({github: {}})
      const action = backupSetDescription('github', 'some-description')
      const newState = reducer(existingState, action)
      expect(getBackupDescription('github', newState)).toEqual('some-description')
    })
  })

  describe(BACKUP_SET_ID, () => {

    test('should set the id property', () => {
      const existingState = state({github: {}})
      const action = backupSetId('github', 'some-id')
      const newState = reducer(existingState, action)
      expect(getBackupId('github', newState)).toEqual('some-id')
    })
  })

  describe(BACKUP_SET_URL, () => {

    test('should set the id property', () => {
      const existingState = state({github: {}})
      const action = backupSetUrl('github', 'some-url')
      const newState = reducer(existingState, action)
      expect(getBackupUrl('github', newState)).toEqual('some-url')
    })
  })
})
