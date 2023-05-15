import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../help/HelpArticle'
import { HelpForm, HelpInput } from '../../help/HelpForms'
import { ROUTE_BACKUP_EXPORT_DETAILS } from '../../AppRoutes'
import { CloudUpload } from '../../common/icons/CloudUpload'
import { CloudDownload } from '../../common/icons/CloudDownload'
import { WarningMessages } from '../../common/Messages'

const keywords = ['backup', 'export', 'import', 'automatically export']

export function RemoteBackupDetailsPageHelp({
  searchQuery,
}: HelpProps): ReactElement {
  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Remote location details"
      page={ROUTE_BACKUP_EXPORT_DETAILS}
    >
      <HelpForm>
        <HelpInput name="Automatically export">
          While <em>enabled</em> configuration will automatically be exported to
          the given remote location when it changes.
        </HelpInput>
        <HelpInput name="Export" icon={<CloudUpload />}>
          This will take you to the export page where a manual export can be
          triggered.
        </HelpInput>
        <HelpInput name="Import" icon={<CloudDownload />}>
          This will take you to the import page where a manual import can be
          triggered.
        </HelpInput>
      </HelpForm>
      <WarningMessages messages="Any errors that may occur while automatically exporting will be ignored (the error will be output to the browsers console)" />
    </HelpArticle>
  )
}
