import type { ReactElement } from 'react'
import { HelpArticle, HelpProps } from '../../../help/HelpArticle'
import { HelpForm, HelpInput } from '../../../help/HelpForms'
import { ROUTE_BACKUP_EXPORT_LOCAL } from '../../../AppRoutes'
import { FloppyDisk } from '../../../common/icons/FloppyDisk'
import { Paste } from '../../../common/icons/Paste'

const keywords = [
  'backup',
  'export',
  'save locally',
  'copy to clipboard',
  'current configuration',
]

export function ExportLocalHelp({ searchQuery }: HelpProps): ReactElement {
  const timestamp = '${timestamp}'

  return (
    <HelpArticle
      keywords={keywords}
      searchQuery={searchQuery}
      title="Export locally"
      page={ROUTE_BACKUP_EXPORT_LOCAL}
    >
      <HelpForm>
        <HelpInput name="Save locally..." icon={<FloppyDisk />}>
          Saves the configuration to a local file. The default filename is{' '}
          <code>nevergreen-configuration-backup-{timestamp}.json</code>, where{' '}
          <code>{timestamp}</code> is the date and time the file was saved.
        </HelpInput>
        <HelpInput name="Copy to clipboard" icon={<Paste />}>
          Copies the configuration to your clipboard.
        </HelpInput>
        <HelpInput name="Current configuration">
          This is the current configuration that can be exported. This is a
          readonly text area so the configuration can be easily manually copied.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
