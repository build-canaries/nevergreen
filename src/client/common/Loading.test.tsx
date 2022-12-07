import {render} from '../testUtils/testHelpers'
import React from 'react'
import {Loading} from './Loading'
import {screen} from '@testing-library/react'

it('should render progress but not children if not loaded', () => {
  render(
    <Loading loaded={false} title="">
      <div>content</div>
    </Loading>
  )
  expect(screen.queryByText('content')).not.toBeInTheDocument()
  expect(screen.getByRole('progressbar')).toBeInTheDocument()
})

it('should still render progress so focus does not get reset as well as children when loaded', () => {
  render(
    <Loading loaded title="">
      <div>content</div>
    </Loading>
  )
  expect(screen.getByText('content')).toBeInTheDocument()
  expect(screen.getByRole('progressbar')).toBeInTheDocument()
})

it('should allow getting focus for more accessible loading feedback', () => {
  render(
    <Loading focus loaded={false} title="">
      <div>content</div>
    </Loading>
  )
  expect(screen.getByRole('progressbar')).toHaveFocus()
})
