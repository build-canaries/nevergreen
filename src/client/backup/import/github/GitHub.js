import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import styles from './github.scss'
import {GistIdInput} from '../../GistIdInput'

export function GitHub({gistId, gitHubSetGistId, loaded, restoreFromGitHub}) {
  const disabled = !loaded

  return (
    <Fragment>
      <GistIdInput key={gistId}
                   gistId={gistId}
                   setGistId={gitHubSetGistId}
                   disabled={disabled}/>
      <button className={styles.import}
              onClick={restoreFromGitHub}
              disabled={disabled}>
        import
      </button>
    </Fragment>
  )
}

GitHub.propTypes = {
  loaded: PropTypes.bool,
  restoreFromGitHub: PropTypes.func.isRequired,
  gitHubSetGistId: PropTypes.func.isRequired,
  gistId: PropTypes.string.isRequired
}
