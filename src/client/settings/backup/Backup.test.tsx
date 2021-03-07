import React from 'react'
import userEvent from '@testing-library/user-event'
import {waitFor} from '@testing-library/react'
import {buildRemoteBackupLocation, render} from '../../testHelpers'
import {Backup} from './Backup'
import {BACKUP_REMOTE_LOCATIONS_ROOT} from './RemoteLocationsReducer'
import {RemoteLocationOptions} from './RemoteLocationOptions'

it('should be able to remove remote locations', async () => {
  const {queryByText, getByRole} = render(<Backup/>, {
    [BACKUP_REMOTE_LOCATIONS_ROOT]: {
      internalId: buildRemoteBackupLocation({
        internalId: 'internalId',
        where: RemoteLocationOptions.Custom,
        url: 'http://example.com'
      })
    }
  })

  expect(queryByText('http://example.com')).toBeInTheDocument()

  userEvent.click(getByRole('button', {name: 'Remove location'}))

  await waitFor(() => {
    expect(queryByText('http://example.com')).not.toBeInTheDocument()
  })
})
