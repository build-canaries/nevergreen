import React, {Fragment, useState} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../../../common/forms/Input'
import {GistIdInput} from '../../GistIdInput'
import {WithHelp} from '../../../common/ContextualHelp'
import {GitHubHelp} from './GitHubHelp'
import {PrimaryButton} from '../../../common/forms/Button'
import {iCloudUpload} from '../../../common/fonts/Icons'
import {Password} from '../../../common/forms/Password'
import styles from './github.scss'

export function GitHub({description, loaded, gistId, gitHubSetGistId, gitHubSetDescription, uploadToGitHub}) {
  const [oauthToken, setOauthToken] = useState('')
  const [newDescription, setNewDescription] = useState(description)

  const disabled = !loaded
  const oauthTokenChanged = ({target}) => setOauthToken(target.value)

  return (
    <Fragment>
      <WithHelp title='Export to GitHub'
                help={<GitHubHelp/>}>
        <GistIdInput key={gistId}
                     gistId={gistId}
                     setGistId={gitHubSetGistId}
                     disabled={disabled}/>
      </WithHelp>
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
    </Fragment>
  )
}

GitHub.propTypes = {
  loaded: PropTypes.bool,
  uploadToGitHub: PropTypes.func.isRequired,
  gitHubSetGistId: PropTypes.func.isRequired,
  gitHubSetDescription: PropTypes.func.isRequired,
  gistId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}
