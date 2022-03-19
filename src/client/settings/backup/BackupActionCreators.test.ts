import {Actions} from '../../Actions'
import {addBackupCustomServer, addBackupGitHubLab, backupExported, backupImported} from './BackupActionCreators'
import {RemoteLocationOptions} from './RemoteLocationOptions'
import * as Feed from '../../domain/Feed'
import * as DateTime from '../../common/DateTime'

describe(Actions.ADD_BACKUP, () => {

  it('should create a new internal ID when adding custom server backups', () => {
    jest.spyOn(Feed, 'createId').mockReturnValue('some-id')
    const actual = addBackupCustomServer('irrelevant')
    expect(actual).toHaveProperty('data.internalId', 'some-id')
  })

  it('should create a new internal ID when adding GitHub/GitLab backups', () => {
    jest.spyOn(Feed, 'createId').mockReturnValue('some-id')
    const actual = addBackupGitHubLab(RemoteLocationOptions.gitLab, 'irrelevant', 'irrelevant', 'irrelevant', 'irrelevant')
    expect(actual).toHaveProperty('data.internalId', 'some-id')
  })
})

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
