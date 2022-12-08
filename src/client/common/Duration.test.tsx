import { render, setSystemTime } from '../testUtils/testHelpers'
import React from 'react'
import { Duration } from './Duration'
import { screen } from '@testing-library/react'

it('should display the given prefix and suffix', () => {
  setSystemTime('2018-02-18T23:38:00Z')
  const props = {
    abbreviate: false,
    timestamp: '2000-12-01T00:00:00Z',
    prefix: 'some prefix',
    suffix: 'some suffix',
  }
  render(<Duration {...props} />)
  expect(
    screen.getByText('some prefix about 17 years some suffix')
  ).toBeInTheDocument()
})
