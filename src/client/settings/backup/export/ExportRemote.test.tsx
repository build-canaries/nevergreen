import React from 'react'
import {buildRemoteBackupLocation, render} from '../../../testHelpers'
import {ExportRemote} from './ExportRemote'
import {BACKUP_REMOTE_LOCATIONS_ROOT} from '../RemoteLocationsReducer'
import {ROUTE_ANCHOR_BACKUP, ROUTE_EXPORT_REMOTE, ROUTE_SETTINGS, routeExportRemote} from '../../../Routes'
import * as BackupGateway from '../../../gateways/BackupGateway'
import {fakeRequest} from '../../../gateways/Gateway'
import userEvent from '@testing-library/user-event'
import {waitFor} from '@testing-library/react'
import {Route} from 'react-router'

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

  const {getByRole, history} = render(
    <Route path={ROUTE_EXPORT_REMOTE}><ExportRemote/></Route>,
    state,
    routeExportRemote('locationId'))

  userEvent.click(getByRole('button', {name: 'Export'}))

  await waitFor(() => {
    expect(history.location.pathname).toEqual(ROUTE_SETTINGS)
    expect(history.location.hash).toEqual(ROUTE_ANCHOR_BACKUP)
  })
})
