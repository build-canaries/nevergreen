import type { ReactElement } from 'react'
import { Page } from '../../../common/Page'
import { Checkmark } from '../../../common/icons/Checkmark'
import { InfoMessages } from '../../../common/Messages'

export function ImportSuccessPage(): ReactElement {
  return (
    <Page title="Import successful" icon={<Checkmark />}>
      <InfoMessages messages="Successfully imported configuration" />
    </Page>
  )
}

export const Component = ImportSuccessPage
