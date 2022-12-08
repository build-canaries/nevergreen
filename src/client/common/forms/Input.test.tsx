import React from 'react'
import { Input } from './Input'
import { render } from '../../testUtils/testHelpers'
import { screen } from '@testing-library/react'

it('should apply the read only attribute and display an icon', () => {
  const props = { readOnly: true }
  render(<Input {...props}>label</Input>)
  expect(screen.getByRole('textbox')).toHaveAttribute('readOnly')
  expect(screen.getByText('read only')).toBeInTheDocument()
})

// https://ffoodd.github.io/a11y.css/errors.html#namespace
it('should generate an id (that does not start with a number) to associate the label and input correctly', () => {
  render(<Input>label</Input>)
  expect(screen.getByText('label')).toHaveAttribute(
    'for',
    expect.stringMatching(/i[0-9]/)
  )
  expect(screen.getByRole('textbox')).toHaveAttribute(
    'id',
    expect.stringMatching(/i[0-9]/)
  )
})

it('should display given error message', () => {
  const props = { error: 'some validation error' }
  render(<Input {...props}>label</Input>)
  expect(screen.getByText('some validation error')).toBeInTheDocument()
})
