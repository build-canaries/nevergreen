import React from 'react'
import {buildRemoteBackupLocation, buildState, render} from '../../../testHelpers'
import {toJson} from '../../../common/Json'
import {screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import {ImportRemote} from './ImportRemote'
import * as BackupGateway from '../../../gateways/BackupGateway'
import * as Gateway from '../../../gateways/Gateway'
import {fakeRequest} from '../../../gateways/Gateway'
import {BACKUP_REMOTE_LOCATIONS_ROOT} from '../RemoteLocationsReducer'

it('should import valid configuration', async () => {
  const remoteLocation = buildRemoteBackupLocation({
    internalId: 'locationId'
  })
  const state = {
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {
      locationId: remoteLocation
    }
  }
  jest.spyOn(BackupGateway, 'fetchConfiguration').mockReturnValue(fakeRequest({
    configuration: toJson(buildState())
  }))

  const {user} = render(<ImportRemote/>, {state, outletContext: remoteLocation})

  await waitForElementToBeRemoved(screen.queryByTestId('loading'))

  await user.click(screen.getByRole('button', {name: 'Import'}))

  await waitFor(() => {
    expect(screen.getByText('Configuration imported')).toBeInTheDocument()
  })
})

it('should display an error if the configuration is syntactically invalid JSON', async () => {
  const outletContext = buildRemoteBackupLocation()
  jest.spyOn(BackupGateway, 'fetchConfiguration').mockReturnValue(fakeRequest({
    configuration: '{invalid-json'
  }))

  render(<ImportRemote/>, {outletContext})

  await waitFor(() => {
    expect(screen.getByText('Unable to fetch remote backup because of an error')).toBeInTheDocument()
  })
})

it('should display an error if the configuration is semantically invalid JSON', async () => {
  const outletContext = buildRemoteBackupLocation()
  jest.spyOn(BackupGateway, 'fetchConfiguration').mockReturnValue(fakeRequest({
    configuration: '{"trays":{"id": {}}}' // missing required attributes
  }))

  const {user} = render(<ImportRemote/>, {outletContext})

  await waitFor(() => {
    expect(screen.getByLabelText('Configuration to import')).toBeInTheDocument()
  })

  await user.click(screen.getByRole('button', {name: 'Import'}))

  await waitFor(() => {
    expect(screen.getByText('Invalid value undefined supplied to /trays/id/trayId expected string')).toBeInTheDocument()
  })
  expect(screen.getByText('Invalid value undefined supplied to /trays/id/url expected string')).toBeInTheDocument()
})

it('should display an error and a button to try again if configuration can not be fetched', async () => {
  const outletContext = buildRemoteBackupLocation()
  jest.spyOn(Gateway, 'send').mockRejectedValue(new Error('some-error'))

  render(<ImportRemote/>, {outletContext})

  await waitFor(() => {
    expect(screen.getByText('Unable to fetch remote backup because of an error')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', {name: 'Try fetching again'})).toBeInTheDocument()
})

it('should be able to cancel back to settings', async () => {
  const outletContext = buildRemoteBackupLocation()
  jest.spyOn(BackupGateway, 'fetchConfiguration').mockReturnValue(fakeRequest({
    configuration: toJson(buildState())
  }))

  const {user} = render(<ImportRemote/>, {outletContext})

  await waitFor(() => {
    expect(screen.getByLabelText('Configuration to import')).toBeInTheDocument()
  })

  await user.click(screen.getByRole('button', {name: 'Cancel'}))

  await waitFor(() => {
    expect(window.location.pathname).toEqual('/settings/backup')
  })
})

it('should be able to cancel back to settings if configuration can not be fetched', async () => {
  const outletContext = buildRemoteBackupLocation()
  jest.spyOn(Gateway, 'send').mockRejectedValue(new Error('some-error'))

  const {user} = render(<ImportRemote/>, {outletContext})

  await waitForElementToBeRemoved(screen.queryByTestId('loading'))

  await user.click(screen.getByRole('button', {name: 'Cancel'}))

  await waitFor(() => {
    expect(window.location.pathname).toEqual('/settings/backup')
  })
})
