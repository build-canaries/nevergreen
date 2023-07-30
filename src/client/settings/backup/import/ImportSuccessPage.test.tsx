import { render } from '../../../testUtils/testHelpers'
import { screen } from '@testing-library/react'
import { ImportSuccessPage } from './ImportSuccessPage'

it('should show a success message', () => {
  render(<ImportSuccessPage />)

  expect(
    screen.getByText('Successfully imported configuration'),
  ).toBeInTheDocument()
})
