import React from 'react'
import userEvent from '@testing-library/user-event'
import {buildRemoteBackupLocation, buildState, render} from '../../../testHelpers'
import {toJson} from '../../../common/Json'
import {ROUTE_ANCHOR_BACKUP, ROUTE_IMPORT_REMOTE, ROUTE_SETTINGS, routeImportRemote} from '../../../Routes'
import {screen, waitFor} from '@testing-library/react'
import {BACKUP_REMOTE_LOCATIONS_ROOT} from '../RemoteLocationsReducer'
import {ImportRemote} from './ImportRemote'
import * as BackupGateway from '../../../gateways/BackupGateway'
import * as Gateway from '../../../gateways/Gateway'
import {fakeRequest} from '../../../gateways/Gateway'
import {Route} from 'react-router'

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

  const {history} = render(
    <Route path={ROUTE_IMPORT_REMOTE}><ImportRemote/></Route>,
    state,
    routeImportRemote('locationId'))

  await waitFor(() => {
    expect(screen.queryByLabelText('Configuration to import')).toBeInTheDocument()
  })

  userEvent.click(screen.getByRole('button', {name: 'Import'}))

  await waitFor(() => {
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS)
    expect(history.location.hash).toEqual(ROUTE_ANCHOR_BACKUP)
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

  render(
    <Route path={ROUTE_IMPORT_REMOTE}><ImportRemote/></Route>,
    state,
    routeImportRemote('locationId'))

  await waitFor(() => {
    expect(screen.queryByText('Unable to fetch remote backup because of an error')).toBeInTheDocument()
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

  render(
    <Route path={ROUTE_IMPORT_REMOTE}><ImportRemote/></Route>,
    state,
    routeImportRemote('locationId'))

  await waitFor(() => {
    expect(screen.queryByLabelText('Configuration to import')).toBeInTheDocument()
  })

  userEvent.click(screen.getByRole('button', {name: 'Import'}))

  await waitFor(() => {
    expect(screen.queryByText('Invalid value undefined supplied to /trays/id/trayId expected string')).toBeInTheDocument()
    expect(screen.queryByText('Invalid value undefined supplied to /trays/id/url expected string')).toBeInTheDocument()
  })
})

it('should redirect to the settings page if no backup location with ID exists', async () => {
  const state = {
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {}
  }

  const {history} = render(
    <Route path={ROUTE_IMPORT_REMOTE}><ImportRemote/></Route>,
    state,
    routeImportRemote('does-not-exist-id'))

  await waitFor(() => {
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS)
    expect(history.location.hash).toEqual(ROUTE_ANCHOR_BACKUP)
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

  render(
    <Route path={ROUTE_IMPORT_REMOTE}><ImportRemote/></Route>,
    state,
    routeImportRemote('locationId'))

  await waitFor(() => {
    expect(screen.queryByText('Unable to fetch remote backup because of an error')).toBeInTheDocument()
    expect(screen.queryByRole('button', {name: 'Try fetching again'})).toBeInTheDocument()
  })
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

  const {history} = render(
    <Route path={ROUTE_IMPORT_REMOTE}><ImportRemote/></Route>,
    state,
    routeImportRemote('locationId'))

  await waitFor(() => {
    expect(screen.queryByLabelText('Configuration to import')).toBeInTheDocument()
  })

  userEvent.click(screen.getByRole('link', {name: 'Cancel'}))

  await waitFor(() => {
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS)
    expect(history.location.hash).toEqual(ROUTE_ANCHOR_BACKUP)
  })
})
