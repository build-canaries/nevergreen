import React from 'react'
import {ExternalLink} from '../../../common/ExternalLink'
import {URL} from '../../../common/URL'

export function GitLabHelp() {
  return (
    <>
      <p>
        You can use Nevergreen with the official <ExternalLink href='https://gitlab.com'>GitLab</ExternalLink> without any additional configuration.
        If you want to use a self-hosted GitLab you&apos;ll need to <ExternalLink href='https://github.com/build-canaries/nevergreen/wiki/running-locally#allow_gitlab_snippets_from'>set an environment variable</ExternalLink> on your Nevergreen instance to allow connections.
        This allows you to specify the <strong>URL</strong> for where your GitLab is available.
      </p>
      <p>
        Set the <strong>snippet ID</strong> to the ID of an existing snippet to import from. You can get a snippet ID from the
        snippet URL, <URL url='https://gitlab.com/snippets/:snippetId'/>.
      </p>
      <p>
        If you export from this instance of Nevergreen the gist ID will automatically be filled.
      </p>
      <p>
        You need to <ExternalLink
        href='https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html'>generate a
        personal <strong>access token</strong></ExternalLink> to allow a Snippet to be imported. The
        token requires the <ExternalLink
        href='https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#limiting-scopes-of-a-personal-access-token'><code>api</code> scope</ExternalLink>.
        The <code>api</code> scope gives full access. Once <ExternalLink href='https://gitlab.com/gitlab-org/gitlab-ce/issues/41165'>GitLab make scopes more fine grained</ExternalLink> Nevergreen will use that.
      </p>
      <p>
        Access tokens are not stored locally as they would allow editing of any of a users Snippets, so they need to be
        manually entered every time you want to export.
      </p>
    </>
  )
}
