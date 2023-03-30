import { render } from '../../testUtils/testHelpers'
import { getSuccessMessages, successRoot } from './SuccessReducer'
import { AddMessagePage } from './AddMessagePage'
import { screen, waitFor } from '@testing-library/react'

it('should allow success messages to be added', async () => {
  const state = { [successRoot]: { messages: [] } }

  const { store, user } = render(<AddMessagePage />, {
    state,
    mountPath: 'add',
    currentLocation: 'add',
  })
  await user.type(screen.getByLabelText('Message'), 'some-message')
  await user.click(screen.getByText('Add message'))

  expect(getSuccessMessages(store.getState())).toEqual(['some-message'])
  await waitFor(() => {
    expect(window.location.pathname).toEqual('/settings/success')
  })
})

it('should not allow a blank success messages to be added', async () => {
  const state = { [successRoot]: { messages: [] } }
  const { user } = render(<AddMessagePage />, { state })

  await user.clear(screen.getByLabelText('Message'))
  await user.click(screen.getByText('Add message'))

  expect(screen.getByText('Enter a message or image URL')).toBeInTheDocument()
})

it('should not allow the same success message to be added', async () => {
  const state = { [successRoot]: { messages: ['some-message'] } }
  const { user } = render(<AddMessagePage />, { state })

  await user.type(screen.getByLabelText('Message'), 'some-message')
  await user.click(screen.getByText('Add message'))

  expect(screen.getByText('Message has already been added')).toBeInTheDocument()
})

it('should be able to cancel back to settings', async () => {
  const state = { [successRoot]: { messages: ['some-message'] } }
  const { user } = render(<AddMessagePage />, {
    state,
    mountPath: 'add',
    currentLocation: 'add',
  })

  await user.click(screen.getByRole('button', { name: 'Cancel' }))

  await waitFor(() => {
    expect(window.location.pathname).toEqual('/settings/success')
  })
})
