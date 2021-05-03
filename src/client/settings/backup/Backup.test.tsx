import React from 'react'
import userEvent from '@testing-library/user-event'
import {screen, waitFor} from '@testing-library/react'
import {buildRemoteBackupLocation, render} from '../../testHelpers'
import {Backup} from './Backup'
import {BACKUP_REMOTE_LOCATIONS_ROOT} from './RemoteLocationsReducer'
import {RemoteLocationOptions} from './RemoteLocationOptions'

it('should be able to remove remote locations', async () => {
  render(<Backup/>, {
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {
      internalId: buildRemoteBackupLocation({
        internalId: 'internalId',
        where: RemoteLocationOptions.Custom,
        url: 'http://example.com'
      })
    }
  })

  expect(screen.queryByText('http://example.com')).toBeInTheDocument()

  userEvent.click(screen.getByRole('button', {name: 'Remove location'}))

  await waitFor(() => {
    expect(screen.queryByText('http://example.com')).not.toBeInTheDocument()
  })
})
