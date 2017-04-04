import React, {Component, PropTypes} from 'react'
import Input from '../../../common/forms/Input'
import Button from '../../../common/forms/Button'
import './github.scss'

class GitHub extends Component {
  constructor(props) {
    super(props)
    this.state = {oauthToken: '', url: props.url, description: props.description}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({url: nextProps.url, description: nextProps.description})
  }

  render() {
    const oauthTokenChanged = (evt) => this.setState({oauthToken: evt.target.value})
    const descriptionChanged = (evt) => this.setState({description: evt.target.value})
    const urlChanged = (evt) => this.setState({url: evt.target.value})
    const setDescription = () => this.props.gitHubSetDescription(this.state.description)
    const setUrl = () => this.props.gitHubSetUrl(this.state.url)
    const upload = () => this.props.uploadToGitHub(this.state.url, this.state.description, this.props.configuration, this.state.oauthToken)
    const disabled = !this.props.loaded

    return (
      <div className='export-github'>
        <fieldset className='gist-values'>
          <Input className='oauth-token' onChange={oauthTokenChanged} onBlur={oauthTokenChanged} value={this.state.oauthToken} disabled={disabled}>
            <span>access token</span>
          </Input>
          <Input className='description' value={this.state.description} onChange={descriptionChanged} onBlur={setDescription} disabled={disabled}>
            <span>description</span>
          </Input>
          <Input className='gist-url' value={this.state.url} type='url' onChange={urlChanged} onBlur={setUrl}
                 placeholder='leave blank to create a new Gist' disabled={disabled}>
            <span>Gist URL</span>
          </Input>
        </fieldset>
        <Button onClick={upload} disabled={disabled}><span className='upload'>export</span></Button>
      </div>
    )
  }
}

GitHub.propTypes = {
  loaded: PropTypes.bool,
  configuration: PropTypes.string.isRequired,
  uploadToGitHub: PropTypes.func.isRequired,
  gitHubSetUrl: PropTypes.func.isRequired,
  gitHubSetDescription: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default GitHub
