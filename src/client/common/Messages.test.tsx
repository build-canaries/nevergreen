import { render } from '../testUtils/testHelpers'
import { Messages, MessagesType } from './Messages'
import { screen } from '@testing-library/react'

it('should not render anything if messages is an empty array', () => {
  const props = { type: MessagesType.error, messages: [], icon: <div /> }
  const { container } = render(<Messages {...props} />)
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toBeNull()
})

it('should not render anything if messages is a blank string', () => {
  const props = { type: MessagesType.error, messages: '', icon: <div /> }
  const { container } = render(<Messages {...props} />)
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toBeNull()
})

it('should render the messages', () => {
  const props = {
    type: MessagesType.error,
    messages: ['some-message', 'another-message'],
    icon: <div />,
  }
  render(<Messages {...props} />)
  expect(screen.getByText('some-message')).toBeInTheDocument()
  expect(screen.getByText('another-message')).toBeInTheDocument()
})

it('should allow messages to be dismissed', async () => {
  const onDismiss = jest.fn()
  const props = {
    type: MessagesType.info,
    messages: 'irrelevant',
    icon: <div />,
    onDismiss,
  }
  const { user } = render(<Messages {...props} />)
  await user.click(
    screen.getByRole('button', { name: 'Dismiss info messages' }),
  )
  expect(onDismiss).toHaveBeenCalled()
})
