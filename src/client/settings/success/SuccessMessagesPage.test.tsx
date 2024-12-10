import { NO_MESSAGES_WARNING, SuccessMessagesPage } from './SuccessMessagesPage'
import { render } from '../../testUtils/testHelpers'
import { successRoot } from './SuccessReducer'
import { fireEvent, screen } from '@testing-library/react'

it('should show success messages', () => {
  const state = {
    [successRoot]: { messages: ['some-message', 'http://some-url'] },
  }
  render(<SuccessMessagesPage />, { state })
  expect(
    screen.getByText('some-message', { selector: 'div' }),
  ).toBeInTheDocument()
  expect(screen.getByRole('img')).toHaveAttribute('src', 'http://some-url')
})

it('should allow success messages to be removed', async () => {
  const state = { [successRoot]: { messages: ['some-message'] } }
  const { user } = render(<SuccessMessagesPage />, { state })
  await user.click(screen.getByText('Remove some-message'))
  expect(screen.queryByText('some-message')).not.toBeInTheDocument()
})

it('should show a warning if all success messages are removed', () => {
  const state = { [successRoot]: { messages: [] } }
  render(<SuccessMessagesPage />, { state })
  expect(screen.getByText(NO_MESSAGES_WARNING)).toBeInTheDocument()
  expect(screen.queryByTestId('success-message')).not.toBeInTheDocument()
  expect(screen.queryByRole('img')).not.toBeInTheDocument()
})

it('should not show a warning if at least one success messages exists', () => {
  const state = { [successRoot]: { messages: ['some-message'] } }
  render(<SuccessMessagesPage />, { state })
  expect(screen.queryByText(NO_MESSAGES_WARNING)).not.toBeInTheDocument()
})

it('should allow colours to be changed', () => {
  const state = {
    [successRoot]: { backgroundColour: '#aaaaaa', textColour: '#bbbbbb' },
  }

  render(<SuccessMessagesPage />, { state })

  // Color inputs not supported by user events
  // https://github.com/testing-library/user-event/issues/423
  fireEvent.input(screen.getByLabelText('Background colour'), {
    target: { value: '#cccccc' },
  })
  fireEvent.input(screen.getByLabelText('Text colour'), {
    target: { value: '#dddddd' },
  })

  expect(screen.getByLabelText('Background colour')).toHaveValue('#cccccc')
  expect(screen.getByLabelText('Text colour')).toHaveValue('#dddddd')
})
