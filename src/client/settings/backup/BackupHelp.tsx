import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../../help/HelpArticle'
import {HelpForm, HelpInput} from '../../help/HelpForms'
import {ROUTE_BACKUP} from '../../AppRoutes'

const keywords = [
  'backup',
  'export',
  'import',
  'add remote location'
]

export function BackupHelp({searchQuery}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={keywords}
                 searchQuery={searchQuery}
                 title='Backup'
                 page={ROUTE_BACKUP}>
      <HelpForm>
        <HelpInput name='Add remote location'>
          Adds a new remote backup location. You can import and export to multiple remote backup locations.
        </HelpInput>
      </HelpForm>
      <p>Added remote locations will appear and can be managed from this page.</p>
      <HelpForm>
        <HelpInput name='Details'>
          This will take you to the details page for the remote backup.
        </HelpInput>
        <HelpInput name='Export'>
          This will take you to the export page where a manual export can be triggered.
        </HelpInput>
        <HelpInput name='Import'>
          This will take you to the import page where a manual import can be triggered.
        </HelpInput>
        <HelpInput name='Remove'>
          This will permanently delete the remote location. Remote locations can be re-added at any time.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
