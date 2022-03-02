import React from 'react'
import {screen} from '@testing-library/react'
import {render} from '../testHelpers'
import {Summary} from './Summary'

it('should filter out null values', () => {
  const values = [{label: 'label', value: null}]
  render(<Summary values={values}/>)
  expect(screen.queryByText('label')).not.toBeInTheDocument()
})
