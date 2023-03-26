import { render } from '../../testUtils/testHelpers'
import { getClickToShowMenu, otherSettingsRoot } from './OtherSettingsReducer'
import { screen } from '@testing-library/react'
import { OtherSettingsPage } from './OtherSettingsPage'

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
