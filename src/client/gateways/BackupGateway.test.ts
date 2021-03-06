import {exportConfiguration, fetchConfiguration} from './BackupGateway'
import * as gateway from '../gateways/Gateway'
import {buildRemoteBackupLocation} from '../testHelpers'
import {RemoteLocationOptions} from '../settings/backup/RemoteLocationOptions'

describe('exportConfiguration', () => {

  it('should call the export URL', () => {
    jest.spyOn(gateway, 'post')
    const location = buildRemoteBackupLocation({
      where: RemoteLocationOptions.GitHub,
      externalId: 'some-id',
      encryptedAccessToken: 'some-token',
      description: 'some-description',
      url: 'some-url'
    })
    void exportConfiguration(location, 'some-configuration')
    expect(gateway.post).toBeCalledWith('/api/export', {
      where: RemoteLocationOptions.GitHub,
      id: 'some-id',
      encryptedToken: 'some-token',
      description: 'some-description',
      url: 'some-url',
      configuration: 'some-configuration'
    })
  })
})

describe('fetchConfiguration', () => {

  it('should call the import URL', () => {
    jest.spyOn(gateway, 'post')
    const location = buildRemoteBackupLocation({
      where: RemoteLocationOptions.GitHub,
      externalId: 'some-id',
      encryptedAccessToken: 'some-token',
      url: 'some-url'
    })
    void fetchConfiguration(location)
    expect(gateway.post).toBeCalledWith('/api/import', {
      from: RemoteLocationOptions.GitHub,
      id: 'some-id',
      encryptedToken: 'some-token',
      url: 'some-url'
    })
  })
})
