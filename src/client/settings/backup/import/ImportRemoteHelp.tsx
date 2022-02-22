import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../../../help/HelpArticle'
import {HelpForm, HelpInput} from '../../../help/HelpForms'
import {WarningMessages} from '../../../common/Messages'
import {routeBackupImportRemote} from '../../../AppRoutes'

const KEYWORDS = [
  'backup',
  'import',
  'configuration to import',
  'try fetching again'
]

export function ImportRemoteHelp({searchQuery}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={KEYWORDS}
                 searchQuery={searchQuery}
                 title='Import remote'
                 page={routeBackupImportRemote}>
      <p>
        The configuration will automatically be fetched from the remote location. The fetched configuration
        will <strong>not</strong> automatically be imported, instead the value of <em>Configuration to import</em> is
        updated. This allows checking and editing of the configuration before importing.
      </p>
      <HelpForm>
        <HelpInput name='Configuration to import'>
          This is the configuration that will be imported on <em>Import</em>.
        </HelpInput>
        <HelpInput name='Import'>
          This will perform the import of the configuration in <em>Configuration to import</em>.
        </HelpInput>
        <HelpInput name='Cancel'>
          Cancels importing.
        </HelpInput>
        <HelpInput name='Try fetching again'>
          Try to fetch the configuration from the remote location again. This will only be available if fetching the
          configuration failed for any reason.
        </HelpInput>
      </HelpForm>
      <WarningMessages messages='Importing configuration will override any existing settings.'/>
    </HelpArticle>
  )
}
