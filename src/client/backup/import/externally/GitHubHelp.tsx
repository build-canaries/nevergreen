import React from 'react'
import {ExternalLink} from '../../../common/ExternalLink'
import {URL} from '../../../common/URL'

export function GitHubHelp() {
  return (
    <>
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
    </>
  )
}
