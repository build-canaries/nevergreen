import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {GitLabSnippetInput} from '../../GitLabSnippetInput'
import {GitLabUrlInput} from '../../GitLabUrlInput'
import {PrimaryButton} from '../../../common/forms/Button'
import {iCloudUpload} from '../../../common/fonts/Icons'
import {Password} from '../../../common/forms/Password'
import styles from './gitlab.scss'

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

  upload = () => {
    const {accessToken} = this.state
    this.props.uploadToGitLab(accessToken)
  }

  render() {
    const {loaded, snippetId, url, gitLabSetSnippetId, gitLabSetUrl} = this.props
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
        <PrimaryButton className={styles.export}
                       onClick={this.upload}
                       disabled={disabled}
                       icon={iCloudUpload}>
          export
        </PrimaryButton>
      </Fragment>
    )
  }
}

GitLab.propTypes = {
  loaded: PropTypes.bool,
  uploadToGitLab: PropTypes.func.isRequired,
  gitLabSetSnippetId: PropTypes.func.isRequired,
  gitLabSetUrl:PropTypes.func.isRequired,
  snippetId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}
