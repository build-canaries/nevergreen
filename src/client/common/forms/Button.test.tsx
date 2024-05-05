import { PrimaryButton } from './Button'
import { render } from '../../testUtils/testHelpers'
import { screen } from '@testing-library/react'

it('should explicitly set the type as the default is "submit"', () => {
  render(<PrimaryButton>label</PrimaryButton>)
  expect(screen.getByText('label')).toHaveAttribute('type', 'button')
})
