import {render} from '../testHelpers'
import React from 'react'
import {Loading} from '../../../src/client/common/Loading'

it('should render loading if loaded is not given', () => {
  const {queryByTestId} = render(<Loading loaded={undefined}/>)
  expect(queryByTestId('loading')).toBeInTheDocument()
})

it('should render loading if loaded is false', () => {
  const {queryByTestId} = render(<Loading loaded={false}/>)
  expect(queryByTestId('loading')).toBeInTheDocument()
})

it('should render children if loaded is true', () => {
  const {queryByTestId} = render(
    <Loading loaded={true}>
      <div data-locator='child'/>
    </Loading>
  )
  expect(queryByTestId('child')).toBeInTheDocument()
  expect(queryByTestId('loading')).not.toBeInTheDocument()
})
