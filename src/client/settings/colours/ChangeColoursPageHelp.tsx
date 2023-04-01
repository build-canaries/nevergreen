import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { HelpForm, HelpInput } from '../../help/HelpForms'
import { ROUTE_COLOURS } from '../../AppRoutes'
import { ExternalLink } from '../../common/ExternalLink'

const keywords = [
  'colour',
  'settings',
  'display',
  'sick',
  'sick building',
  'healthy',
  'healthy building',
  'unknown',
  'success',
]

export function ChangeColoursPageHelp({
  searchQuery,
}: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Change colours"
      page={ROUTE_COLOURS}
    >
      <HelpForm>
        <HelpInput name="Background colour">
          Changes the background colour.
        </HelpInput>
        <HelpInput name="Text colour">
          Changes the text/foreground colour.
        </HelpInput>
      </HelpForm>
      <p>
        A preview of the currently selected colours is shown under the form.
      </p>
      <p>
        You should consider the{' '}
        <ExternalLink href="https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html">
          minimum contrast
        </ExternalLink>{' '}
        when changing colours to make sure they are easy to read.
      </p>
    </HelpArticle>
  )
}
