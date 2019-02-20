import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {GitLabSnippetInput} from '../../GitLabSnippetInput'
import {GitLabUrlInput} from '../../GitLabUrlInput'
import styles from './gitlab.scss'
import {PrimaryButton} from '../../../common/forms/Button'
import {iCloudDownload} from '../../../common/fonts/Icons'
import {Password} from '../../../common/forms/Password'
import {WithHelp} from '../../../common/ContextualHelp'
import {GitLabHelp} from './GitLabHelp'

export function GitLab({snippetId, gitLabSetSnippetId, url, gitLabSetUrl, loaded, restoreFromGitLab}) {
  const [accessToken, setAccessToken] = useState('')

  const accessTokenChanged = ({target}) => setAccessToken(target.value)

  const disabled = !loaded

  return (
    <>
      <WithHelp title='Import from GitLab'
                help={<GitLabHelp/>}>
        <GitLabUrlInput key={url}
                        url={url}
                        setUrl={gitLabSetUrl}
                        disabled={disabled}/>
      </WithHelp>
      <GitLabSnippetInput key={snippetId}
                          snippetId={snippetId}
                          setSnippetId={gitLabSetSnippetId}
                          disabled={disabled}/>
      <Password className={styles.accessToken}
                onChange={accessTokenChanged}
                onBlur={accessTokenChanged}
                value={accessToken}
                disabled={disabled}>
        <div className={styles.label}>access token</div>
      </Password>
      <PrimaryButton className={styles.import}
                     onClick={() => restoreFromGitLab(accessToken)}
                     disabled={disabled}
                     icon={iCloudDownload}>
        import
      </PrimaryButton>
    </>
  )
}

GitLab.propTypes = {
  loaded: PropTypes.bool,
  restoreFromGitLab: PropTypes.func.isRequired,
  gitLabSetUrl: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  gitLabSetSnippetId: PropTypes.func.isRequired,
  snippetId: PropTypes.string.isRequired
}
