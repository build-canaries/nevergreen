import React, {Component, PropTypes} from 'react'
import Input from '../../../common/forms/Input'
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

    return (
      <div className='export-github'>
        <h5>GitHub</h5>
        <fieldset className='gist-values'>
          <Input className='oauth-token' onChange={oauthTokenChanged} onBlur={oauthTokenChanged} value={this.state.oauthToken}>
            <span>oauth token</span>
          </Input>
          <Input className='description' value={this.state.description} onChange={descriptionChanged} onBlur={setDescription}>
            <span>description</span>
          </Input>
          <Input className='gist-url' value={this.state.url} type='url' onChange={urlChanged} onBlur={setUrl}
                 placeholder='leave blank to create a new gist'>
            <span>gist url</span>
          </Input>
        </fieldset>
        <button className='upload' onClick={upload}>upload</button>
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
