import { render } from '../../testUtils/testHelpers'
import { screen, within } from '@testing-library/react'
import { Prognosis } from '../../domain/Project'
import { prognosisSettingsRoot } from './PrognosisSettingsReducer'
import { PrognosisSettingsPage } from './PrognosisSettingsPage'

it('should show No for system and audio notifications if not showing on Monitor page', () => {
  const state = {
    [prognosisSettingsRoot]: {
      [Prognosis.sick]: {
        show: false,
        systemNotification: true,
        sfx: 'some-sfx',
        backgroundColour: '#aaaaaa',
        textColour: '#bbbbbb',
      },
    },
  }

  render(<PrognosisSettingsPage />, { state })

  const section = screen.getByTitle('Sick projects')

  expect(section).toBeInTheDocument()
  expect(
    within(section).getByRole('definition', { name: 'Show on Monitor page' }),
  ).toHaveTextContent('No')
  expect(
    within(section).getByRole('definition', {
      name: 'Show system notification',
    }),
  ).toHaveTextContent('No')
  expect(
    within(section).getByRole('definition', {
      name: 'Play audio notification',
    }),
  ).toHaveTextContent('No')
})
