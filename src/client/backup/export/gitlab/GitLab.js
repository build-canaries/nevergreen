import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../../../common/forms/Input'
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
      accessToken: '',
      newTitle: props.title
    }
  }

  accessTokenChanged = (evt) => {
    this.setState({accessToken: evt.target.value})
  }

  titleChanged = (evt) => {
    this.setState({newTitle: evt.target.value})
  }

  setTitle = () => {
    this.props.gitLabSetTitle(this.state.newTitle)
  }

  upload = () => {
    const {accessToken} = this.state
    this.props.uploadToGitLab(accessToken)
  }

  render() {
    const {loaded, snippetId, url, gitLabSetSnippetId, gitLabSetUrl} = this.props
    const {accessToken, newTitle} = this.state
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
        <Input value={newTitle}
               onChange={this.titleChanged}
               onBlur={this.setTitle}
               disabled={disabled}
               maxLength='256'>
          <div className={styles.label}>title</div>
        </Input>
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
  gitLabSetTitle: PropTypes.func.isRequired,
  gitLabSetUrl:PropTypes.func.isRequired,
  snippetId: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}
