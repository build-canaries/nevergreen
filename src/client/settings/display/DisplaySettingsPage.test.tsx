import { render } from '../../testUtils/testHelpers'
import {
  displaySettingsRoot,
  getShowBuildLabel,
  getShowBuildTime,
  getShowFeedIdentifier,
  getShowPrognosisName,
} from './DisplaySettingsReducer'
import { screen } from '@testing-library/react'
import { DisplaySettingsPage } from './DisplaySettingsPage'

it('should set the show feed identifier setting', async () => {
  const state = {
    [displaySettingsRoot]: {
      showTrayName: false,
    },
  }

  const { store, user } = render(<DisplaySettingsPage />, { state })
  await user.click(screen.getByLabelText('Show feed identifier'))

  expect(getShowFeedIdentifier(store.getState())).toBeTruthy()
})

it('should set the show build time setting', async () => {
  const state = {
    [displaySettingsRoot]: {
      showBuildTime: false,
    },
  }

  const { store, user } = render(<DisplaySettingsPage />, { state })
  await user.click(screen.getByLabelText('Show build time'))

  expect(getShowBuildTime(store.getState())).toBeTruthy()
})

it('should set the show build label setting', async () => {
  const state = {
    [displaySettingsRoot]: {
      showBuildLabel: false,
    },
  }

  const { store, user } = render(<DisplaySettingsPage />, { state })
  await user.click(screen.getByLabelText('Show build label'))

  expect(getShowBuildLabel(store.getState())).toBeTruthy()
})

it('should set the show prognosis name setting', async () => {
  const state = {
    [displaySettingsRoot]: {
      showPrognosisName: false,
    },
  }

  const { store, user } = render(<DisplaySettingsPage />, { state })
  await user.click(screen.getByLabelText('Show prognosis name'))

  expect(getShowPrognosisName(store.getState())).toBeTruthy()
})
