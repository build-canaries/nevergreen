import React from 'react'
import {DropDown} from '../../../../src/client/common/forms/DropDown'
import {render} from '../../testHelpers'

it('should add all the given options', () => {
  const options = [
    {value: 'a', display: 'A'},
    {value: 'b', display: 'B'},
    {value: 'c', display: 'C'}
  ]
  const {getByText} = render(<DropDown options={options}>label</DropDown>)
  expect(getByText('A')).toBeInTheDocument()
  expect(getByText('B')).toBeInTheDocument()
  expect(getByText('C')).toBeInTheDocument()
})

// https://ffoodd.github.io/a11y.css/errors.html#namespace
it('should generate an id (that does not start with a number) to associate the label and input correctly', () => {
  const {container} = render(<DropDown options={[]}>label</DropDown>)
  const labelId = container.querySelector('label')?.htmlFor
  expect(labelId).toMatch(/i[0-9]/)
  expect(container.querySelector('select')).toHaveAttribute('id', labelId)
})
