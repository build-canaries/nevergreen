import React, {ReactElement} from 'react'
import {ExternalLink} from '../../../common/ExternalLink'
import {URL} from '../../../common/URL'
import {HelpArticle, HelpProps} from '../../../help/HelpArticle'

const KEYWORDS = [
  'backup',
  'import',
  'gitlab',
  'snippet',
  'access token'
]

export function ImportGitLabHelp({searchQuery}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={KEYWORDS}
                 searchQuery={searchQuery}
                 title='Import from GitLab'
                 page='/backup'>
      <p>
        Set the snippet <strong>ID</strong> to the ID of an existing snippet to import from. You can get a snippet ID
        from the snippet URL, <URL url='https://gitlab.com/snippets/:snippetId'/>.
      </p>
      <p>
        If you export from this instance of Nevergreen the snippet ID will automatically be filled.
      </p>
      <p>
        You need to <ExternalLink
        href='https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html'>generate a
        personal <strong>access token</strong></ExternalLink> to allow a Snippet to be imported. The
        token requires the <ExternalLink
        href='https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#limiting-scopes-of-a-personal-access-token'><code>api</code> scope</ExternalLink>.
        Please note, the <code>api</code> scope gives full access, once <ExternalLink
        href='https://gitlab.com/gitlab-org/gitlab/-/issues/20440'>GitLab make scopes more fine
        grained</ExternalLink> Nevergreen will use that.
      </p>
      <p>
        Access tokens are not stored locally as they would allow editing of any of a users Snippets, so they need to be
        manually entered every time you want to import.
      </p>
    </HelpArticle>
  )
}
