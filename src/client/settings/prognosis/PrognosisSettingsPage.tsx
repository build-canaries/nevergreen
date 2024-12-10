import { ReactElement } from 'react'
import { Page } from '../../common/Page'
import {
  Prognosis,
  prognosisDisplay,
  sortedPrognosisByPriority,
} from '../../domain/Project'
import { isBlank } from '../../common/Utils'
import { URL } from '../../common/URL'
import { Card } from '../../common/card/Card'
import { CardHeading } from '../../common/card/CardHeading'
import { IconPrognosis } from '../../common/icons/prognosis/IconPrognosis'
import { Summary } from '../../common/Summary'
import { LinkButton } from '../../common/LinkButton'
import { generatePath } from 'react-router-dom'
import { RoutePaths } from '../../AppRoutes'
import { Cog } from '../../common/icons/Cog'
import { VisuallyHidden } from '../../common/VisuallyHidden'
import { useAppSelector } from '../../configuration/Hooks'
import { getAllPrognosisSettings } from './PrognosisSettingsReducer'
import { AidKit } from '../../common/icons/AidKit'

function groupTitle(prognosis: Prognosis): string {
  if (prognosis === Prognosis.error) {
    return `${prognosisDisplay(prognosis, true)}s`
  }
  return `${prognosisDisplay(prognosis, true)} projects`
}

export function PrognosisSettingsPage(): ReactElement {
  const settings = useAppSelector(getAllPrognosisSettings)

  return (
    <Page title={'Prognosis settings'} icon={<AidKit />}>
      {sortedPrognosisByPriority().map((prognosis) => {
        const prognosisSettings = settings[prognosis]
        const showSummary = prognosisSettings.show ? <>Yes</> : <>No</>
        const systemNotificationSummary =
          prognosisSettings.systemNotification ? <>Yes</> : <>No</>
        const sfxSummary = isBlank(prognosisSettings.sfx) ? (
          <>No</>
        ) : (
          <URL url={prognosisSettings.sfx} base={document.baseURI} />
        )

        const summary = [
          { label: 'Show on Monitor page', value: showSummary },
          {
            label: 'Show system notification',
            value: systemNotificationSummary,
          },
          { label: 'Play audio notification', value: sfxSummary },
        ]

        return (
          <Card
            header={
              <CardHeading
                title={groupTitle(prognosis)}
                icon={<IconPrognosis prognosis={prognosis} />}
              />
            }
            styleHeader={{
              color: prognosisSettings.textColour,
              backgroundColor: prognosisSettings.backgroundColour,
            }}
            key={prognosis}
          >
            <Summary values={summary} />
            <LinkButton
              to={generatePath(RoutePaths.prognosisEdit, { for: prognosis })}
              icon={<Cog />}
            >
              Update details{' '}
              <VisuallyHidden>for {groupTitle(prognosis)}</VisuallyHidden>
            </LinkButton>
          </Card>
        )
      })}
    </Page>
  )
}

export const Component = PrognosisSettingsPage
