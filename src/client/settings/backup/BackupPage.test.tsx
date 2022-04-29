import React from 'react'
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
        where: RemoteLocationOptions.custom,
        url: 'http://example.com'
      })
    }
  }
  const {user} = render(<BackupPage/>, {state})

  expect(screen.getByText('http://example.com')).toBeInTheDocument()

  await user.click(screen.getByRole('button', {name: 'Remove Remote backup 1'}))

  await waitFor(() => {
    expect(screen.queryByText('http://example.com')).not.toBeInTheDocument()
  })
})
