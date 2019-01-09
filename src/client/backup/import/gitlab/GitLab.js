import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {GitLabSnippetInput} from '../../GitLabSnippetInput'
import {GitLabUrlInput} from '../../GitLabUrlInput'
import styles from './gitlab.scss'
import {PrimaryButton} from '../../../common/forms/Button'
import {iCloudDownload} from '../../../common/fonts/Icons'
import {Password} from '../../../common/forms/Password'

export class GitLab extends Component {

  constructor(props) {
    super(props)
    this.state = {
      accessToken: ''
    }
  }

  accessTokenChanged = (evt) => {
    this.setState({accessToken: evt.target.value})
  }

  import = () => {
    const {accessToken} = this.state
    this.props.restoreFromGitLab(accessToken)
  }

  render() {
      const {snippetId, gitLabSetSnippetId, url, gitLabSetUrl, loaded} = this.props
      const {accessToken} = this.state
      const disabled = !loaded
    
      return (
        <Fragment>
          <GitLabUrlInput key={url}
                    url={url}
                    setUrl={gitLabSetUrl}
                    disabled={disabled}>
          </GitLabUrlInput>
          <GitLabSnippetInput key={snippetId}
                        snippetId={snippetId}
                        setSnippetId={gitLabSetSnippetId}
                        disabled={disabled}/>
          <Password className={styles.accessToken}
                  onChange={this.accessTokenChanged}
                  onBlur={this.accessTokenChanged}
                  value={accessToken}
                  disabled={disabled}>
            <div className={styles.label}>access token</div>
        </Password>
          <PrimaryButton className={styles.import}
                         onClick={this.import}
                         disabled={disabled}
                         icon={iCloudDownload}>
            import
          </PrimaryButton>
        </Fragment>
      )
  }
}

GitLab.propTypes = {
  loaded: PropTypes.bool,
  restoreFromGitLab: PropTypes.func.isRequired,
  gitLabSetUrl: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  gitLabSetSnippetId: PropTypes.func.isRequired,
  snippetId: PropTypes.string.isRequired
}
