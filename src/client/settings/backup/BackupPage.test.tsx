import React from 'react'
import userEvent from '@testing-library/user-event'
import {screen, waitFor} from '@testing-library/react'
import {buildRemoteBackupLocation, render} from '../../testHelpers'
import {BackupPage} from './BackupPage'
import {BACKUP_REMOTE_LOCATIONS_ROOT} from './RemoteLocationsReducer'
import {RemoteLocationOptions} from './RemoteLocationOptions'

it('should be able to remove remote locations', async () => {
  const state = {
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {
      internalId: buildRemoteBackupLocation({
        internalId: 'internalId',
        where: RemoteLocationOptions.Custom,
        url: 'http://example.com'
      })
    }
  }
  render(<BackupPage/>, {state})

  expect(screen.queryByText('http://example.com')).toBeInTheDocument()

  userEvent.click(screen.getByRole('button', {name: 'Remove Remote backup 1'}))

  await waitFor(() => {
    expect(screen.queryByText('http://example.com')).not.toBeInTheDocument()
  })
})
