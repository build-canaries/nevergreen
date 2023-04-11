import { DropDown } from './DropDown'
import { render } from '../../testUtils/testHelpers'
import { screen } from '@testing-library/react'

it('should add all the given options', () => {
  const options = [
    { value: 'a', display: 'A' },
    { value: 'b', display: 'B' },
    { value: 'c', display: 'C' },
  ]
  render(<DropDown options={options}>label</DropDown>)
  expect(screen.getByText('A')).toBeInTheDocument()
  expect(screen.getByText('B')).toBeInTheDocument()
  expect(screen.getByText('C')).toBeInTheDocument()
})
