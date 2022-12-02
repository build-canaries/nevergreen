import React from 'react'
import {render} from '../../../testUtils/testHelpers'
import {buildRemoteBackupLocation} from '../../../testUtils/builders'
import {ExportRemote} from './ExportRemote'
import * as BackupGateway from '../../../gateways/BackupGateway'
import {screen, waitFor} from '@testing-library/react'
import {remoteLocationsRoot} from '../RemoteLocationsReducer'

it('should export configuration', async () => {
  const remoteLocation = buildRemoteBackupLocation({
    internalId: 'locationId'
  })
  const state = {
    [remoteLocationsRoot]: {
      locationId: remoteLocation
    }
  }
  jest.spyOn(BackupGateway, 'exportConfiguration').mockResolvedValueOnce({
    id: 'some-remote-id'
  })

  const {user} = render(<ExportRemote/>, {state, outletContext: remoteLocation})

  await user.click(screen.getByRole('button', {name: 'Export'}))

  await waitFor(() => {
    expect(screen.getByText('Successfully exported configuration')).toBeInTheDocument()
  })
})

it('should allow cancelling back to settings', async () => {
  const outletContext = buildRemoteBackupLocation()
  jest.spyOn(BackupGateway, 'exportConfiguration').mockResolvedValueOnce({
    id: 'some-remote-id'
  })

  const {user} = render(<ExportRemote/>, {outletContext})

  await user.click(screen.getByRole('button', {name: 'Cancel'}))

  await waitFor(() => {
    expect(window.location.pathname).toEqual('/settings/backup')
  })
})
