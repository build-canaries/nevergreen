import { render } from '../testUtils/testHelpers'
import { Footer } from './Footer'
import { screen } from '@testing-library/react'
import { RoutePaths } from '../AppRoutes'

it('should have "about" information', async () => {
  const { user } = render(<Footer />)
  await user.click(
    screen.getByText(
      /Nevergreen v[\d.]+\+\d+\.[a-zA-Z\d]+ [a-zA-Z ]+ by Build Canaries/,
    ),
  )

  expect(window.location.pathname).toEqual(RoutePaths.about)
})
