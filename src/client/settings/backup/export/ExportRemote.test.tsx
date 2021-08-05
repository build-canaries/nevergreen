import React from 'react'
import {buildRemoteBackupLocation, render} from '../../../testHelpers'
import {ExportRemote} from './ExportRemote'
import {BACKUP_REMOTE_LOCATIONS_ROOT} from '../RemoteLocationsReducer'
import {ROUTE_EXPORT_REMOTE, ROUTE_SETTINGS_BACKUP, routeExportRemote} from '../../../Routes'
import * as BackupGateway from '../../../gateways/BackupGateway'
import {fakeRequest} from '../../../gateways/Gateway'
import userEvent from '@testing-library/user-event'
import {screen, waitFor} from '@testing-library/react'

it('should export configuration and redirect to the settings page', async () => {
  const state = {
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {
      locationId: buildRemoteBackupLocation({
        internalId: 'locationId'
      })
    }
  }
  jest.spyOn(BackupGateway, 'exportConfiguration').mockReturnValue(fakeRequest({
    id: 'some-remote-id'
  }))

  const {history} = render(<ExportRemote/>, {
    state,
    mountPath: ROUTE_EXPORT_REMOTE,
    currentLocation: routeExportRemote('locationId')
  })

  userEvent.click(screen.getByRole('button', {name: 'Export'}))

  await waitFor(() => {
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS_BACKUP)
  })
})

it('should allow cancelling back to settings', async () => {
  const state = {
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {
      locationId: buildRemoteBackupLocation({
        internalId: 'locationId'
      })
    }
  }
  jest.spyOn(BackupGateway, 'exportConfiguration').mockReturnValue(fakeRequest({
    id: 'some-remote-id'
  }))

  const {history} = render(<ExportRemote/>, {
    state,
    mountPath: ROUTE_EXPORT_REMOTE,
    currentLocation: routeExportRemote('locationId')
  })

  userEvent.click(screen.getByRole('button', {name: 'Cancel'}))

  await waitFor(() => {
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS_BACKUP)
  })
})
