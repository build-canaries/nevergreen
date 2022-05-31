import {Actions} from '../../Actions'
import {backupExported, backupImported} from './BackupActionCreators'
import * as DateTime from '../../common/DateTime'

describe(Actions.BACKUP_EXPORTED, () => {

  it('should set the timestamp when a backup is exported', () => {
    jest.spyOn(DateTime, 'now').mockReturnValue('some-time')
    const actual = backupExported('irrelevant', 'irrelevant')
    expect(actual).toHaveProperty('timestamp', 'some-time')
  })
})

describe(Actions.BACKUP_IMPORTED, () => {

  it('should set the timestamp when a backup is imported', () => {
    jest.spyOn(DateTime, 'now').mockReturnValue('some-time')
    const actual = backupImported('irrelevant')
    expect(actual).toHaveProperty('timestamp', 'some-time')
  })
})
