import {Actions} from '../../../../src/client/Actions'
import {
  addBackupCustomServer,
  addBackupGitHubLab,
  backupExported,
  backupImported
} from '../../../../src/client/backup/remote/RemoteLocationActionCreators'
import {RemoteLocationOptions} from '../../../../src/client/backup/remote/RemoteLocationOptions'
import * as Tray from '../../../../src/client/domain/Tray'
import * as DateTime from '../../../../src/client/common/DateTime'

describe(Actions.ADD_BACKUP, () => {

  it('should create a new internal ID when adding custom server backups', () => {
    jest.spyOn(Tray, 'createId').mockReturnValue('some-id')
    const actual = addBackupCustomServer('irrelevant')
    expect(actual).toHaveProperty('data.internalId', 'some-id')
  })

  it('should create a new internal ID when adding GitHub/GitLab backups', () => {
    jest.spyOn(Tray, 'createId').mockReturnValue('some-id')
    const actual = addBackupGitHubLab(RemoteLocationOptions.GitLab, 'irrelevant', 'irrelevant', 'irrelevant', 'irrelevant')
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
