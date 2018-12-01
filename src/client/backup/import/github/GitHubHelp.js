import React, {Fragment} from 'react'
import {ExternalLink} from '../../../common/ExternalLink'

export function GitHubHelp() {
  return (
    <Fragment>
      <p>
        Set the <strong>gist ID</strong> to the ID of an existing Gist to import from. You can get a Gist ID from the
        Gist URL, <code>https:
        <wbr/>
        &#x2F;/gist
        <wbr/>
        .github
        <wbr/>
        .com
        <wbr/>
        /:username
        <wbr/>
        /:gistId</code>.
      </p>
      <p>
        If you export from this instance of Nevergreen the gist ID will automatically be filled.
      </p>
      <p>
        Importing does not require an access token as even <ExternalLink
        href='https://help.github.com/articles/about-gists/#secret-gists'>secret Gists are not actually
        private</ExternalLink>.
      </p>
    </Fragment>
  )
}
