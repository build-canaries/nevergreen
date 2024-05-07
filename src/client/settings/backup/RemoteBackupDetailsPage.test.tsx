import { screen } from '@testing-library/react'
import { buildRemoteBackupLocation } from '../../testUtils/builders'
import { render } from '../../testUtils/testHelpers'
import { RemoteBackupDetailsPage } from './RemoteBackupDetailsPage'

it('should link to the export page', async () => {
  const outletContext = buildRemoteBackupLocation()

  const { user } = render(<RemoteBackupDetailsPage />, {
    outletContext,
  })
  await user.click(screen.getByRole('link', { name: 'Export' }))

  expect(window.location.pathname).toEqual('/export')
})

it('should link to the import page', async () => {
  const outletContext = buildRemoteBackupLocation()

  const { user } = render(<RemoteBackupDetailsPage />, {
    outletContext,
  })
  await user.click(screen.getByRole('link', { name: 'Import' }))

  expect(window.location.pathname).toEqual('/import')
})
