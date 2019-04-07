import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../../../common/forms/Input'
import {GistIdInput} from '../../GistIdInput'
import {WithHelp} from '../../../common/ContextualHelp'
import {GitHubHelp} from './GitHubHelp'
import {PrimaryButton} from '../../../common/forms/Button'
import {iCloudUpload} from '../../../common/fonts/Icons'
import {Password} from '../../../common/forms/Password'
import styles from './github.scss'
import {UrlInput} from '../../UrlInput'

export function GitHub({description, loaded, gistId, url, gitHubSetGistId, gitHubSetDescription, uploadToGitHub, gitHubSetUrl}) {
  const [oauthToken, setOauthToken] = useState('')
  const [newDescription, setNewDescription] = useState(description)

  const disabled = !loaded
  const oauthTokenChanged = ({target}) => setOauthToken(target.value)

  return (
    <>
      <WithHelp title='Export to GitHub'
                containerClassName={styles.helpContainer}
                help={<GitHubHelp/>}>
        <UrlInput key={url}
                  url={url}
                  setUrl={gitHubSetUrl}
                  disabled={disabled}/>
      </WithHelp>
      <GistIdInput key={gistId}
                   gistId={gistId}
                   setGistId={gitHubSetGistId}
                   disabled={disabled}/>
      <Input value={newDescription}
             onChange={({target}) => setNewDescription(target.value)}
             onBlur={() => gitHubSetDescription(newDescription)}
             disabled={disabled}
             maxLength='256'>
        <div className={styles.label}>description</div>
      </Input>
      <Password className={styles.accessToken}
                onChange={oauthTokenChanged}
                onBlur={oauthTokenChanged}
                value={oauthToken}
                disabled={disabled}>
        <div className={styles.label}>access token</div>
      </Password>
      <PrimaryButton className={styles.export}
                     onClick={() => uploadToGitHub(oauthToken)}
                     disabled={disabled}
                     icon={iCloudUpload}>
        export
      </PrimaryButton>
    </>
  )
}

GitHub.propTypes = {
  loaded: PropTypes.bool,
  uploadToGitHub: PropTypes.func.isRequired,
  gitHubSetGistId: PropTypes.func.isRequired,
  gitHubSetDescription: PropTypes.func.isRequired,
  gitHubSetUrl: PropTypes.func.isRequired,
  gistId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}
