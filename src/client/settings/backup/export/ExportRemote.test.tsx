import React from 'react'
import {buildRemoteBackupLocation, render} from '../../../testHelpers'
import {ExportRemote} from './ExportRemote'
import * as BackupGateway from '../../../gateways/BackupGateway'
import {fakeRequest} from '../../../gateways/Gateway'
import {screen, waitFor} from '@testing-library/react'
import {BACKUP_REMOTE_LOCATIONS_ROOT} from '../RemoteLocationsReducer'

it('should export configuration', async () => {
  const remoteLocation = buildRemoteBackupLocation({
    internalId: 'locationId'
  })
  const state = {
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {
      locationId: remoteLocation
    }
  }
  jest.spyOn(BackupGateway, 'exportConfiguration').mockReturnValue(fakeRequest({
    id: 'some-remote-id'
  }))

  const {user} = render(<ExportRemote/>, {state, outletContext: remoteLocation})

  await user.click(screen.getByRole('button', {name: 'Export'}))

  await waitFor(() => {
    expect(screen.getByText('Successfully exported configuration')).toBeInTheDocument()
  })
})

it('should allow cancelling back to settings', async () => {
  const outletContext = buildRemoteBackupLocation()
  jest.spyOn(BackupGateway, 'exportConfiguration').mockReturnValue(fakeRequest({
    id: 'some-remote-id'
  }))

  const {user} = render(<ExportRemote/>, {outletContext})

  await user.click(screen.getByRole('button', {name: 'Cancel'}))

  await waitFor(() => {
    expect(window.location.pathname).toEqual('/settings/backup')
  })
})
