import React from 'react'
import {Input} from './Input'
import {render} from '../../testHelpers'

it('should apply the read only attribute and display an icon', () => {
  const props = {readOnly: true}
  const {container, queryByText} = render(<Input {...props}>label</Input>)
  expect(container.querySelector('input')).toHaveAttribute('readOnly')
  expect(queryByText('read only')).toBeInTheDocument()
})

// https://ffoodd.github.io/a11y.css/errors.html#namespace
it('should generate an id (that does not start with a number) to associate the label and input correctly', () => {
  const {container} = render(<Input>label</Input>)
  const labelId = container.querySelector('label')?.htmlFor
  expect(labelId).toMatch(/i[0-9]/)
  expect(container.querySelector('input')).toHaveAttribute('id', labelId)
})

it('should display given error message', () => {
  const props = {error: 'some validation error'}
  const {queryByText} = render(<Input {...props}>label</Input>)
  expect(queryByText('some validation error')).toBeInTheDocument()
})
