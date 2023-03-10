import { render } from '../../testUtils/testHelpers'
import {
  getClickToShowMenu,
  getSettings,
  getShowBuildLabel,
  getShowBuildTime,
  getShowFeedIdentifier,
  getShowPrognosis,
  settingsRoot,
} from '../SettingsReducer'
import { fireEvent, screen, within } from '@testing-library/react'
import { DisplaySettings } from './DisplaySettings'
import { Prognosis } from '../../domain/Project'

it('should set the click to show menu setting', async () => {
  const state = {
    [settingsRoot]: {
      clickToShowMenu: false,
    },
  }

  const { store, user } = render(<DisplaySettings />, { state })
  await user.click(screen.getByLabelText('Click to show menu'))

  expect(getClickToShowMenu(store.getState())).toBeTruthy()
})

it('should set the show feed identifier setting', async () => {
  const state = {
    [settingsRoot]: {
      showTrayName: false,
    },
  }

  const { store, user } = render(<DisplaySettings />, { state })
  await user.click(screen.getByLabelText('Show feed identifier'))

  expect(getShowFeedIdentifier(store.getState())).toBeTruthy()
})

it('should set the show build time setting', async () => {
  const state = {
    [settingsRoot]: {
      showBuildTime: false,
    },
  }

  const { store, user } = render(<DisplaySettings />, { state })
  await user.click(screen.getByLabelText('Show build time'))

  expect(getShowBuildTime(store.getState())).toBeTruthy()
})

it('should set the show build label setting', async () => {
  const state = {
    [settingsRoot]: {
      showBuildLabel: false,
    },
  }

  const { store, user } = render(<DisplaySettings />, { state })
  await user.click(screen.getByLabelText('Show build label'))

  expect(getShowBuildLabel(store.getState())).toBeTruthy()
})

describe('showing on the monitor page', () => {
  it.each`
    prognosis                    | name
    ${Prognosis.healthy}         | ${'Healthy projects'}
    ${Prognosis.healthyBuilding} | ${'Healthy building projects'}
    ${Prognosis.sick}            | ${'Sick projects'}
    ${Prognosis.sickBuilding}    | ${'Sick building projects'}
    ${Prognosis.unknown}         | ${'Unknown projects'}
  `(
    '$prognosis',
    async ({ prognosis, name }: { prognosis: Prognosis; name: string }) => {
      const state = {
        [settingsRoot]: {
          showPrognosis: [],
        },
      }

      const { store, user } = render(<DisplaySettings />, { state })
      const group = screen.getByRole('group', { name })
      await user.click(within(group).getByLabelText('Show on the Monitor page'))

      expect(getShowPrognosis(store.getState())).toContain(prognosis)
    }
  )
})

describe('updating colours', () => {
  it.each`
    prognosis                    | name
    ${Prognosis.healthy}         | ${'Healthy projects'}
    ${Prognosis.healthyBuilding} | ${'Healthy building projects'}
    ${Prognosis.sick}            | ${'Sick projects'}
    ${Prognosis.sickBuilding}    | ${'Sick building projects'}
    ${Prognosis.unknown}         | ${'Unknown projects'}
    ${Prognosis.error}           | ${'Errors'}
  `(
    '$prognosis',
    ({ prognosis, name }: { prognosis: Prognosis; name: string }) => {
      const state = {
        [settingsRoot]: {
          [prognosis]: {
            backgroundColour: '#aaaaaa',
            textColour: '#bbbbbb',
          },
        },
      }

      const { store } = render(<DisplaySettings />, { state })
      const group = screen.getByRole('group', { name })
      // Color inputs not supported by user events
      // https://github.com/testing-library/user-event/issues/423
      fireEvent.input(within(group).getByLabelText('Background colour'), {
        target: { value: '#cccccc' },
      })
      fireEvent.input(within(group).getByLabelText('Text colour'), {
        target: { value: '#dddddd' },
      })

      expect(getSettings(store.getState())[prognosis]).toEqual({
        backgroundColour: '#cccccc',
        textColour: '#dddddd',
      })
    }
  )
})
