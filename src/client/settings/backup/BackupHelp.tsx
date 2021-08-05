import React, {ReactElement} from 'react'
import {ExternalLink} from '../../common/ExternalLink'
import {HelpArticle, HelpProps} from '../../help/HelpArticle'
import {URL} from '../../common/URL'
import {ROUTE_SETTINGS_BACKUP} from '../../Routes'

const KEYWORDS = [
  'backup',
  'export',
  'import',
  'where',
  'url'
]

export function BackupHelp({searchQuery}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={KEYWORDS}
                 searchQuery={searchQuery}
                 title='Backup'
                 page={ROUTE_SETTINGS_BACKUP}>
      <p>
        You can import and export to multiple remote backup locations. Use <strong>Add remote backup</strong> to add a
        new
        remote backup location.
      </p>
      <p>
        Once a remote backup location is added you can manually export by pressing the <strong>Export</strong> button.
        You can also enable <strong>Automatically export</strong> to automatically export to the remote location
        whenever configuration is changed.
      </p>
      <p>
        Manually importing is done by pressing the <strong>Import</strong> button. Please note, remote locations will
        be merged when you import, so that no locations get lost.
      </p>
    </HelpArticle>
  )
}

export function RemoteBackupCustomHelp({searchQuery}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={[...KEYWORDS, 'custom server']}
                 searchQuery={searchQuery}
                 title='Remote backup - Custom server'
                 page={ROUTE_SETTINGS_BACKUP}>
      <p>
        This allows you to export to a customer server. When exporting, the raw configuration <code>JSON</code> will
        be <code>POSTed</code> to the <strong>URL</strong> given. When importing, the raw
        configuration <code>JSON</code> must be returned from the given <strong>URL</strong> from
        a <code>GET</code> request.
      </p>
      <p>
        Tip, if you need to support multiple exports with the same custom server, you can make it RESTful and specify
        the ID directly in the <strong>URL</strong> field.
      </p>
    </HelpArticle>
  )
}

export function RemoteBackupGitHubHelp({searchQuery}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={[...KEYWORDS, 'access token', 'github', 'gist']}
                 searchQuery={searchQuery}
                 title='Remote backup - GitHub gist'
                 page={ROUTE_SETTINGS_BACKUP}>
      <p>
        The <strong>URL</strong> can be changed to backup to a GitHub Enterprise instance.
      </p>
      <p>
        Add a gist <strong>ID</strong> to update an existing Gist or leave blank to create a new gist. You can get
        a gist ID from the gist URL, <URL url='https://gist.github.com/:username/:gistId'/>. New gists will be
        created as secret gists, but please note <ExternalLink
        href='https://docs.github.com/en/github/writing-on-github/editing-and-sharing-content-with-gists/creating-gists'>secret
        gists are not actually private</ExternalLink>.
      </p>
      <p>
        You need to <ExternalLink
        href='https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token'>generate
        a personal <strong>Access token</strong></ExternalLink> to allow a gist to be created. The
        token <em>only</em> requires the <ExternalLink
        href='https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps'><code>gist</code> scope</ExternalLink>.
      </p>
    </HelpArticle>
  )
}

export function RemoteBackupGitLabHelp({searchQuery}: HelpProps): ReactElement {
  return (
    <HelpArticle keywords={[...KEYWORDS, 'access token', 'gitlab', 'snippet']}
                 searchQuery={searchQuery}
                 title='Remote backup - GitLab snippet'
                 page={ROUTE_SETTINGS_BACKUP}>
      <p>
        The <strong>URL</strong> can be changed to backup to a self host GitLab instance.
      </p>
      <p>
        Add a snippet <strong>ID</strong> to update an existing Snippet or leave blank to create a new Snippet. You can
        get a Snippet ID from the Snippet URL, <URL url='https://gitlab.com/snippets/:snippetId'/>.
      </p>
      <p>
        You need to <ExternalLink
        href='https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html'>generate a
        personal <strong>Access token</strong></ExternalLink> to allow a Snippet to be created. The
        token requires the <ExternalLink
        href='https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html#limiting-scopes-of-a-personal-access-token'><code>api</code> scope</ExternalLink>.
        Please note, the <code>api</code> scope gives full access, once <ExternalLink
        href='https://gitlab.com/gitlab-org/gitlab/-/issues/20440'>GitLab make scopes more fine
        grained</ExternalLink> Nevergreen will use that.
      </p>
    </HelpArticle>
  )
}
