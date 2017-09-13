import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Input from '../../../common/forms/Input'
import styles from './github.scss'

class GitHub extends Component {
  constructor(props) {
    super(props)
    this.state = {oauthToken: '', gistId: props.gistId, description: props.description}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({gistId: nextProps.gistId, description: nextProps.description})
  }

  render() {
    const oauthTokenChanged = (evt) => this.setState({oauthToken: evt.target.value})
    const descriptionChanged = (evt) => this.setState({description: evt.target.value})
    const gistIdChanged = (evt) => this.setState({gistId: evt.target.value})
    const setDescription = () => this.props.gitHubSetDescription(this.state.description)
    const setGistId = () => this.props.gitHubSetGistId(this.state.gistId)
    const upload = () => this.props.uploadToGitHub(this.state.gistId, this.state.description, this.props.configuration, this.state.oauthToken)
    const disabled = !this.props.loaded

    return (
      <div>
        <fieldset className={styles.gistValues}>
          <Input className={styles.oauthToken} onChange={oauthTokenChanged} onBlur={oauthTokenChanged} value={this.state.oauthToken}
                 disabled={disabled}>
            <span>access token</span>
          </Input>
          <Input className={styles.description} value={this.state.description} onChange={descriptionChanged} onBlur={setDescription}
                 disabled={disabled}>
            <span>description</span>
          </Input>
          <Input className={styles.gistId} value={this.state.gistId} onChange={gistIdChanged} onBlur={setGistId}
                 placeholder='leave blank to create a new gist' disabled={disabled}>
            <span>gist ID</span>
          </Input>
        </fieldset>
        <button className={styles.export} onClick={upload} disabled={disabled}>export</button>
      </div>
    )
  }
}

GitHub.propTypes = {
  loaded: PropTypes.bool,
  configuration: PropTypes.string.isRequired,
  uploadToGitHub: PropTypes.func.isRequired,
  gitHubSetGistId: PropTypes.func.isRequired,
  gitHubSetDescription: PropTypes.func.isRequired,
  gistId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default GitHub
