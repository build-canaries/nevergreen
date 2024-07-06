import { render } from '../../testUtils/testHelpers'
import {
  displaySettingsRoot,
  getShowBuildLabel,
  getShowBuildTime,
  getShowFeedIdentifier,
  getShowPrognosis,
  getShowPrognosisName,
} from './DisplaySettingsReducer'
import { screen } from '@testing-library/react'
import { DisplaySettingsPage } from './DisplaySettingsPage'
import { Prognosis } from '../../domain/Project'

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

describe('showing on the monitor page', () => {
  it.each`
    prognosis                    | name
    ${Prognosis.healthy}         | ${'healthy prognosis'}
    ${Prognosis.healthyBuilding} | ${'healthy building prognosis'}
    ${Prognosis.sick}            | ${'sick prognosis'}
    ${Prognosis.sickBuilding}    | ${'sick building prognosis'}
    ${Prognosis.unknown}         | ${'unknown prognosis'}
  `(
    '$prognosis',
    async ({ prognosis, name }: { prognosis: Prognosis; name: string }) => {
      const state = {
        [displaySettingsRoot]: {
          showPrognosis: [],
        },
      }

      const { store, user } = render(<DisplaySettingsPage />, { state })
      await user.click(
        screen.getByLabelText(`Show ${name} on the Monitor page`),
      )

      expect(getShowPrognosis(store.getState())).toContain(prognosis)
    },
  )
})

describe('updating colours', () => {
  it.each([
    { name: 'healthy prognosis', path: 'healthy' },
    { name: 'healthy building prognosis', path: 'healthy-building' },
    { name: 'sick prognosis', path: 'sick' },
    { name: 'sick building prognosis', path: 'sick-building' },
    { name: 'unknown prognosis', path: 'unknown' },
    { name: 'errors', path: 'error' },
  ])('$name', async ({ name, path }) => {
    const { user } = render(<DisplaySettingsPage />)
    await user.click(
      screen.getByRole('link', { name: `Change colours for ${name}` }),
    )

    expect(window.location.pathname).toEqual(`/settings/colours/${path}`)
  })
})
