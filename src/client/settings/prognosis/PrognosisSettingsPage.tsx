import { ReactElement } from 'react'
import { Page } from '../../common/Page'
import {
  Prognosis,
  prognosisDisplay,
  sortedPrognosisByPriority,
} from '../../domain/Project'
import { isNotBlank } from '../../common/Utils'
import { URL } from '../../common/URL'
import { Card } from '../../common/card/Card'
import { CardHeading } from '../../common/card/CardHeading'
import { IconPrognosis } from '../../common/icons/prognosis/IconPrognosis'
import { Summary } from '../../common/Summary'
import { LinkButton } from '../../common/LinkButton'
import { generatePath } from 'react-router'
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
        const title = groupTitle(prognosis)
        const prognosisSettings = settings[prognosis]
        const showOnMonitor = prognosisSettings.show ? <>Yes</> : <>No</>
        const systemNotificationSummary =
          prognosisSettings.show && prognosisSettings.systemNotification ? (
            <>Yes</>
          ) : (
            <>No</>
          )
        const sfxSummary =
          prognosisSettings.show && isNotBlank(prognosisSettings.sfx) ? (
            <URL url={prognosisSettings.sfx} base={document.baseURI} />
          ) : (
            <>No</>
          )

        const summary = [
          { label: 'Show on Monitor page', value: showOnMonitor },
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
                title={title}
                icon={<IconPrognosis prognosis={prognosis} />}
              />
            }
            styleHeader={{
              color: prognosisSettings.textColour,
              backgroundColor: prognosisSettings.backgroundColour,
            }}
            key={prognosis}
          >
            <Summary values={summary} title={title} />
            <LinkButton
              to={generatePath(RoutePaths.prognosisEdit, { for: prognosis })}
              icon={<Cog />}
            >
              Update details <VisuallyHidden>for {title}</VisuallyHidden>
            </LinkButton>
          </Card>
        )
      })}
    </Page>
  )
}

export const Component = PrognosisSettingsPage
