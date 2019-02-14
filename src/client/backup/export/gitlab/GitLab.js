import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {GitLabSnippetInput} from '../../GitLabSnippetInput'
import {GitLabUrlInput} from '../../GitLabUrlInput'
import {PrimaryButton} from '../../../common/forms/Button'
import {iCloudUpload} from '../../../common/fonts/Icons'
import {Password} from '../../../common/forms/Password'
import styles from './gitlab.scss'

export function GitLab({loaded, snippetId, url, gitLabSetSnippetId, gitLabSetUrl, uploadToGitLab}) {
  const [accessToken, setAccessToken] = useState('')

  const accessTokenChanged = ({target}) => setAccessToken(target.value)

  const disabled = !loaded

  return (
    <>
      <GitLabUrlInput key={url}
                      url={url}
                      setUrl={gitLabSetUrl}
                      disabled={disabled}/>
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
      <PrimaryButton className={styles.export}
                     onClick={() => uploadToGitLab(accessToken)}
                     disabled={disabled}
                     icon={iCloudUpload}>
        export
      </PrimaryButton>
    </>
  )
}

GitLab.propTypes = {
  loaded: PropTypes.bool,
  uploadToGitLab: PropTypes.func.isRequired,
  gitLabSetSnippetId: PropTypes.func.isRequired,
  gitLabSetUrl: PropTypes.func.isRequired,
  snippetId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}
