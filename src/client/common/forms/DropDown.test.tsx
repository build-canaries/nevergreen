import React from 'react'
import {DropDown} from './DropDown'
import {render} from '../../testHelpers'
import {screen} from '@testing-library/react'

it('should add all the given options', () => {
  const options = [
    {value: 'a', display: 'A'},
    {value: 'b', display: 'B'},
    {value: 'c', display: 'C'}
  ]
  render(<DropDown options={options}>label</DropDown>)
  expect(screen.queryByText('A')).toBeInTheDocument()
  expect(screen.queryByText('B')).toBeInTheDocument()
  expect(screen.queryByText('C')).toBeInTheDocument()
})

// https://ffoodd.github.io/a11y.css/errors.html#namespace
it('should generate an id (that does not start with a number) to associate the label and input correctly', () => {
  render(<DropDown options={[]}>label</DropDown>)
  expect(screen.getByText('label')).toHaveAttribute('for', expect.stringMatching(/i[0-9]/))
  expect(screen.getByRole('combobox')).toHaveAttribute('id', expect.stringMatching(/i[0-9]/))
})
