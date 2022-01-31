import React, {ReactElement} from 'react'
import {HelpArticle, HelpProps} from '../../../help/HelpArticle'
import {ROUTE_EXPORT_REMOTE} from '../../../Routes'
import {HelpForm, HelpInput} from '../../../help/HelpForms'

const KEYWORDS = [
  'backup',
  'export',
  'current configuration'
]

export function ExportRemoteHelp({searchQuery}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={KEYWORDS}
                 searchQuery={searchQuery}
                 title='Export remote'
                 page={ROUTE_EXPORT_REMOTE}>
      <HelpForm>
        <HelpInput name='Current configuration'>
          This is the current configuration that will be exported.
        </HelpInput>
        <HelpInput name='Export'>
          This will perform the export of the configuration in <em>Current configuration</em>.
        </HelpInput>
        <HelpInput name='Cancel'>
          Cancels exporting.
        </HelpInput>
      </HelpForm>
    </HelpArticle>
  )
}
