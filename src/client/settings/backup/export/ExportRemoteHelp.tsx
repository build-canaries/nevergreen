import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../../help/HelpArticle'
import { HelpForm, HelpInput } from '../../../help/HelpForms'
import { RoutePaths } from '../../../AppRoutes'

const keywords = ['backup', 'export', 'current configuration']

export function ExportRemoteHelp({ searchQuery }: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Export remote"
      page={RoutePaths.backupExportRemote}
    >
      <HelpForm>
        <HelpInput name="Current configuration">
          This is the current configuration that will be exported.
        </HelpInput>
        <HelpInput name="Export">
          This will perform the export of the configuration in{' '}
          <em>Current configuration</em>.
        </HelpInput>
        <HelpInput name="Cancel">Cancels exporting.</HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
