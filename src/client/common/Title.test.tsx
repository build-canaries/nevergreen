import React from 'react'
import {render} from '../testUtils/testHelpers'
import {Title} from './Title'
import {screen} from '@testing-library/react'

it('should set the document title', () => {
  const {unmount} = render(<Title>some-title</Title>)
  expect(document).toHaveProperty('title', 'some-title')
  unmount()
  expect(document).toHaveProperty('title', 'Nevergreen')
})

it('should focus so keyboard users can start tabbing directly into the page and it also makes screen readers announce the title', () => {
  render(<Title focus>some-title</Title>)
  const title = screen.getByRole('heading')
  expect(title).toHaveFocus()
  expect(title).toHaveProperty('tabIndex', -1) // make sure not part of the normal tab flow
})

it('should allow to not force focus', () => {
  render(<Title focus={false}>some-title</Title>)
  expect(screen.getByRole('heading')).not.toHaveFocus()
})
