import {render} from '../testHelpers'
import React from 'react'
import {Loading} from './Loading'
import {screen} from '@testing-library/react'

it('should render loading if loaded is not given', () => {
  render(<Loading loaded={undefined}/>)
  expect(screen.queryByTestId('loading')).toBeInTheDocument()
})

it('should render loading if loaded is false', () => {
  render(<Loading loaded={false}/>)
  expect(screen.queryByTestId('loading')).toBeInTheDocument()
})

it('should render children if loaded is true', () => {
  render(
    <Loading loaded={true}>
      <div data-locator='child'/>
    </Loading>
  )
  expect(screen.queryByTestId('child')).toBeInTheDocument()
  expect(screen.queryByTestId('loading')).not.toBeInTheDocument()
})
