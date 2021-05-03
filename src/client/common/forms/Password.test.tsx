import React from 'react'
import {Password} from './Password'
import {render} from '../../testHelpers'
import {screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

it('should allow the password to be shown', () => {
  render(<Password>label</Password>)
  expect(screen.getByLabelText('label')).toHaveAttribute('type', 'password')
  userEvent.click(screen.getByRole('button', {name: 'show password'}))
  expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
})
