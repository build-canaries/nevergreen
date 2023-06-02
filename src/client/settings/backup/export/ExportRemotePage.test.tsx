import { render } from '../../../testUtils/testHelpers'
import { buildRemoteBackupLocation } from '../../../testUtils/builders'
import { ExportRemotePage } from './ExportRemotePage'
import * as BackupGateway from '../../../gateways/BackupGateway'
import { screen, waitFor } from '@testing-library/react'
import { remoteLocationsRoot } from '../RemoteLocationsReducer'
import { personalSettingsRoot } from '../../PersonalSettingsReducer'
import { RemoteLocationOptions } from '../RemoteLocationOptions'

it('should export configuration', async () => {
  const remoteLocation = buildRemoteBackupLocation({
    internalId: 'locationId',
    externalId: 'some-remote-id',
  })
  const state = {
    [remoteLocationsRoot]: {
      locationId: remoteLocation,
    },
    [personalSettingsRoot]: {
      backupRemoteLocations: {
        locationId: {},
      },
    },
  }
  jest.spyOn(BackupGateway, 'exportConfiguration').mockResolvedValueOnce({
    id: 'some-remote-id',
  })

  const { user } = render(<ExportRemotePage />, {
    state,
    outletContext: remoteLocation,
  })

  await user.click(screen.getByRole('button', { name: 'Export' }))

  await waitFor(() => {
    expect(
      screen.getByText('Successfully exported configuration')
    ).toBeInTheDocument()
  })
  expect(BackupGateway.exportConfiguration).toHaveBeenCalledTimes(1)
})

it.each([RemoteLocationOptions.gitHub, RemoteLocationOptions.gitLab])(
  'should export configuration to a new %s location twice to make sure the exported configuration contains the external ID',
  async (where) => {
    const remoteLocation = buildRemoteBackupLocation({
      where,
      internalId: 'locationId',
      externalId: '',
    })
    const state = {
      [remoteLocationsRoot]: {
        locationId: remoteLocation,
      },
      [personalSettingsRoot]: {
        backupRemoteLocations: {
          locationId: {},
        },
      },
    }
    jest.spyOn(BackupGateway, 'exportConfiguration').mockResolvedValue({
      id: 'some-remote-id',
    })

    const { user } = render(<ExportRemotePage />, {
      state,
      outletContext: remoteLocation,
    })

    await user.click(screen.getByRole('button', { name: 'Export' }))

    await waitFor(() => {
      expect(
        screen.getByText('Successfully exported configuration')
      ).toBeInTheDocument()
    })
    expect(BackupGateway.exportConfiguration).toHaveBeenCalledTimes(2)
    expect(BackupGateway.exportConfiguration).toHaveBeenNthCalledWith(
      1,
      remoteLocation,
      expect.stringContaining('"externalId": ""'),
      expect.any(AbortSignal)
    )
    expect(BackupGateway.exportConfiguration).toHaveBeenNthCalledWith(
      2,
      remoteLocation,
      expect.stringContaining('"externalId": "some-remote-id"')
    )
  }
)

it('should not export configuration to a new custom location twice, as custom locations do not use external IDs', async () => {
  const remoteLocation = buildRemoteBackupLocation({
    where: RemoteLocationOptions.custom,
    internalId: 'locationId',
    externalId: '',
  })
  const state = {
    [remoteLocationsRoot]: {
      locationId: remoteLocation,
    },
    [personalSettingsRoot]: {
      backupRemoteLocations: {
        locationId: {},
      },
    },
  }
  jest.spyOn(BackupGateway, 'exportConfiguration').mockResolvedValueOnce({
    id: 'some-remote-id',
  })

  const { user } = render(<ExportRemotePage />, {
    state,
    outletContext: remoteLocation,
  })

  await user.click(screen.getByRole('button', { name: 'Export' }))

  await waitFor(() => {
    expect(
      screen.getByText('Successfully exported configuration')
    ).toBeInTheDocument()
  })
  expect(BackupGateway.exportConfiguration).toHaveBeenCalledTimes(1)
})

it('should allow cancelling back to settings', async () => {
  const outletContext = buildRemoteBackupLocation()
  jest.spyOn(BackupGateway, 'exportConfiguration').mockResolvedValueOnce({
    id: 'some-remote-id',
  })

  const { user } = render(<ExportRemotePage />, { outletContext })

  await user.click(screen.getByRole('button', { name: 'Cancel' }))

  await waitFor(() => {
    expect(window.location.pathname).toEqual('/settings/backup')
  })
})
