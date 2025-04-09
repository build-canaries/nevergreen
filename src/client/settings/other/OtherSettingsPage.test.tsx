import { render } from '../../testUtils/testHelpers'
import { getClickToShowMenu, otherSettingsRoot } from './OtherSettingsReducer'
import { screen, waitFor } from '@testing-library/react'
import { OtherSettingsPage } from './OtherSettingsPage'
import * as LocalConfiguration from '../../configuration/LocalRepository'

const { location } = window

beforeEach(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  delete window.location
  // eslint-disable-next-line @typescript-eslint/no-misused-spread
  window.location = { ...location, reload: jest.fn() }
})

afterEach(() => {
  window.location = location
})

it('should set the click to show menu setting', async () => {
  const state = {
    [otherSettingsRoot]: {
      clickToShowMenu: false,
    },
  }

  const { store, user } = render(<OtherSettingsPage />, { state })
  await user.click(screen.getByLabelText('Click to show menu'))

  expect(getClickToShowMenu(store.getState())).toBeTruthy()
})

it('should reset configuration and reload', async () => {
  jest.spyOn(LocalConfiguration, 'clear').mockResolvedValueOnce()
  const { user } = render(<OtherSettingsPage />)
  await user.click(
    screen.getByRole('button', {
      name: 'Reset configuration back to defaults',
    }),
  )
  await waitFor(() => {
    expect(LocalConfiguration.clear).toHaveBeenCalled()
  })
  // eslint-disable-next-line @typescript-eslint/unbound-method
  expect(window.location.reload).toHaveBeenCalled()
})
