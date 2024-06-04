import { ExternalLink } from './ExternalLink'
import { render } from '../testUtils/testHelpers'
import { VISUALLY_HIDDEN_ATTRIBUTE } from './VisuallyHidden'
import { screen } from '@testing-library/react'

// https://mathiasbynens.github.io/rel-noopener/
it('should have the correct target, defend against "reverse tabnabbing" and let screen readers know it opens in a new window', () => {
  render(<ExternalLink href="irrelevant">child</ExternalLink>)

  const anchor = screen.getByRole('link')
  expect(anchor).toHaveAttribute('target', '_blank')
  expect(anchor).toHaveAttribute('rel', 'noopener noreferrer')
  expect(screen.queryByText('(opens in a new window)')).toHaveAttribute(
    VISUALLY_HIDDEN_ATTRIBUTE,
  )
})
