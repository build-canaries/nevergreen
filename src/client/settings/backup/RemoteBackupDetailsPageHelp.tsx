import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../../help/HelpArticle'
import {HelpForm, HelpInput} from '../../help/HelpForms'
import {ROUTE_BACKUP_EXPORT_DETAILS} from '../../AppRoutes'

const keywords = [
  'backup',
  'export',
  'import',
  'add remote location',
  'automatically export'
]

export function RemoteBackupDetailsPageHelp({searchQuery}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={keywords}
                 searchQuery={searchQuery}
                 title='Remote backup details'
                 page={ROUTE_BACKUP_EXPORT_DETAILS}>
      <HelpForm>
        <HelpInput name='Automatically export'>
          While <em>enabled</em> configuration will automatically be exported to the given remote location when
          it changes. Note, any errors that may occur while automatically exporting will be ignore (the error will
          be output to the browsers console).
        </HelpInput>
        <HelpInput name='Export'>
          This will take you to the export page where a manual export can be triggered.
        </HelpInput>
        <HelpInput name='Import'>
          This will take you to the import page where a manual import can be triggered.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
