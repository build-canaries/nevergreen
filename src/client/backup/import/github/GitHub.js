import React from 'react'
import PropTypes from 'prop-types'
import {GistIdInput} from '../../GistIdInput'
import {GitHubHelp} from './GitHubHelp'
import {WithHelp} from '../../../common/ContextualHelp'
import styles from './github.scss'
import {PrimaryButton} from '../../../common/forms/Button'
import {iCloudDownload} from '../../../common/fonts/Icons'
import {UrlInput} from '../../UrlInput'

export function GitHub({gistId, url, gitHubSetGistId, loaded, restoreFromGitHub, gitHubSetUrl}) {
  const disabled = !loaded

  return (
    <>
      <WithHelp title='Import from GitHub'
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
      <PrimaryButton className={styles.import}
                     onClick={restoreFromGitHub}
                     disabled={disabled}
                     icon={iCloudDownload}>
        import
      </PrimaryButton>
    </>
  )
}

GitHub.propTypes = {
  loaded: PropTypes.bool,
  restoreFromGitHub: PropTypes.func.isRequired,
  gitHubSetGistId: PropTypes.func.isRequired,
  gitHubSetUrl: PropTypes.func.isRequired,
  gistId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}
