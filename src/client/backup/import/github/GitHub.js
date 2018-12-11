import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {GistIdInput} from '../../GistIdInput'
import {GitHubHelp} from './GitHubHelp'
import {ContextualHelp, InlineHelp} from '../../../common/ContextualHelp'
import styles from './github.scss'
import {PrimaryButton} from '../../../common/forms/Button'

export function GitHub({gistId, gitHubSetGistId, loaded, restoreFromGitHub}) {
  const disabled = !loaded

  return (
    <Fragment>
      <InlineHelp>
        <GistIdInput key={gistId}
                     gistId={gistId}
                     setGistId={gitHubSetGistId}
                     disabled={disabled}/>
        <ContextualHelp title='Import from GitHub'
                        help={<GitHubHelp/>}/>
      </InlineHelp>
      <PrimaryButton className={styles.import}
                     onClick={restoreFromGitHub}
                     disabled={disabled}
                     icon='cloud-download'>
        import
      </PrimaryButton>
    </Fragment>
  )
}

GitHub.propTypes = {
  loaded: PropTypes.bool,
  restoreFromGitHub: PropTypes.func.isRequired,
  gitHubSetGistId: PropTypes.func.isRequired,
  gistId: PropTypes.string.isRequired
}
