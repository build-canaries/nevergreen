import {
  render,
  waitForLoadingToFinish,
  waitForLocationToChange,
} from '../../../testUtils/testHelpers'
import {
  buildRemoteBackupLocation,
  buildState,
} from '../../../testUtils/builders'
import { toJson } from '../../../common/Json'
import { screen, waitFor } from '@testing-library/react'
import { ImportRemote } from './ImportRemote'
import * as BackupGateway from '../../../gateways/BackupGateway'
import { remoteLocationsRoot } from '../RemoteLocationsReducer'
import { RemoteLocationOptions } from '../RemoteLocationOptions'
import { toExportableConfigurationJson } from '../../../configuration/Configuration'
import { personalSettingsRoot } from '../../PersonalSettingsReducer'

it('should import valid configuration', async () => {
  const remoteLocation = buildRemoteBackupLocation({
    internalId: 'locationId',
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
  jest.spyOn(BackupGateway, 'fetchConfiguration').mockResolvedValueOnce({
    configuration: toExportableConfigurationJson(buildState()),
    description: '',
    id: '',
    where: RemoteLocationOptions.custom,
  })

  const { user } = render(<ImportRemote />, {
    state,
    outletContext: remoteLocation,
  })

  await waitForLoadingToFinish()

  await user.click(screen.getByRole('button', { name: 'Import' }))

  await waitFor(() => {
    expect(screen.getByText('Configuration imported')).toBeInTheDocument()
  })
})

it('should display an error if the configuration is syntactically invalid JSON', async () => {
  const outletContext = buildRemoteBackupLocation()
  jest.spyOn(BackupGateway, 'fetchConfiguration').mockResolvedValueOnce({
    configuration: '{invalid-json',
    description: '',
    id: '',
    where: RemoteLocationOptions.custom,
  })

  render(<ImportRemote />, { outletContext })

  await waitFor(() => {
    expect(
      screen.getByText('Unable to fetch remote backup because of an error')
    ).toBeInTheDocument()
  })
})

it('should display an error if the configuration is semantically invalid JSON', async () => {
  const outletContext = buildRemoteBackupLocation()
  jest.spyOn(BackupGateway, 'fetchConfiguration').mockResolvedValueOnce({
    configuration: '{"trays":{"id": {}}}', // missing required attributes
    description: '',
    id: '',
    where: RemoteLocationOptions.custom,
  })

  const { user } = render(<ImportRemote />, { outletContext })

  await waitForLoadingToFinish()

  await user.click(screen.getByRole('button', { name: 'Import' }))

  await waitFor(() => {
    expect(
      screen.getByText(
        'Invalid value undefined supplied to /trays/id/trayId expected string'
      )
    ).toBeInTheDocument()
  })
  expect(
    screen.getByText(
      'Invalid value undefined supplied to /trays/id/url expected string'
    )
  ).toBeInTheDocument()
})

it('should display an error and a button to try again if configuration can not be fetched', async () => {
  const outletContext = buildRemoteBackupLocation()
  jest
    .spyOn(BackupGateway, 'fetchConfiguration')
    .mockRejectedValueOnce(new Error('some-error'))

  render(<ImportRemote />, { outletContext })

  await waitFor(() => {
    expect(
      screen.getByText('Unable to fetch remote backup because of an error')
    ).toBeInTheDocument()
  })
  expect(
    screen.getByRole('button', { name: 'Try fetching again' })
  ).toBeInTheDocument()
})

it('should be able to cancel back to settings', async () => {
  const outletContext = buildRemoteBackupLocation()
  jest.spyOn(BackupGateway, 'fetchConfiguration').mockResolvedValueOnce({
    configuration: toJson(buildState()),
    description: '',
    id: '',
    where: RemoteLocationOptions.custom,
  })

  const { user } = render(<ImportRemote />, { outletContext })

  await waitForLoadingToFinish()

  await user.click(screen.getByRole('button', { name: 'Cancel' }))

  await waitForLocationToChange()

  expect(window.location.pathname).toEqual('/settings/backup')
})

it('should be able to cancel back to settings if configuration can not be fetched', async () => {
  const outletContext = buildRemoteBackupLocation()
  jest
    .spyOn(BackupGateway, 'fetchConfiguration')
    .mockRejectedValueOnce(new Error('some-error'))

  const { user } = render(<ImportRemote />, { outletContext })

  await waitForLoadingToFinish()

  await user.click(screen.getByRole('button', { name: 'Cancel' }))

  await waitForLocationToChange()

  expect(window.location.pathname).toEqual('/settings/backup')
})
