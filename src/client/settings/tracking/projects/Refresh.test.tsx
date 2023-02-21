import { render } from '../../../testUtils/testHelpers'
import { Refresh } from './Refresh'
import noop from 'lodash/noop'
import { screen } from '@testing-library/react'

it('should disable the refresh button if projects are loading', () => {
  const props = { refreshTray: noop, isLoading: true }
  render(<Refresh {...props} />)
  expect(screen.getByRole('button', { name: 'Refresh' })).toHaveAttribute(
    'disabled',
    ''
  )
})

it('should allow projects to be refreshed if they are loaded', async () => {
  const refreshTray = jest.fn()
  const props = { isLoading: false, refreshTray }
  const { user } = render(<Refresh {...props} />)
  await user.click(screen.getByRole('button', { name: 'Refresh' }))
  expect(refreshTray).toHaveBeenCalled()
})
