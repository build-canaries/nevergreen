import React from 'react'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import { render } from '../../testUtils/testHelpers'
import { buildRemoteBackupLocation } from '../../testUtils/builders'
import { BackupPage } from './BackupPage'
import { remoteLocationsRoot } from './RemoteLocationsReducer'
import { RemoteLocationOptions } from './RemoteLocationOptions'

it('should be able to remove remote locations', async () => {
  const state = {
    [remoteLocationsRoot]: {
      internalId: buildRemoteBackupLocation({
        internalId: 'internalId',
        where: RemoteLocationOptions.custom,
        url: 'http://example.com',
      }),
    },
  }
  const { user } = render(<BackupPage />, { state })

  expect(screen.getByText(/http:\/\/example.com/)).toBeInTheDocument()

  void user.click(
    screen.getByRole('button', { name: 'Remove Remote Custom server location' })
  )

  await waitForElementToBeRemoved(() =>
    screen.queryByText(/http:\/\/example.com/)
  )
})
