import { exportConfiguration, fetchConfiguration } from './BackupGateway'
import * as gateway from '../gateways/Gateway'
import { buildRemoteBackupLocation } from '../testUtils/builders'
import { RemoteLocationOptions } from '../settings/backup/RemoteLocationOptions'

describe('exportConfiguration', () => {
  it('should call the export URL', async () => {
    jest.spyOn(gateway, 'post').mockResolvedValueOnce({})
    const location = buildRemoteBackupLocation({
      where: RemoteLocationOptions.gitHub,
      externalId: 'some-id',
      encryptedAccessToken: 'some-token',
      description: 'some-description',
      url: 'some-url',
    })
    await exportConfiguration(location, 'some-configuration')
    expect(gateway.post).toHaveBeenCalledWith({
      url: '/api/export',
      data: {
        where: RemoteLocationOptions.gitHub,
        id: 'some-id',
        encryptedToken: 'some-token',
        description: 'some-description',
        url: 'some-url',
        configuration: 'some-configuration',
      },
    })
  })
})

describe('fetchConfiguration', () => {
  it('should call the import URL', async () => {
    jest.spyOn(gateway, 'post').mockResolvedValueOnce({})
    const location = buildRemoteBackupLocation({
      where: RemoteLocationOptions.gitHub,
      externalId: 'some-id',
      encryptedAccessToken: 'some-token',
      url: 'some-url',
    })
    await fetchConfiguration(location)
    expect(gateway.post).toHaveBeenCalledWith({
      url: '/api/import',
      data: {
        from: RemoteLocationOptions.gitHub,
        id: 'some-id',
        encryptedToken: 'some-token',
        url: 'some-url',
      },
    })
  })
})
