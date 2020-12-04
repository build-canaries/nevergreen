import React from 'react'
import {Password} from './Password'
import {render} from '../../testHelpers'
import {fireEvent} from '@testing-library/react'

it('should allow the password to be shown', () => {
  const {container, getByText} = render(<Password>label</Password>)
  expect(container.querySelector('input')).toHaveAttribute('type', 'password')
  fireEvent.click(getByText('show password'))
  expect(container.querySelector('input')).toHaveAttribute('type', 'text')
})
