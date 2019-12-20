import React from 'react'
import {ExternalLink} from '../../../common/ExternalLink'
import {URL} from '../../../common/URL'
import {HelpArticle, HelpProps} from '../../../help/HelpArticle'

const KEYWORDS = [
  'backup',
  'import',
  'github',
  'gist',
  'access token'
]

export function ImportGitHubHelp({searchQuery}: HelpProps) {
  return (
    <HelpArticle keywords={KEYWORDS}
                 searchQuery={searchQuery}
                 title='Import from GitHub'
                 page='/backup'>
      <p>
        Set the gist <strong>ID</strong> to the ID of an existing Gist to import from. You can get a Gist ID from the
        Gist URL, <URL url='https://gist.github.com/:username/:gistId'/>.
      </p>
      <p>
        If you export from this instance of Nevergreen the gist ID will automatically be filled.
      </p>
      <p>
        Importing does not require an access token as even <ExternalLink
        href='https://help.github.com/articles/about-gists/#secret-gists'>secret Gists are not actually
        private</ExternalLink>.
      </p>
    </HelpArticle>
  )
}
