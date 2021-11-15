import React from 'react'
import userEvent from '@testing-library/user-event'
import {buildRemoteBackupLocation, buildState, render} from '../../../testHelpers'
import {toJson} from '../../../common/Json'
import {ROUTE_IMPORT_REMOTE, ROUTE_SETTINGS_BACKUP, routeImportRemote} from '../../../Routes'
import {screen, waitFor, waitForElementToBeRemoved} from '@testing-library/react'
import {BACKUP_REMOTE_LOCATIONS_ROOT} from '../RemoteLocationsReducer'
import {ImportRemote} from './ImportRemote'
import * as BackupGateway from '../../../gateways/BackupGateway'
import * as Gateway from '../../../gateways/Gateway'
import {fakeRequest} from '../../../gateways/Gateway'

it('should import valid configuration and redirect to the settings page', async () => {
  const state = {
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {
      locationId: buildRemoteBackupLocation({
        internalId: 'locationId'
      })
    }
  }
  jest.spyOn(BackupGateway, 'fetchConfiguration').mockReturnValue(fakeRequest({
    configuration: toJson(buildState())
  }))

  const {history} = render(<ImportRemote/>, {
    state,
    mountPath: ROUTE_IMPORT_REMOTE,
    currentLocation: routeImportRemote('locationId')
  })

  await waitForElementToBeRemoved(screen.queryByTestId('loading'))

  userEvent.click(screen.getByRole('button', {name: 'Import'}))

  await waitFor(() => {
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS_BACKUP)
  })
})

it('should display an error if the configuration is syntactically invalid JSON', async () => {
  const state = {
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {
      locationId: buildRemoteBackupLocation({
        internalId: 'locationId'
      })
    }
  }
  jest.spyOn(BackupGateway, 'fetchConfiguration').mockReturnValue(fakeRequest({
    configuration: '{invalid-json'
  }))

  render(<ImportRemote/>, {
    state,
    mountPath: ROUTE_IMPORT_REMOTE,
    currentLocation: routeImportRemote('locationId')
  })

  await waitFor(() => {
    expect(screen.getByText('Unable to fetch remote backup because of an error')).toBeInTheDocument()
  })
})

it('should display an error if the configuration is semantically invalid JSON', async () => {
  const state = {
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {
      locationId: buildRemoteBackupLocation({
        internalId: 'locationId'
      })
    }
  }
  jest.spyOn(BackupGateway, 'fetchConfiguration').mockReturnValue(fakeRequest({
    configuration: '{"trays":{"id": {}}}' // missing required attributes
  }))

  render(<ImportRemote/>, {
    state,
    mountPath: ROUTE_IMPORT_REMOTE,
    currentLocation: routeImportRemote('locationId')
  })

  await waitFor(() => {
    expect(screen.getByLabelText('Configuration to import')).toBeInTheDocument()
  })

  userEvent.click(screen.getByRole('button', {name: 'Import'}))

  await waitFor(() => {
    expect(screen.getByText('Invalid value undefined supplied to /trays/id/trayId expected string')).toBeInTheDocument()
  })
  expect(screen.getByText('Invalid value undefined supplied to /trays/id/url expected string')).toBeInTheDocument()
})

it('should redirect to the settings page if no backup location with ID exists', async () => {
  const state = {
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {}
  }

  const {history} = render(<ImportRemote/>, {
    state,
    mountPath: ROUTE_IMPORT_REMOTE,
    currentLocation: routeImportRemote('does-not-existt-id')
  })

  await waitFor(() => {
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS_BACKUP)
  })
})

it('should display an error and a button to try again if configuration can not be fetched', async () => {
  const state = {
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {
      locationId: buildRemoteBackupLocation({
        internalId: 'locationId'
      })
    }
  }
  jest.spyOn(Gateway, 'send').mockRejectedValue(new Error('some-error'))

  render(<ImportRemote/>, {
    state,
    mountPath: ROUTE_IMPORT_REMOTE,
    currentLocation: routeImportRemote('locationId')
  })

  await waitFor(() => {
    expect(screen.getByText('Unable to fetch remote backup because of an error')).toBeInTheDocument()
  })
  expect(screen.getByRole('button', {name: 'Try fetching again'})).toBeInTheDocument()
})

it('should be able to cancel back to settings', async () => {
  const state = {
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {
      locationId: buildRemoteBackupLocation({
        internalId: 'locationId'
      })
    }
  }
  jest.spyOn(BackupGateway, 'fetchConfiguration').mockReturnValue(fakeRequest({
    configuration: toJson(buildState())
  }))

  const {history} = render(<ImportRemote/>, {
    state,
    mountPath: ROUTE_IMPORT_REMOTE,
    currentLocation: routeImportRemote('locationId')
  })

  await waitFor(() => {
    expect(screen.getByLabelText('Configuration to import')).toBeInTheDocument()
  })

  userEvent.click(screen.getByRole('button', {name: 'Cancel'}))

  await waitFor(() => {
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS_BACKUP)
  })
})

it('should be able to cancel back to settings if configuration can not be fetched', async () => {
  const state = {
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {
      locationId: buildRemoteBackupLocation({
        internalId: 'locationId'
      })
    }
  }
  jest.spyOn(Gateway, 'send').mockRejectedValue(new Error('some-error'))

  const {history} = render(<ImportRemote/>, {
    state,
    mountPath: ROUTE_IMPORT_REMOTE,
    currentLocation: routeImportRemote('locationId')
  })

  await waitForElementToBeRemoved(screen.queryByTestId('loading'))

  userEvent.click(screen.getByRole('button', {name: 'Cancel'}))

  await waitFor(() => {
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS_BACKUP)
  })
})
