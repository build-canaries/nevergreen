import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../../help/HelpArticle'
import { HelpForm, HelpInput } from '../../../help/HelpForms'
import { WarningMessages } from '../../../common/Messages'
import { ROUTE_BACKUP_IMPORT_LOCAL } from '../../../AppRoutes'

const keywords = ['backup', 'import', 'open local', 'configuration to import']

export function ImportLocalHelp({ searchQuery }: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Import local"
      page={ROUTE_BACKUP_IMPORT_LOCAL}
    >
      <HelpForm>
        <HelpInput name="Open local...">
          Opens a local plain text or json file. The contents of the file is{' '}
          <strong>not</strong> automatically imported, instead the value of{' '}
          <em>Configuration to import</em> is updated. This allows checking and
          editing of the configuration before importing.
        </HelpInput>
        <HelpInput name="Configuration to import">
          This is the configuration that will be imported on <em>Import</em>.
        </HelpInput>
        <HelpInput name="Import">
          This will perform the import of the configuration in{' '}
          <em>Configuration to import</em>.
        </HelpInput>
        <HelpInput name="Cancel">Cancels importing.</HelpInput>
      </HelpForm>
      <WarningMessages messages="Importing configuration will override any existing settings." />
    </HelpArticle>
  )
}
