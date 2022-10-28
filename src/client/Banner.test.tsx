import React from 'react'
import {Banner} from './Banner'
import {render} from './testUtils/testHelpers'
import noop from 'lodash/noop'
import {screen} from '@testing-library/react'

const defaultProps = {
  message: '',
  onDismiss: noop,
  hide: false
}

it('should not render anything if notification is empty', () => {
  const props = {...defaultProps, message: ''}
  const {container} = render(<Banner {...props}/>)
  // eslint-disable-next-line testing-library/no-node-access
  expect(container.firstChild).toBeNull()
})

it('should be able to dismiss', async () => {
  const onDismiss = jest.fn()
  const props = {...defaultProps, message: 'some notification', onDismiss}

  const {user} = render(<Banner {...props}/>)
  expect(screen.getByText('some notification')).toBeInTheDocument()

  await user.click(screen.getByRole('button', {name: 'Dismiss info messages'}))
  expect(onDismiss).toHaveBeenCalled()
})
