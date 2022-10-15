import React from 'react'
import {Password} from './Password'
import {render} from '../../testUtils/testHelpers'
import {screen} from '@testing-library/react'

it('should allow the password to be shown', async () => {
  const {user} = render(<Password>label</Password>)
  expect(screen.getByLabelText('label')).toHaveAttribute('type', 'password')
  await user.click(screen.getByRole('button', {name: 'show password'}))
  expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text')
})
