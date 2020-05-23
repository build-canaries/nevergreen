import React, {ReactElement} from 'react'
import {ExternalLink} from '../../../common/ExternalLink'
import {URL} from '../../../common/URL'
import {HelpArticle, HelpProps} from '../../../help/HelpArticle'

const KEYWORDS = [
  'backup',
  'export',
  'github',
  'gist',
  'access token'
]

export function ExportGitHubHelp({searchQuery}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={KEYWORDS}
                 searchQuery={searchQuery}
                 title='Export to GitHub'
                 page='/backup'>
      <p>
        Add a gist <strong>ID</strong> to update an existing Gist or leave blank to create a new Gist. You can get
        a Gist ID from the Gist URL, <URL url='https://gist.github.com/:username/:gistId'/>.
      </p>
      <p>
        You need to <ExternalLink
        href='https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/'>generate a
        personal <strong>access token</strong></ExternalLink> to allow a Gist to be created. The
        token <em>only</em> requires the <ExternalLink
        href='https://developer.github.com/apps/building-oauth-apps/understanding-scopes-for-oauth-apps/'><code>gist</code> scope</ExternalLink>.
      </p>
      <p>
        Access tokens are not stored locally as they would allow editing of any of a users Gists, so they need to be
        manually entered every time you want to export.
      </p>
    </HelpArticle>
  )
}
