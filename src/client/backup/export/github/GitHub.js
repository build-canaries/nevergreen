import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import {Input} from '../../../common/forms/Input'
import {GistIdInput} from '../../GistIdInput'
import {ContextualHelp, InlineHelp} from '../../../common/ContextualHelp'
import {GitHubHelp} from './GitHubHelp'
import {PrimaryButton} from '../../../common/forms/Button'
import styles from './github.scss'

export class GitHub extends Component {

  constructor(props) {
    super(props)
    this.state = {
      oauthToken: '',
      newDescription: props.description
    }
  }

  oauthTokenChanged = (evt) => {
    this.setState({oauthToken: evt.target.value})
  }

  descriptionChanged = (evt) => {
    this.setState({newDescription: evt.target.value})
  }

  setDescription = () => {
    this.props.gitHubSetDescription(this.state.newDescription)
  }

  upload = () => {
    const {oauthToken} = this.state
    this.props.uploadToGitHub(oauthToken)
  }

  render() {
    const {loaded, gistId, gitHubSetGistId} = this.props
    const {oauthToken, newDescription} = this.state
    const disabled = !loaded

    return (
      <Fragment>
        <InlineHelp>
          <GistIdInput key={gistId}
                       gistId={gistId}
                       setGistId={gitHubSetGistId}
                       disabled={disabled}/>
          <ContextualHelp title='Export to GitHub'
                          help={<GitHubHelp/>}/>
        </InlineHelp>
        <Input value={newDescription}
               onChange={this.descriptionChanged}
               onBlur={this.setDescription}
               disabled={disabled}
               maxLength='256'>
          <div className={styles.label}>description</div>
        </Input>
        <Input type='password'
               className={styles.accessToken}
               onChange={this.oauthTokenChanged}
               onBlur={this.oauthTokenChanged}
               value={oauthToken}
               disabled={disabled}>
          <div className={styles.label}>access token</div>
        </Input>
        <PrimaryButton className={styles.export}
                       onClick={this.upload}
                       disabled={disabled}
                       icon='cloud-upload'>
          export
        </PrimaryButton>
      </Fragment>
    )
  }
}

GitHub.propTypes = {
  loaded: PropTypes.bool,
  uploadToGitHub: PropTypes.func.isRequired,
  gitHubSetGistId: PropTypes.func.isRequired,
  gitHubSetDescription: PropTypes.func.isRequired,
  gistId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}
