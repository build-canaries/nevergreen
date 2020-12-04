import React from 'react'
import {ExternalLink} from './ExternalLink'
import {render} from '../testHelpers'
import {VISUALLY_HIDDEN_ATTRIBUTE} from './VisuallyHidden'

// https://mathiasbynens.github.io/rel-noopener/
it('should have the correct target, defend against "reverse tabnabbing" and let screen readers know it opens in a new window', () => {
  const {container, queryByText} = render(<ExternalLink>child</ExternalLink>)

  const anchor = container.querySelector('a')
  expect(anchor).toHaveAttribute('target', '_blank')
  expect(anchor).toHaveAttribute('rel', 'noopener noreferrer')
  expect(queryByText('(opens in a new window)')).toHaveAttribute(VISUALLY_HIDDEN_ATTRIBUTE)
})
