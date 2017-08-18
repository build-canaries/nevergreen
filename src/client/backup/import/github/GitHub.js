import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Input from '../../../common/forms/Input'
import './github.scss'

class GitHub extends Component {
  constructor(props) {
    super(props)
    this.state = {url: props.url}
  }

  componentWillReceiveProps(nextProps) {
    this.setState({url: nextProps.url})
  }

  render() {
    const urlChanged = (evt) => this.setState({url: evt.target.value})
    const setUrl = () => this.props.gitHubSetUrl(this.state.url)
    const restore = () => this.props.restoreFromGitHub(this.state.url)
    const disabled = !this.props.loaded

    return (
      <div className='import-github'>
        <Input className='gist-url' value={this.state.url} type='url' onChange={urlChanged} onBlur={setUrl} disabled={disabled}
               placeholder='https://api.github.com/gists/:id'>
          <span>gist URL</span>
        </Input>
        <button className='restore' onClick={restore} disabled={disabled}>import</button>
      </div>
    )
  }
}

GitHub.propTypes = {
  loaded: PropTypes.bool,
  restoreFromGitHub: PropTypes.func.isRequired,
  gitHubSetUrl: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
}

export default GitHub
