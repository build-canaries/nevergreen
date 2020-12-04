import React from 'react'
import {DropDown} from './DropDown'
import {render} from '../../testHelpers'

it('should add all the given options', () => {
  const options = [
    {value: 'a', display: 'A'},
    {value: 'b', display: 'B'},
    {value: 'c', display: 'C'}
  ]
  const {queryByText} = render(<DropDown options={options}>label</DropDown>)
  expect(queryByText('A')).toBeInTheDocument()
  expect(queryByText('B')).toBeInTheDocument()
  expect(queryByText('C')).toBeInTheDocument()
})

// https://ffoodd.github.io/a11y.css/errors.html#namespace
it('should generate an id (that does not start with a number) to associate the label and input correctly', () => {
  const {container} = render(<DropDown options={[]}>label</DropDown>)
  const labelId = container.querySelector('label')?.htmlFor
  expect(labelId).toMatch(/i[0-9]/)
  expect(container.querySelector('select')).toHaveAttribute('id', labelId)
})
