import React from 'react'
import {render} from '../testHelpers'
import {Title} from '../../../src/client/common/Title'

it('should set the document title', () => {
  const {unmount} = render(<Title>some-title</Title>)
  expect(document).toHaveProperty('title', 'some-title')
  unmount()
  expect(document).toHaveProperty('title', 'Nevergreen')
})

it('should focus so keyboard users can start tabbing directly into the page and it also makes screen readers announce the title', () => {
  const {container} = render(<Title>some-title</Title>)
  const h1 = container.querySelector('h1')
  expect(document.activeElement).toBe(h1)
  expect(h1).toHaveProperty('tabIndex', -1) // make sure not part of the normal tab flow
})
