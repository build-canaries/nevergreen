import { Input } from './Input'
import { render } from '../../testUtils/testHelpers'
import { screen } from '@testing-library/react'

it('should apply the read only attribute and display an icon', () => {
  const props = { readOnly: true }
  render(<Input {...props}>label</Input>)
  expect(screen.getByRole('textbox')).toHaveAttribute('readOnly')
  expect(screen.getByText('read only')).toBeInTheDocument()
})

it('should display given error message', () => {
  const props = { error: 'some validation error' }
  render(<Input {...props}>label</Input>)
  expect(screen.getByText('some validation error')).toBeInTheDocument()
})
