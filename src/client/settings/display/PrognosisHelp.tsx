import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { HelpForm, HelpInput } from '../../help/HelpForms'
import { RoutePaths } from '../../AppRoutes'
import { IconPrognosis } from '../../common/icons/prognosis/IconPrognosis'
import { Prognosis } from '../../domain/Project'

const keywords = [
  'show prognosis name',
  'interesting projects',
  'sick',
  'sick building',
  'healthy',
  'healthy building',
  'unknown',
]

export function PrognosisHelp({ searchQuery }: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Prognosis"
      page={RoutePaths.display}
    >
      <p>Prognosis gives important information about the state of projects.</p>
      <HelpForm>
        <HelpInput
          name="Errors"
          icon={<IconPrognosis prognosis={Prognosis.error} />}
        >
          An error has happened, this could be from the CI server or from
          Nevergreen itself. The most common cause of errors are connection
          problems.
        </HelpInput>
        <HelpInput
          name="Sick"
          icon={<IconPrognosis prognosis={Prognosis.sick} />}
        >
          The project is currently broken. Fixing sick projects should be top
          priority for teams, and pushing non fixing changes should be
          discouraged.
        </HelpInput>
        <HelpInput
          name="Sick building"
          icon={<IconPrognosis prognosis={Prognosis.sickBuilding} />}
        >
          The previous build was broken, and the project is currently building.
          Pushing changes on sick building projects should be done with caution.
        </HelpInput>
        <HelpInput
          name="Healthy building"
          icon={<IconPrognosis prognosis={Prognosis.healthyBuilding} />}
        >
          The previous build was successful, and the project is currently
          building.
        </HelpInput>
        <HelpInput
          name="Unknown"
          icon={<IconPrognosis prognosis={Prognosis.unknown} />}
        >
          The project is in an unknown state. This could happen for various
          reasons, including invalid values being returned in the CCTray XML.
        </HelpInput>
        <HelpInput
          name="Healthy"
          icon={<IconPrognosis prognosis={Prognosis.healthy} />}
        >
          The project is currently successful.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
